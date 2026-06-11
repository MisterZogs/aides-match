import { z } from 'zod'
import { HttpError } from 'wasp/server'
import type { MatchAides } from 'wasp/server/operations'
import { enrichirDepuisSiret } from '../../server/lib/sirene'
import { matcherAide } from '../../server/lib/matching'

const InputSchema = z.object({
  siret: z.string().length(14, 'Le SIRET doit contenir 14 chiffres').regex(/^\d{14}$/, 'Le SIRET ne doit contenir que des chiffres'),
})

type MatchAidesInput = z.infer<typeof InputSchema>

export const matchAides: MatchAides<MatchAidesInput, { siren: string; nbResultats: number }> = async (
  rawInput,
  context
) => {
  const { siret } = InputSchema.parse(rawInput)

  // 1. Enrichissement SIRENE (avec cache 30 jours)
  let profil
  try {
    profil = await enrichirDepuisSiret(siret)
  } catch (e) {
    throw new HttpError(400, `Impossible de trouver l'entreprise pour le SIRET ${siret} : ${(e as Error).message}`)
  }

  // 2. Charger les aides actives
  const aides = await context.entities.Aide.findMany({
    where: { actif: true },
    select: {
      id: true,
      sourceId: true,
      source: true,
      titre: true,
      description: true,
      url: true,
      criteresJson: true,
      criteresConfiance: true,
      montantMin: true,
      montantMax: true,
      tauxAide: true,
      typeMontant: true,
      deadline: true,
      actif: true,
      portee: true,
      codesRegion: true,
      codesDept: true,
      derniereVerif: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  // 3. Matcher chaque aide et upsert le résultat
  const upserts = aides.map(async (aide) => {
    const { score, detail } = matcherAide(profil, aide as any)

    await context.entities.MatchResult.upsert({
      where: { sirenId_aideId: { sirenId: profil.siren, aideId: aide.id } },
      create: { sirenId: profil.siren, aideId: aide.id, score, detail: detail as any },
      update: { score, detail: detail as any },
    })

    return score
  })

  await Promise.all(upserts)

  return { siren: profil.siren, nbResultats: aides.length }
}

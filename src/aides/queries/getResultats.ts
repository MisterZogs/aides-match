import { z } from 'zod'
import { HttpError } from 'wasp/server'
import type { GetResultats } from 'wasp/server/operations'
import type { Aide, MatchResult } from 'wasp/entities'

const InputSchema = z.object({
  siren: z.string().length(9),
})

export type ResultatAide = {
  aide: Pick<Aide, 'id' | 'titre' | 'url' | 'typeMontant' | 'montantMin' | 'montantMax' | 'tauxAide' | 'deadline' | 'portee' | 'source'>
  score: MatchResult['score']
  detail: MatchResult['detail']
}

export type ResultatsResponse = {
  siren: string
  denomination: string
  codeNaf: string
  libelleNaf: string
  commune: string
  resultats: ResultatAide[]
}

export const getResultats: GetResultats<{ siren: string }, ResultatsResponse | null> = async (
  rawInput,
  context
) => {
  const { siren } = InputSchema.parse(rawInput)

  const profil = await context.entities.EntrepriseProfile.findUnique({ where: { siren } })
  if (!profil) return null

  const matchResults = await context.entities.MatchResult.findMany({
    where: { sirenId: siren, aide: { actif: true } },
    include: {
      aide: {
        select: {
          id: true,
          titre: true,
          url: true,
          typeMontant: true,
          montantMin: true,
          montantMax: true,
          tauxAide: true,
          deadline: true,
          portee: true,
          source: true,
        },
      },
    },
    orderBy: [
      // eligible d'abord, puis probable, puis non_eligible
      { score: 'asc' },
    ],
  })

  return {
    siren: profil.siren,
    denomination: profil.denomination,
    codeNaf: profil.codeNaf,
    libelleNaf: profil.libelleNaf,
    commune: profil.codePostal,
    resultats: matchResults.map((mr) => ({
      aide: mr.aide,
      score: mr.score,
      detail: mr.detail,
    })),
  }
}

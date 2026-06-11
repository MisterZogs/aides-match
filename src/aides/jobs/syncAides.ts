import { prisma } from 'wasp/server'
import { fetchAidesEntreprises } from '../../server/lib/sources/aidesEntreprises'
import { fetchAidesTerritoires } from '../../server/lib/sources/aidesTerritoires'
import { fetchLesAides } from '../../server/lib/sources/lesAides'
import { fetchBpiAides } from '../../server/lib/sources/bpi'
import { fetchAdemeAides } from '../../server/lib/sources/ademe'
import { fetchCeeAides } from '../../server/lib/sources/cee'
import { fetchFranceRenovAides } from '../../server/lib/sources/franceRenov'
import { fetchFranceTravailAides } from '../../server/lib/sources/franceTravail'
import { fetchCreditsImpotAides } from '../../server/lib/sources/creditsImpot'
import { fetchZonesGeographiquesAides } from '../../server/lib/sources/zonesGeographiques'
import { extraireCriteres } from '../../server/lib/llm'

const SOURCE_LABELS = {
  aidesEntreprises: 'aides-entreprises',
  aidesTerritoires: 'aides-territoires',
  lesAides: 'les-aides',
  bpi: 'bpi',
  ademe: 'ademe',
  cee: 'cee',
  franceRenov: 'france-renov',
  franceTravail: 'france-travail',
  creditsImpot: 'credits-impot',
  zonesGeo: 'zones-geo',
} as const

export async function syncAides() {
  console.log('[syncAides] Démarrage de la synchronisation')

  const stats = { ajouts: 0, modifs: 0, erreurs: 0, llmExtractions: 0, predefinis: 0 }

  const [aidesEnt, aidesTerr, aidesLA, aidesBpi, aidesAdeme, aidesCee, aidesFR, aidesFT, aidesCi, aidesZG] =
    await Promise.allSettled([
      fetchAidesEntreprises(),
      fetchAidesTerritoires(),
      fetchLesAides(),
      fetchBpiAides(),
      fetchAdemeAides(),
      fetchCeeAides(),
      fetchFranceRenovAides(),
      fetchFranceTravailAides(),
      fetchCreditsImpotAides(),
      fetchZonesGeographiquesAides(),
    ])

  const toutes = [
    ...(aidesEnt.status === 'fulfilled' ? aidesEnt.value : []),
    ...(aidesTerr.status === 'fulfilled' ? aidesTerr.value : []),
    ...(aidesLA.status === 'fulfilled' ? aidesLA.value : []),
    ...(aidesBpi.status === 'fulfilled' ? aidesBpi.value : []),
    ...(aidesAdeme.status === 'fulfilled' ? aidesAdeme.value : []),
    ...(aidesCee.status === 'fulfilled' ? aidesCee.value : []),
    ...(aidesFR.status === 'fulfilled' ? aidesFR.value : []),
    ...(aidesFT.status === 'fulfilled' ? aidesFT.value : []),
    ...(aidesCi.status === 'fulfilled' ? aidesCi.value : []),
    ...(aidesZG.status === 'fulfilled' ? aidesZG.value : []),
  ]

  const sourceResults: Array<[string, PromiseSettledResult<any>]> = [
    [SOURCE_LABELS.aidesEntreprises, aidesEnt],
    [SOURCE_LABELS.aidesTerritoires, aidesTerr],
    [SOURCE_LABELS.lesAides, aidesLA],
    [SOURCE_LABELS.bpi, aidesBpi],
    [SOURCE_LABELS.ademe, aidesAdeme],
    [SOURCE_LABELS.cee, aidesCee],
    [SOURCE_LABELS.franceRenov, aidesFR],
    [SOURCE_LABELS.franceTravail, aidesFT],
    [SOURCE_LABELS.creditsImpot, aidesCi],
    [SOURCE_LABELS.zonesGeo, aidesZG],
  ]
  for (const [label, result] of sourceResults) {
    if (result.status === 'rejected') {
      console.error(`[syncAides] ${label}:`, result.reason)
      stats.erreurs++
    } else {
      console.log(`[syncAides] ${label}: ${result.value.length} aides récupérées`)
    }
  }

  for (const aide of toutes) {
    try {
      const existing = await prisma.aide.findUnique({
        where: { sourceId_source: { sourceId: aide.sourceId, source: aide.source } },
      })

      const data = {
        titre: aide.titre,
        description: aide.description,
        url: aide.url,
        typeMontant: aide.typeMontant,
        montantMin: aide.montantMin,
        montantMax: aide.montantMax,
        tauxAide: aide.tauxAide,
        deadline: aide.deadline,
        portee: aide.portee,
        codesRegion: aide.codesRegion,
        codesDept: aide.codesDept,
        derniereVerif: new Date(),
        actif: true,
      }

      let aideRecord
      if (existing) {
        aideRecord = await prisma.aide.update({ where: { id: existing.id }, data })
        stats.modifs++
      } else {
        aideRecord = await prisma.aide.create({
          data: { ...data, sourceId: aide.sourceId, source: aide.source },
        })
        stats.ajouts++
      }

      // Critères pré-remplis : pas besoin de LLM, on écrase directement
      if ((aide as any).criteresPredefinis) {
        const cp = (aide as any).criteresPredefinis
        if (!existing || (existing.criteresConfiance ?? 0) < cp.confiance) {
          await prisma.aide.update({
            where: { id: aideRecord.id },
            data: { criteresJson: cp as any, criteresConfiance: cp.confiance },
          })
        }
        stats.predefinis++
        continue
      }

      // Extraction LLM si critères absents ou confiance faible
      const needsLlm = !!process.env.MISTRAL_API_KEY &&
        (!aideRecord.criteresJson || aideRecord.criteresConfiance < 0.5)
      if (needsLlm && aide.description.length > 50) {
        const extraction = await extraireCriteres(aide.titre, aide.description)
        await prisma.aide.update({
          where: { id: aideRecord.id },
          data: { criteresJson: extraction.criteres as any, criteresConfiance: extraction.confiance },
        })
        await prisma.llmLog.create({
          data: {
            aideId: aideRecord.id,
            tokens: extraction.tokens,
            confiance: extraction.confiance,
            duree: extraction.dureeMs,
          },
        })
        stats.llmExtractions++
      }
    } catch (err) {
      console.error('[syncAides] Erreur sur aide', aide.sourceId, err)
      stats.erreurs++
    }
  }

  // Désactiver les aides dont la deadline est passée depuis > 7 jours
  const cutoff = new Date(Date.now() - 7 * 24 * 3600 * 1000)
  await prisma.aide.updateMany({
    where: { deadline: { lt: cutoff }, actif: true },
    data: { actif: false },
  })

  console.log('[syncAides] Terminé :', stats)
}

import type { Aide, EntrepriseProfile } from 'wasp/entities'

export type ScoreEligibilite = 'eligible' | 'probable' | 'non_eligible'

export interface Criteres {
  nafEligibles: string[]
  nafExclus: string[]
  effectifMin: number | null
  effectifMax: number | null
  ageEntrepriseMaxAns: number | null
  ageEntrepriseMinAns: number | null
  secteurs: string[]
  objetProjet: string[]
  zoneGeographique: string
  conditionsLibres: string[]
}

export interface DetailMatch {
  criteresValides: string[]
  criteresEchoues: string[]
  criteresInconnus: string[]
}

export function matcherAide(
  profil: EntrepriseProfile,
  aide: Aide
): { score: ScoreEligibilite; detail: DetailMatch } {
  const detail: DetailMatch = {
    criteresValides: [],
    criteresEchoues: [],
    criteresInconnus: [],
  }

  if (!aide.criteresJson) {
    return { score: 'probable', detail: { ...detail, criteresInconnus: ['critères non extraits'] } }
  }

  const criteres = aide.criteresJson as unknown as Criteres

  // Géographie
  if (aide.portee === 'national') {
    detail.criteresValides.push('portée nationale')
  } else if (aide.codesRegion.length > 0) {
    if (aide.codesRegion.includes(profil.codeRegion)) {
      detail.criteresValides.push(`région ${profil.codeRegion} éligible`)
    } else {
      detail.criteresEchoues.push(`région ${profil.codeRegion} hors zone`)
      return { score: 'non_eligible', detail }
    }
  }

  // NAF exclus — éliminatoire
  if (criteres.nafExclus?.length > 0) {
    const nafNorm = profil.codeNaf.replace('.', '')
    if (criteres.nafExclus.some((n) => nafNorm.startsWith(n.replace('.', '')))) {
      detail.criteresEchoues.push(`code NAF ${profil.codeNaf} exclu`)
      return { score: 'non_eligible', detail }
    }
  }

  // NAF éligibles
  if (criteres.nafEligibles?.length > 0) {
    const nafNorm = profil.codeNaf.replace('.', '')
    if (criteres.nafEligibles.some((n) => nafNorm.startsWith(n.replace('.', '')))) {
      detail.criteresValides.push(`code NAF ${profil.codeNaf} éligible`)
    } else {
      detail.criteresEchoues.push(`code NAF ${profil.codeNaf} non éligible`)
      return { score: 'non_eligible', detail }
    }
  }

  // Effectif
  const effectif = parseEffectif(profil.effectifTranche)
  if (effectif !== null) {
    if (criteres.effectifMin !== null && effectif < criteres.effectifMin) {
      detail.criteresEchoues.push(`effectif ${effectif} < minimum ${criteres.effectifMin}`)
      return { score: 'non_eligible', detail }
    }
    if (criteres.effectifMax !== null && effectif > criteres.effectifMax) {
      detail.criteresEchoues.push(`effectif ${effectif} > maximum ${criteres.effectifMax}`)
      return { score: 'non_eligible', detail }
    }
    if (criteres.effectifMin !== null || criteres.effectifMax !== null) {
      detail.criteresValides.push(`effectif ${effectif} dans la fourchette`)
    }
  } else if (criteres.effectifMin !== null || criteres.effectifMax !== null) {
    detail.criteresInconnus.push('effectif inconnu')
  }

  // Âge de l'entreprise
  if (profil.dateCreation) {
    const ageAns = (Date.now() - profil.dateCreation.getTime()) / (365.25 * 86400000)
    if (criteres.ageEntrepriseMaxAns !== null && ageAns > criteres.ageEntrepriseMaxAns) {
      detail.criteresEchoues.push(`entreprise trop ancienne (${Math.floor(ageAns)} ans > ${criteres.ageEntrepriseMaxAns})`)
      return { score: 'non_eligible', detail }
    }
    if (criteres.ageEntrepriseMinAns !== null && ageAns < criteres.ageEntrepriseMinAns) {
      detail.criteresEchoues.push(`entreprise trop jeune (${Math.floor(ageAns)} ans < ${criteres.ageEntrepriseMinAns})`)
      return { score: 'non_eligible', detail }
    }
  }

  // Conditions libres → toujours "inconnu" (non vérifiable automatiquement)
  if (criteres.conditionsLibres?.length > 0) {
    detail.criteresInconnus.push(...criteres.conditionsLibres)
  }

  // Score final
  // "eligible" = aucun critère éliminatoire échoué + confiance haute
  // Les conditionsLibres (non vérifiables) sont affichées mais ne bloquent pas
  const hasHardFailure = detail.criteresEchoues.length > 0
  const isHighConfidence = aide.criteresConfiance > 0.75

  if (!hasHardFailure && isHighConfidence) {
    return { score: 'eligible', detail }
  }
  return { score: 'probable', detail }
}

function parseEffectif(tranche: string | null): number | null {
  if (!tranche) return null
  const map: Record<string, number> = {
    '0': 0, NN: 0,
    '1': 1, '2': 2,
    '03': 3, '06': 6, '11': 11, '12': 12,
    '21': 21, '22': 22, '31': 31, '32': 32,
    '41': 41, '42': 42, '51': 51, '52': 52,
  }
  return map[tranche] ?? null
}

export interface CriteresPredefinis {
  nafEligibles: string[]
  nafExclus: string[]
  effectifMin: number | null
  effectifMax: number | null
  ageEntrepriseMaxAns: number | null
  ageEntrepriseMinAns: number | null
  formeJuridiqueEligibles: string[]
  secteurs: string[]
  objetProjet: string[]
  zoneGeographique: string
  conditionsLibres: string[]
  confiance: number // 0-1
}

export interface AideSourceBase {
  sourceId: string
  source: string
  titre: string
  description: string
  url: string
  typeMontant: string | null
  montantMin: number | null
  montantMax: number | null
  tauxAide: number | null
  deadline: Date | null
  portee: string
  codesRegion: string[]
  codesDept: string[]
  criteresPredefinis?: CriteresPredefinis
}

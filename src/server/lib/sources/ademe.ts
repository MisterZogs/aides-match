// Source : ADEME — https://agirpourlatransition.ademe.fr/entreprises
// Principaux dispositifs ADEME pour TPE/PME (transition écologique et énergétique).
// Source curatée — pas d'API publique dédiée aux aides entreprises ADEME.
// Dernière vérification : 2026-06-11

export interface AideSource {
  sourceId: string
  source: 'ademe'
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
}

const ADEME_AIDES: Omit<AideSource, 'source'>[] = [
  // ── Transition écologique ──────────────────────────────────────────────────
  {
    sourceId: 'ademe-tremplin-pme',
    titre: 'Tremplin pour la transition écologique des PME (ADEME)',
    description:
      'Aide à l\'investissement pour les PME souhaitant engager un plan de transition écologique et énergétique. Finance des investissements dans l\'efficacité énergétique, la décarbonation des procédés, les énergies renouvelables, la mobilité propre. Taux d\'aide de 20 à 45 % selon la taille et le type d\'investissement. Montant minimal de projet : 100 000 €.',
    url: 'https://agirpourlatransition.ademe.fr/entreprises/aides-financieres/2023/tremplin-transition-ecologique-pme',
    typeMontant: 'subvention',
    montantMin: 20000,
    montantMax: 200000,
    tauxAide: 0.35,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'ademe-diag-decarbonaction',
    titre: 'Diag Décarbon\'Action (ADEME)',
    description:
      'Diagnostic subventionné permettant aux PME d\'établir leur bilan carbone et de définir leur trajectoire de décarbonation. Prestation réalisée par un consultant certifié. Aide jusqu\'à 50 % des honoraires du prestataire. Accessible aux PME de plus de 3 salariés.',
    url: 'https://agirpourlatransition.ademe.fr/entreprises/aides-financieres/2023/diag-decarbonaction',
    typeMontant: 'subvention',
    montantMin: null,
    montantMax: 5000,
    tauxAide: 0.5,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'ademe-diag-energies',
    titre: 'Audit et diagnostic énergétique PME (ADEME)',
    description:
      'Subvention pour réaliser un audit énergétique de vos bâtiments et procédés industriels. Identifie les gisements d\'économies d\'énergie et priorise les actions. Obligatoire pour les grandes entreprises, subventionné pour les PME. Taux d\'aide jusqu\'à 70 %.',
    url: 'https://agirpourlatransition.ademe.fr/entreprises/aides-financieres/2023/audit-energetique-pme',
    typeMontant: 'subvention',
    montantMin: null,
    montantMax: 10000,
    tauxAide: 0.7,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'ademe-fonds-chaleur',
    titre: 'Fonds Chaleur ADEME (réseaux de chaleur et chaleur renouvelable)',
    description:
      'Aide à l\'investissement pour la production de chaleur renouvelable (biomasse, géothermie, solaire thermique, récupération de chaleur fatale). Destinée aux entreprises, collectivités et bailleurs sociaux. Taux d\'aide variable selon technologie et région, généralement 20 à 60 %.',
    url: 'https://agirpourlatransition.ademe.fr/entreprises/aides-financieres/fonds-chaleur',
    typeMontant: 'subvention',
    montantMin: 50000,
    montantMax: null,
    tauxAide: 0.4,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'ademe-advenir-borne-recharge',
    titre: 'ADVENIR — Aide à l\'installation de bornes de recharge (ADEME)',
    description:
      'Aide financière pour l\'installation de bornes de recharge pour véhicules électriques sur les parkings d\'entreprises, copropriétés et lieux ouverts au public. Montant variable selon le type de borne et le site. Accessible via les opérateurs partenaires ADVENIR.',
    url: 'https://advenir.mobi/',
    typeMontant: 'subvention',
    montantMin: null,
    montantMax: 50000,
    tauxAide: 0.5,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'ademe-econov',
    titre: 'Éco-conception et économie circulaire — Aides ADEME',
    description:
      'Aides à l\'investissement et au conseil pour les entreprises qui souhaitent intégrer l\'éco-conception dans leurs produits ou développer des pratiques d\'économie circulaire (réemploi, recyclage, symbiose industrielle). Taux d\'aide de 20 à 50 %.',
    url: 'https://agirpourlatransition.ademe.fr/entreprises/aides-financieres/economie-circulaire',
    typeMontant: 'subvention',
    montantMin: 20000,
    montantMax: 500000,
    tauxAide: 0.35,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'ademe-pret-vert-ademe',
    titre: 'Prêt Vert ADEME-BPI',
    description:
      'Prêt à taux bonifié co-financé ADEME/BPI pour les PME réalisant des investissements de transition écologique (énergie, mobilité, industrie verte). Accessible via les banques partenaires. Taux réduit de 0,5 à 1 point par rapport aux prêts classiques.',
    url: 'https://agirpourlatransition.ademe.fr/entreprises/aides-financieres/pret-vert',
    typeMontant: 'pret',
    montantMin: 50000,
    montantMax: 2000000,
    tauxAide: null,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'ademe-aap-industrie-verte',
    titre: 'Appels à projets Industrie Verte (ADEME / France 2030)',
    description:
      'Appels à projets pour soutenir la décarbonation de l\'industrie française dans le cadre de France 2030. Financements mixtes subvention/avance récupérable pour les PME/ETI souhaitant décarboner leurs procédés industriels. Dépôts continus ou par vague selon les dispositifs.',
    url: 'https://agirpourlatransition.ademe.fr/entreprises/aides-financieres/france-2030',
    typeMontant: 'subvention',
    montantMin: 200000,
    montantMax: null,
    tauxAide: 0.45,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
]

export async function fetchAdemeAides(): Promise<AideSource[]> {
  return ADEME_AIDES.map((a) => ({ ...a, source: 'ademe' as const }))
}

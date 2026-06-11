// Source : France Rénov / ANAH — https://france-renov.gouv.fr
// MaPrimeRénov est principalement destinée aux particuliers.
// Les dispositifs ci-dessous concernent les ENTREPRISES dans leur rôle de
// bailleur, copropriétaire, ou dans le cadre du Décret Tertiaire.
// Sont également incluses les aides pour les ENR (énergies renouvelables)
// accessibles aux entreprises.
// Dernière vérification : 2026-06-11

export interface AideSource {
  sourceId: string
  source: 'france-renov'
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

const FRANCE_RENOV_AIDES: Omit<AideSource, 'source'>[] = [
  // ── MaPrimeRénov Copropriété ────────────────────────────────────────────────
  {
    sourceId: 'mpr-copro',
    titre: 'MaPrimeRénov\' Copropriété (bailleurs et SCI)',
    description:
      'Aide à la rénovation énergétique des parties communes des copropriétés. Accessible aux syndicats de copropriétaires, SCI et personnes morales propriétaires de logements collectifs. Prime calculée par logement selon le gain énergétique atteint (au moins 35 % de gain d\'énergie). Taux de 30 à 45 % du coût des travaux selon les logements modestes.',
    url: 'https://france-renov.gouv.fr/aides/maprimerenov-copropriete',
    typeMontant: 'subvention',
    montantMin: 3000,
    montantMax: 165000,
    tauxAide: 0.45,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'mpr-bailleur',
    titre: 'MaPrimeRénov\' Bailleur (propriétaires bailleurs)',
    description:
      'Aide à la rénovation énergétique pour les propriétaires bailleurs (personnes physiques ou morales) louant ou souhaitant louer un logement après travaux. Permet de financer le remplacement d\'un chauffage au fioul/gaz, l\'isolation ou une rénovation globale. Engagement de louer à loyer maîtrisé pendant 6 ans.',
    url: 'https://france-renov.gouv.fr/aides/maprimerenov-proprietaire-bailleur',
    typeMontant: 'subvention',
    montantMin: 1500,
    montantMax: 90000,
    tauxAide: 0.4,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },

  // ── Décret Tertiaire / Obligations entreprises ──────────────────────────────
  {
    sourceId: 'decret-tertiaire-aide',
    titre: 'Aides Décret Tertiaire — Rénovation bâtiments professionnels',
    description:
      'Le Décret Tertiaire impose une réduction des consommations énergétiques de 40 % en 2030, 50 % en 2040 et 60 % en 2050 pour les bâtiments tertiaires de plus de 1 000 m². Des aides (CEE, subventions régionales, Fonds Chaleur) sont mobilisables pour accompagner les travaux de mise en conformité. Plateforme de suivi OPERAT.',
    url: 'https://operat.ademe.fr/',
    typeMontant: 'subvention',
    montantMin: null,
    montantMax: null,
    tauxAide: null,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },

  // ── Énergies renouvelables entreprises ─────────────────────────────────────
  {
    sourceId: 'enr-autoconsommation-photovoltaique',
    titre: 'Prime à l\'autoconsommation photovoltaïque (entreprises)',
    description:
      'Prime versée par EDF OA ou les distributeurs d\'énergie pour l\'installation de panneaux solaires photovoltaïques en autoconsommation avec vente du surplus. Accessible aux entreprises, artisans, commerçants et agriculteurs. Montant de la prime dégressif selon la puissance installée (kWc). Calculée sur 5 ans de production.',
    url: 'https://www.cre.fr/acteurs/producteurs-delectricite/photovoltaique',
    typeMontant: 'subvention',
    montantMin: 500,
    montantMax: 50000,
    tauxAide: null,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'enr-obligation-achat-photovoltaique',
    titre: 'Obligation d\'achat — Énergie solaire photovoltaïque (entreprises)',
    description:
      'Tarif garanti de rachat de l\'électricité solaire produite, fixé par arrêté ministériel pour 20 ans. Accessible aux entreprises installant des panneaux photovoltaïques sur leurs bâtiments ou terrains. Appels d\'offres CRE pour les puissances > 500 kWc. Permet de sécuriser les revenus de l\'installation.',
    url: 'https://www.cre.fr/acteurs/producteurs-delectricite/photovoltaique/tarifs-dachat',
    typeMontant: 'subvention',
    montantMin: null,
    montantMax: null,
    tauxAide: null,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'enr-solaire-thermique-entreprise',
    titre: 'Aides solaire thermique pour entreprises (Fonds Chaleur + CEE)',
    description:
      'Combinaison Fonds Chaleur (ADEME) et CEE pour financer l\'installation de capteurs solaires thermiques produisant de la chaleur pour le process industriel ou le chauffage des locaux professionnels. Taux d\'aide total pouvant atteindre 50 à 70 % selon la taille et la région.',
    url: 'https://agirpourlatransition.ademe.fr/entreprises/aides-financieres/fonds-chaleur',
    typeMontant: 'subvention',
    montantMin: 5000,
    montantMax: 200000,
    tauxAide: 0.5,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'enr-aap-agrivoltaisme',
    titre: 'Appels d\'offres agrivoltaïsme CRE (agriculteurs et exploitations)',
    description:
      'Appels d\'offres de la CRE pour les projets agrivoltaïques permettant de produire de l\'électricité solaire sur des terres agricoles tout en maintenant l\'activité agricole. Tarif de rachat garanti sur 20 ans. Accessible aux exploitants agricoles, groupements et entreprises agroalimentaires.',
    url: 'https://www.cre.fr/acteurs/producteurs-delectricite/photovoltaique/agrivoltaisme',
    typeMontant: 'subvention',
    montantMin: null,
    montantMax: null,
    tauxAide: null,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'enr-geothermie-entreprise',
    titre: 'Fonds Chaleur — Géothermie pour entreprises',
    description:
      'Aide à l\'investissement ADEME (Fonds Chaleur) pour l\'installation d\'un système géothermique (sonde verticale, nappe phréatique) couplé à une pompe à chaleur pour le chauffage ou le refroidissement de bâtiments professionnels ou industriels. Taux 30 à 50 %.',
    url: 'https://agirpourlatransition.ademe.fr/entreprises/aides-financieres/fonds-chaleur',
    typeMontant: 'subvention',
    montantMin: 10000,
    montantMax: 500000,
    tauxAide: 0.4,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'enr-biogaz-methanisation',
    titre: 'Aide à la méthanisation agricole et industrielle',
    description:
      'Soutien à la production de biogaz (méthane) par la méthanisation de déchets organiques agricoles ou industriels. Tarif de rachat garanti de l\'électricité et/ou du biométhane injecté dans le réseau. Subventions ADEME complémentaires pour les PME. Accessible aux exploitations agricoles, IAA et entreprises agroalimentaires.',
    url: 'https://agirpourlatransition.ademe.fr/entreprises/aides-financieres/methanisation',
    typeMontant: 'subvention',
    montantMin: 50000,
    montantMax: null,
    tauxAide: 0.3,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
]

export async function fetchFranceRenovAides(): Promise<AideSource[]> {
  return FRANCE_RENOV_AIDES.map((a) => ({ ...a, source: 'france-renov' as const }))
}

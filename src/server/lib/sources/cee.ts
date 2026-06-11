// Source : CEE — Certificats d'Économie d'Énergie
// https://www.ecologie.gouv.fr/politiques-publiques/certificats-economies-denergie
// Les CEE sont des obligations imposées aux fournisseurs d'énergie (obligés),
// qui financent des travaux d'économie d'énergie chez les ménages et les entreprises.
// Pas d'API publique dédiée — source curatée des fiches standardisées (FOST) pour les entreprises.
// Plateforme Emmy : https://www.emmy.fr/
// Dernière vérification : 2026-06-11

export interface AideSource {
  sourceId: string
  source: 'cee'
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

const CEE_AIDES: Omit<AideSource, 'source'>[] = [
  // ── Bâtiment tertiaire ─────────────────────────────────────────────────────
  {
    sourceId: 'cee-bat-th-116-isolation-combles',
    titre: 'CEE — Isolation des combles et toitures (bâtiment tertiaire)',
    description:
      'Prime CEE pour l\'isolation thermique des combles, toitures terrasses et toitures de bâtiments tertiaires. Fiche BAT-EN-101. Le montant de la prime est calculé en kWh cumac selon la surface isolée et la zone climatique. Accessible via un fournisseur d\'énergie (EDF, Engie, TotalEnergies, etc.) ou un agrégateur CEE.',
    url: 'https://www.ecologie.gouv.fr/politiques-publiques/certificats-economies-denergie',
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
    sourceId: 'cee-bat-en-102-isolation-murs',
    titre: 'CEE — Isolation des murs (bâtiment tertiaire)',
    description:
      'Prime CEE pour l\'isolation thermique des murs par l\'intérieur ou l\'extérieur des bâtiments à usage tertiaire. Fiche BAT-EN-102. Le montant dépend de la surface traitée, de la résistance thermique et de la zone climatique.',
    url: 'https://www.ecologie.gouv.fr/politiques-publiques/certificats-economies-denergie',
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
    sourceId: 'cee-bat-th-104-chaudiere-biomasse',
    titre: 'CEE — Chaudière biomasse pour bâtiment tertiaire',
    description:
      'Prime CEE pour l\'installation d\'une chaudière à biomasse (bois, granulés) dans un bâtiment tertiaire en remplacement d\'une chaudière fioul ou gaz. Fiche BAT-TH-104. Montant calculé selon la puissance et l\'usage annuel.',
    url: 'https://www.ecologie.gouv.fr/politiques-publiques/certificats-economies-denergie',
    typeMontant: 'subvention',
    montantMin: 2000,
    montantMax: 100000,
    tauxAide: null,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'cee-bat-th-113-pompe-chaleur',
    titre: 'CEE — Pompe à chaleur pour bâtiment tertiaire',
    description:
      'Prime CEE pour l\'installation d\'une pompe à chaleur (PAC air/eau, eau/eau, géothermique) dans un bâtiment tertiaire. Fiche BAT-TH-113. Accessible aux entreprises, artisans, commerçants propriétaires ou bailleurs de locaux tertiaires.',
    url: 'https://www.ecologie.gouv.fr/politiques-publiques/certificats-economies-denergie',
    typeMontant: 'subvention',
    montantMin: 1000,
    montantMax: 50000,
    tauxAide: null,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'cee-bat-eq-127-eclairage-led',
    titre: 'CEE — Remplacement de l\'éclairage par des LED (bâtiment tertiaire)',
    description:
      'Prime CEE pour le remplacement de l\'éclairage intérieur ou extérieur par des luminaires LED dans les bâtiments tertiaires. Fiche BAT-EQ-127. Le montant dépend du nombre de points lumineux remplacés et de la technologie installée.',
    url: 'https://www.ecologie.gouv.fr/politiques-publiques/certificats-economies-denergie',
    typeMontant: 'subvention',
    montantMin: 200,
    montantMax: 30000,
    tauxAide: null,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },

  // ── Industrie ──────────────────────────────────────────────────────────────
  {
    sourceId: 'cee-ind-ut-102-moteur-electrique',
    titre: 'CEE — Moteur électrique à haut rendement (industrie)',
    description:
      'Prime CEE pour le remplacement d\'un moteur électrique par un moteur IE3 ou IE4 à haut rendement énergétique. Fiche IND-UT-102. Accessible aux entreprises industrielles et artisanales. Montant proportionnel à la puissance du moteur.',
    url: 'https://www.ecologie.gouv.fr/politiques-publiques/certificats-economies-denergie',
    typeMontant: 'subvention',
    montantMin: 100,
    montantMax: 20000,
    tauxAide: null,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'cee-ind-ut-117-variateur-vitesse',
    titre: 'CEE — Variateur de vitesse sur moteur (industrie)',
    description:
      'Prime CEE pour l\'installation d\'un variateur de vitesse électronique sur un moteur existant ou neuf dans un process industriel. Fiche IND-UT-117. Permet des économies d\'énergie de 20 à 50 % sur les moteurs à charge variable.',
    url: 'https://www.ecologie.gouv.fr/politiques-publiques/certificats-economies-denergie',
    typeMontant: 'subvention',
    montantMin: 100,
    montantMax: 15000,
    tauxAide: null,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'cee-ind-ut-136-recuperation-chaleur',
    titre: 'CEE — Récupération de chaleur fatale (industrie)',
    description:
      'Prime CEE pour les installations de récupération et valorisation de la chaleur fatale industrielle (fumées, process, compresseurs). Fiche IND-UT-136. Accessible aux PME et grandes entreprises industrielles.',
    url: 'https://www.ecologie.gouv.fr/politiques-publiques/certificats-economies-denergie',
    typeMontant: 'subvention',
    montantMin: 5000,
    montantMax: 500000,
    tauxAide: null,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },

  // ── Transport / Mobilité ────────────────────────────────────────────────────
  {
    sourceId: 'cee-tre-vehicule-electrique',
    titre: 'CEE — Prime véhicule utilitaire électrique ou hydrogène',
    description:
      'Prime CEE pour l\'achat d\'un véhicule utilitaire léger ou poids lourd électrique ou à hydrogène par une entreprise, en remplacement ou en complément d\'un véhicule thermique. Fiche TRA-SE-106. Cumulable avec le bonus écologique et le suramortissement.',
    url: 'https://www.ecologie.gouv.fr/politiques-publiques/certificats-economies-denergie',
    typeMontant: 'subvention',
    montantMin: 1000,
    montantMax: 20000,
    tauxAide: null,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
]

export async function fetchCeeAides(): Promise<AideSource[]> {
  return CEE_AIDES.map((a) => ({ ...a, source: 'cee' as const }))
}

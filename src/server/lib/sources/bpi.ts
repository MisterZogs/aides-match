// Source : Bpifrance — https://www.bpifrance.fr/nos-solutions
// Liste curatée des principaux dispositifs BPI pour TPE/PME.
// À mettre à jour manuellement si BPI modifie ses produits.
// Dernière vérification : 2026-06-11

export interface AideSource {
  sourceId: string
  source: 'bpi'
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

const BPI_AIDES: Omit<AideSource, 'source'>[] = [
  // ── Prêts ──────────────────────────────────────────────────────────────────
  {
    sourceId: 'bpi-pret-atout',
    titre: 'Prêt Atout BPI',
    description:
      'Prêt sans garantie ni caution personnelle pour financer les besoins en fonds de roulement liés à une forte croissance ou à une sous-traitance importante. Réservé aux PME en croissance avec au moins 3 ans d\'existence.',
    url: 'https://www.bpifrance.fr/nos-solutions/financement/prets/pret-atout',
    typeMontant: 'pret',
    montantMin: 50000,
    montantMax: 5000000,
    tauxAide: null,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'bpi-pret-croissance-verte',
    titre: 'Prêt Croissance Verte BPI',
    description:
      'Prêt à taux bonifié pour financer les investissements liés à la transition écologique et énergétique des TPE/PME : efficacité énergétique, énergies renouvelables, mobilité propre, économie circulaire. Couvre jusqu\'à 100 % du projet sans garantie sur actifs.',
    url: 'https://www.bpifrance.fr/nos-solutions/financement/prets/pret-croissance-verte',
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
    sourceId: 'bpi-pret-developpement-tpe',
    titre: 'Prêt Développement TPE BPI',
    description:
      'Prêt sans garantie sur les actifs ni caution personnelle du dirigeant pour financer les besoins de développement des TPE de moins de 50 salariés. Durée 5 à 7 ans avec différé d\'amortissement.',
    url: 'https://www.bpifrance.fr/nos-solutions/financement/prets/pret-developpement-tpe',
    typeMontant: 'pret',
    montantMin: 10000,
    montantMax: 300000,
    tauxAide: null,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'bpi-pret-booster-tpe',
    titre: 'Prêt Booster TPE BPI',
    description:
      'Prêt pour les TPE de moins de 10 salariés visant à financer des investissements immatériels ou corporels. Sans garantie sur actifs professionnels. Accessible à partir de 1 an d\'existence.',
    url: 'https://www.bpifrance.fr/nos-solutions/financement/prets/pret-booster',
    typeMontant: 'pret',
    montantMin: 10000,
    montantMax: 100000,
    tauxAide: null,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'bpi-pret-transmission',
    titre: 'Prêt Transmission BPI',
    description:
      'Prêt sans garantie pour financer la reprise d\'une entreprise (rachat de parts sociales, fonds de commerce). Destiné aux PME dont le chiffre d\'affaires est inférieur à 50 M€. Durée jusqu\'à 7 ans.',
    url: 'https://www.bpifrance.fr/nos-solutions/financement/prets/pret-transmission',
    typeMontant: 'pret',
    montantMin: 200000,
    montantMax: 5000000,
    tauxAide: null,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'bpi-pret-export',
    titre: 'Prêt Croissance International BPI',
    description:
      'Prêt sans garantie pour financer les dépenses liées au développement à l\'export : recrutement commercial, études de marché, participation à des salons internationaux, adaptation de l\'offre.',
    url: 'https://www.bpifrance.fr/nos-solutions/financement/prets/pret-croissance-international',
    typeMontant: 'pret',
    montantMin: 30000,
    montantMax: 5000000,
    tauxAide: null,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },

  // ── Garanties ──────────────────────────────────────────────────────────────
  {
    sourceId: 'bpi-garantie-classique',
    titre: 'Garantie de prêt bancaire BPI (classique)',
    description:
      'BPI garantit jusqu\'à 70 % du prêt bancaire accordé par un établissement de crédit pour financer la création, le développement ou la transmission d\'une entreprise. Permet d\'obtenir un financement bancaire sans apport personnel suffisant.',
    url: 'https://www.bpifrance.fr/nos-solutions/financement/garanties/garantie-creation',
    typeMontant: 'garantie',
    montantMin: null,
    montantMax: null,
    tauxAide: 0.7,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'bpi-garantie-renforcement-tresorerie',
    titre: 'Garantie Renforcement de Trésorerie BPI',
    description:
      'Garantie à 70 % d\'un prêt bancaire destiné à renforcer la trésorerie de l\'entreprise face à une difficulté conjoncturelle passagère (perte de marché, sinistre, retournement de marché).',
    url: 'https://www.bpifrance.fr/nos-solutions/financement/garanties/garantie-renforcement-tresorerie',
    typeMontant: 'garantie',
    montantMin: null,
    montantMax: null,
    tauxAide: 0.7,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },

  // ── Innovation ─────────────────────────────────────────────────────────────
  {
    sourceId: 'bpi-aide-innovation-faisabilite',
    titre: 'Aide à l\'Innovation — Faisabilité BPI',
    description:
      'Subvention ou avance récupérable pour financer les études de faisabilité (marché, technique, juridique) d\'un projet d\'innovation. Destinée aux PME et ETI. Taux d\'aide jusqu\'à 45 % des dépenses.',
    url: 'https://www.bpifrance.fr/nos-solutions/innovation/aides-et-financements-de-linnovation/aide-faisabilite',
    typeMontant: 'subvention',
    montantMin: 25000,
    montantMax: 300000,
    tauxAide: 0.45,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'bpi-aide-innovation-developpement',
    titre: 'Aide à l\'Innovation — Développement BPI',
    description:
      'Avance récupérable ou prêt à taux zéro pour financer les travaux de R&D d\'un projet innovant à fort potentiel de marché. Destinée aux PME. Taux d\'aide de 25 à 45 % des dépenses éligibles.',
    url: 'https://www.bpifrance.fr/nos-solutions/innovation/aides-et-financements-de-linnovation/aide-au-developpement',
    typeMontant: 'subvention',
    montantMin: 100000,
    montantMax: 5000000,
    tauxAide: 0.45,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'bpi-concours-i-lab',
    titre: 'Concours d\'Innovation i-Lab BPI',
    description:
      'Concours annuel récompensant les projets de création d\'entreprises innovantes à fort potentiel. Subvention de 45 000 à 600 000 € selon les lauréats. Ouvert aux porteurs de projets, chercheurs, étudiants et jeunes entreprises de moins de 2 ans.',
    url: 'https://www.bpifrance.fr/nos-solutions/innovation/concours/i-lab',
    typeMontant: 'subvention',
    montantMin: 45000,
    montantMax: 600000,
    tauxAide: null,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'bpi-concours-i-nov',
    titre: 'Concours d\'Innovation i-Nov BPI',
    description:
      'Aide aux projets d\'innovation à fort contenu technologique portés par des PME. Financement sous forme de subvention et/ou d\'avance récupérable. Appels à projets thématiques publiés régulièrement.',
    url: 'https://www.bpifrance.fr/nos-solutions/innovation/concours/i-nov',
    typeMontant: 'subvention',
    montantMin: 200000,
    montantMax: 2000000,
    tauxAide: 0.5,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
  {
    sourceId: 'bpi-pret-french-tech',
    titre: 'Prêt French Tech BPI',
    description:
      'Prêt sans garantie pour les startups et PME innovantes membres de l\'écosystème French Tech. Finance les besoins de croissance rapide. Montant jusqu\'à 5 M€, durée 5 à 7 ans.',
    url: 'https://www.bpifrance.fr/nos-solutions/financement/prets/pret-french-tech',
    typeMontant: 'pret',
    montantMin: 200000,
    montantMax: 5000000,
    tauxAide: null,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },

  // ── Accompagnement ──────────────────────────────────────────────────────────
  {
    sourceId: 'bpi-diag-region',
    titre: 'Diagnostic Conseil BPI (Diag)',
    description:
      'Prestation de conseil subventionnée pour diagnostiquer et accompagner les PME sur leurs enjeux stratégiques : numérique, export, RSE, transition écologique, RH. BPI prend en charge une partie des honoraires du consultant.',
    url: 'https://www.bpifrance.fr/nos-solutions/accompagnement/diagnostics-et-conseils',
    typeMontant: 'conseil',
    montantMin: null,
    montantMax: null,
    tauxAide: 0.5,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
  },
]

export async function fetchBpiAides(): Promise<AideSource[]> {
  return BPI_AIDES.map((a) => ({ ...a, source: 'bpi' as const }))
}

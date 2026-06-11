// Source : Exonérations fiscales et sociales liées aux zones prioritaires
// DGFiP + URSSAF + Commissariat Général à l'Égalité des Territoires (CGET)
// Ces exonérations sont automatiques dès lors que l'entreprise répond aux critères
// d'implantation géographique (vérifiable via le code INSEE de l'établissement).
//
// Listes officielles des communes par zone :
//   ZFU-TE : https://www.data.gouv.fr/fr/datasets/zones-franches-urbaines/
//   ZRR    : https://www.data.gouv.fr/fr/datasets/zones-de-revitalisation-rurale/
//   QPV    : https://www.data.gouv.fr/fr/datasets/quartiers-prioritaires/
//   BER    : https://www.legifrance.gouv.fr (décrets)
//   BUD    : https://www.legifrance.gouv.fr
//
// TODO : enrichir le matching en vérifiant le code INSEE de l'entreprise
//        contre les listes officielles téléchargées depuis data.gouv.fr.
// Dernière vérification : 2026-06-11

import type { AideSourceBase } from './types'

const ZONES_GEO_AIDES: AideSourceBase[] = [
  // ── ZFU-TE ─────────────────────────────────────────────────────────────────
  {
    sourceId: 'zone-zfu-te-exo-is',
    source: 'zones-geo',
    titre: 'ZFU-TE — Exonération d\'IS / IR BIC (Zone Franche Urbaine)',
    description:
      'Les entreprises implantées dans une Zone Franche Urbaine - Territoire Entrepreneur (ZFU-TE) et créées ou reprises avant le 31/12/2024 bénéficient d\'une exonération totale d\'impôt sur les bénéfices pendant 5 ans, puis dégressive sur 9 ans (60 %, 40 %, 20 % les 3 dernières années). Condition : au moins 1/3 des salariés résidant dans la ZFU ou en QPV. Plafond de bénéfice exonéré : 50 000 € par an (majoré de 5 000 € par emploi à plein temps créé résidant dans la zone). 44 ZFU-TE en France métropolitaine.',
    url: 'https://www.service-public.fr/professionnels-entreprises/vosdroits/F32304',
    typeMontant: 'subvention',
    montantMin: null,
    montantMax: null,
    tauxAide: 1.0,
    deadline: null,
    portee: 'local',
    codesRegion: [],
    codesDept: [],
    criteresPredefinis: {
      nafEligibles: [],
      nafExclus: [],
      effectifMin: null,
      effectifMax: 49,
      ageEntrepriseMaxAns: null,
      ageEntrepriseMinAns: null,
      formeJuridiqueEligibles: [],
      secteurs: [],
      objetProjet: [],
      zoneGeographique: 'local',
      conditionsLibres: [
        'Établissement situé dans une Zone Franche Urbaine - Territoire Entrepreneur (ZFU-TE)',
        'Moins de 50 salariés au moment de l\'implantation',
        'Au moins 1/3 des salariés résidant dans la ZFU ou en QPV',
      ],
      confiance: 0.75,
    },
  },
  {
    sourceId: 'zone-zfu-te-exo-charges',
    source: 'zones-geo',
    titre: 'ZFU-TE — Exonération de charges sociales patronales',
    description:
      'Exonération de cotisations patronales d\'assurance maladie, vieillesse, famille et accidents du travail pour les entreprises implantées en ZFU-TE sur les salaires n\'excédant pas 1,4 SMIC. Exonération totale pendant 5 ans, puis dégressive sur 9 ans (60 %, 40 %, 20 %). Plafond : 50 emplois exonérés. Condition : au moins 1/3 des salariés embauchés résidant dans la ZFU ou en QPV.',
    url: 'https://www.service-public.fr/professionnels-entreprises/vosdroits/F32304',
    typeMontant: 'subvention',
    montantMin: null,
    montantMax: null,
    tauxAide: null,
    deadline: null,
    portee: 'local',
    codesRegion: [],
    codesDept: [],
    criteresPredefinis: {
      nafEligibles: [],
      nafExclus: [],
      effectifMin: null,
      effectifMax: 49,
      ageEntrepriseMaxAns: null,
      ageEntrepriseMinAns: null,
      formeJuridiqueEligibles: [],
      secteurs: [],
      objetProjet: [],
      zoneGeographique: 'local',
      conditionsLibres: [
        'Établissement situé en ZFU-TE',
        'Salariés dont la rémunération est ≤ 1,4 SMIC',
        'Au moins 1/3 des embauches nouvelles résidant dans la ZFU ou en QPV',
      ],
      confiance: 0.75,
    },
  },

  // ── ZRR ────────────────────────────────────────────────────────────────────
  {
    sourceId: 'zone-zrr-exo-is',
    source: 'zones-geo',
    titre: 'ZRR — Exonération d\'IS / IR BIC (Zone de Revitalisation Rurale)',
    description:
      'Exonération totale d\'impôt sur les bénéfices pendant 5 ans pour les entreprises créées ou reprises dans une Zone de Revitalisation Rurale (ZRR), puis exonération à 75 % les années 6-7 et 50 % les années 8-9. S\'applique aux activités commerciales, artisanales, industrielles ou libérales. Condition : entreprise de moins de 11 salariés, non reprise d\'une activité déjà existante. Les ZRR ont été remplacées par les zones France Ruralités Revitalisation (FRR) depuis le 01/07/2024.',
    url: 'https://www.service-public.fr/professionnels-entreprises/vosdroits/F23436',
    typeMontant: 'subvention',
    montantMin: null,
    montantMax: null,
    tauxAide: 1.0,
    deadline: null,
    portee: 'local',
    codesRegion: [],
    codesDept: [],
    criteresPredefinis: {
      nafEligibles: [],
      nafExclus: [],
      effectifMin: null,
      effectifMax: 10,
      ageEntrepriseMaxAns: null,
      ageEntrepriseMinAns: null,
      formeJuridiqueEligibles: [],
      secteurs: [],
      objetProjet: [],
      zoneGeographique: 'local',
      conditionsLibres: [
        'Établissement situé en Zone de Revitalisation Rurale (ZRR) ou France Ruralités Revitalisation (FRR)',
        'Moins de 11 salariés',
        'Création ou reprise d\'activité (pas de reprise d\'entreprise existante)',
      ],
      confiance: 0.75,
    },
  },
  {
    sourceId: 'zone-zrr-exo-charges',
    source: 'zones-geo',
    titre: 'ZRR / FRR — Exonération de charges sociales patronales',
    description:
      'Exonération totale de cotisations patronales pendant 12 mois pour les entreprises en ZRR (ou FRR depuis 2024) embauchant un premier salarié ou tout salarié dans les entreprises de moins de 50 salariés. La ZRR a évolué en France Ruralités Revitalisation (FRR) au 01/07/2024 avec deux niveaux d\'intensité (FRR de base et FRR renforcé).',
    url: 'https://www.service-public.fr/professionnels-entreprises/vosdroits/F23436',
    typeMontant: 'subvention',
    montantMin: null,
    montantMax: null,
    tauxAide: null,
    deadline: null,
    portee: 'local',
    codesRegion: [],
    codesDept: [],
    criteresPredefinis: {
      nafEligibles: [],
      nafExclus: [],
      effectifMin: null,
      effectifMax: 49,
      ageEntrepriseMaxAns: null,
      ageEntrepriseMinAns: null,
      formeJuridiqueEligibles: [],
      secteurs: [],
      objetProjet: ['recrutement'],
      zoneGeographique: 'local',
      conditionsLibres: [
        'Établissement situé en ZRR ou FRR',
        'Embauche d\'un salarié en CDI ou CDD ≥ 12 mois',
      ],
      confiance: 0.75,
    },
  },

  // ── QPV ────────────────────────────────────────────────────────────────────
  {
    sourceId: 'zone-qpv-exo-cfe',
    source: 'zones-geo',
    titre: 'QPV — Exonération de CFE (Quartier Prioritaire de la Ville)',
    description:
      'Exonération de Cotisation Foncière des Entreprises (CFE) pendant 5 ans pour les entreprises implantées dans un Quartier Prioritaire de la Ville (QPV). L\'exonération est de droit, sauf délibération contraire de la collectivité. Elle peut être totale ou partielle selon le QPV. S\'applique aux très petites entreprises dont le chiffre d\'affaires est inférieur à 2 M€ HT. 1 514 QPV en France métropolitaine.',
    url: 'https://www.service-public.fr/professionnels-entreprises/vosdroits/F23437',
    typeMontant: 'subvention',
    montantMin: null,
    montantMax: null,
    tauxAide: null,
    deadline: null,
    portee: 'local',
    codesRegion: [],
    codesDept: [],
    criteresPredefinis: {
      nafEligibles: [],
      nafExclus: [],
      effectifMin: null,
      effectifMax: null,
      ageEntrepriseMaxAns: null,
      ageEntrepriseMinAns: null,
      formeJuridiqueEligibles: [],
      secteurs: [],
      objetProjet: [],
      zoneGeographique: 'local',
      conditionsLibres: [
        'Établissement situé dans un Quartier Prioritaire de la Ville (QPV)',
        'Chiffre d\'affaires annuel inférieur à 2 M€ HT',
      ],
      confiance: 0.75,
    },
  },
  {
    sourceId: 'zone-qpv-exo-charges',
    source: 'zones-geo',
    titre: 'QPV — Exonération de charges sociales (micro-entreprises en QPV)',
    description:
      'Exonération de cotisations sociales patronales pour les très petites entreprises (moins de 5 salariés) implantées en QPV embauchant un résident du quartier en CDI ou CDD de plus de 12 mois. L\'exonération est de 40 % la 1re année, 20 % la 2e, 10 % la 3e. Accessible aux commerces, artisans et services de proximité.',
    url: 'https://www.service-public.fr/professionnels-entreprises/vosdroits/F23437',
    typeMontant: 'subvention',
    montantMin: null,
    montantMax: null,
    tauxAide: 0.4,
    deadline: null,
    portee: 'local',
    codesRegion: [],
    codesDept: [],
    criteresPredefinis: {
      nafEligibles: [],
      nafExclus: [],
      effectifMin: null,
      effectifMax: 4,
      ageEntrepriseMaxAns: null,
      ageEntrepriseMinAns: null,
      formeJuridiqueEligibles: [],
      secteurs: [],
      objetProjet: ['recrutement'],
      zoneGeographique: 'local',
      conditionsLibres: [
        'Établissement situé en QPV',
        'Moins de 5 salariés',
        'Embauche d\'un résident du QPV en CDI ou CDD ≥ 12 mois',
      ],
      confiance: 0.75,
    },
  },

  // ── BER ────────────────────────────────────────────────────────────────────
  {
    sourceId: 'zone-ber-exo-is',
    source: 'zones-geo',
    titre: 'BER — Exonération d\'IS (Bassin d\'Emploi à Redynamiser)',
    description:
      'Les entreprises créées dans un Bassin d\'Emploi à Redynamiser (BER) bénéficient d\'une exonération d\'IS totale pendant 7 ans. Les BER sont situés dans des territoires à fort chômage structurel. Actuellement 2 BER en France : la Vallée de la Meuse (Ardennes) et le bassin de Lavelanet (Ariège). S\'applique uniquement aux nouvelles implantations (création ou transfert d\'activité).',
    url: 'https://www.service-public.fr/professionnels-entreprises/vosdroits/F31301',
    typeMontant: 'subvention',
    montantMin: null,
    montantMax: null,
    tauxAide: 1.0,
    deadline: null,
    portee: 'local',
    codesRegion: [],
    codesDept: ['08', '09'],
    criteresPredefinis: {
      nafEligibles: [],
      nafExclus: [],
      effectifMin: null,
      effectifMax: null,
      ageEntrepriseMaxAns: null,
      ageEntrepriseMinAns: null,
      formeJuridiqueEligibles: [],
      secteurs: [],
      objetProjet: [],
      zoneGeographique: 'departemental',
      conditionsLibres: [
        'Établissement situé dans un Bassin d\'Emploi à Redynamiser (Ardennes 08 ou Ariège 09)',
        'Création ou transfert d\'activité dans la zone',
      ],
      confiance: 0.8,
    },
  },
]

export async function fetchZonesGeographiquesAides(): Promise<AideSourceBase[]> {
  return ZONES_GEO_AIDES
}

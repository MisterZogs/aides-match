// Source : France Travail (ex-Pôle Emploi) + AGEFIPH + ASP
// Aides à l'emploi, à l'alternance et à la création d'entreprise.
// Source curatée — l'API France Travail (francetravail.io) requiert une inscription.
// Dernière vérification : 2026-06-11

import type { AideSourceBase } from './types'

const FRANCE_TRAVAIL_AIDES: AideSourceBase[] = [
  // ── Apprentissage / Alternance ──────────────────────────────────────────────
  {
    sourceId: 'ft-aide-unique-apprentissage',
    source: 'france-travail',
    titre: 'Aide unique à l\'apprentissage (entreprises < 250 salariés)',
    description:
      'Aide automatique versée par l\'ASP à toute entreprise de moins de 250 salariés embauchant un apprenti en contrat d\'apprentissage. Montant : 6 000 € la première année du contrat, puis 2 000 €/an les années suivantes. Aucune demande à faire : l\'aide est déclenchée à la signature du contrat via le CERFA et l\'OPCO. Cumulable avec les exonérations de charges sur les contrats d\'apprentissage.',
    url: 'https://www.service-public.fr/professionnels-entreprises/vosdroits/F23556',
    typeMontant: 'subvention',
    montantMin: 2000,
    montantMax: 6000,
    tauxAide: null,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
    criteresPredefinis: {
      nafEligibles: [],
      nafExclus: [],
      effectifMin: null,
      effectifMax: 249,
      ageEntrepriseMaxAns: null,
      ageEntrepriseMinAns: null,
      formeJuridiqueEligibles: [],
      secteurs: [],
      objetProjet: ['recrutement', 'apprentissage', 'alternance'],
      zoneGeographique: 'national',
      conditionsLibres: ['Embauche d\'un apprenti en contrat d\'apprentissage'],
      confiance: 0.95,
    },
  },
  {
    sourceId: 'ft-aide-professionnalisation',
    source: 'france-travail',
    titre: 'Aide à l\'embauche en contrat de professionnalisation',
    description:
      'Aide financière versée par France Travail pour l\'embauche d\'un demandeur d\'emploi de 26 ans et plus en contrat de professionnalisation. Montant de 2 000 € pour les contrats conclus avec un demandeur d\'emploi de 26 ans et plus. Une aide majorée est possible pour les publics prioritaires (seniors, demandeurs d\'emploi longue durée, bénéficiaires du RSA).',
    url: 'https://www.service-public.fr/professionnels-entreprises/vosdroits/F15204',
    typeMontant: 'subvention',
    montantMin: 2000,
    montantMax: 4000,
    tauxAide: null,
    deadline: null,
    portee: 'national',
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
      objetProjet: ['recrutement', 'alternance', 'formation'],
      zoneGeographique: 'national',
      conditionsLibres: ['Embauche d\'un demandeur d\'emploi en contrat de professionnalisation'],
      confiance: 0.9,
    },
  },

  // ── Création / Reprise d'entreprise ────────────────────────────────────────
  {
    sourceId: 'ft-acre',
    source: 'france-travail',
    titre: 'ACRE — Aide aux Créateurs et Repreneurs d\'Entreprise',
    description:
      'Exonération partielle de cotisations sociales pendant 12 mois pour les créateurs ou repreneurs d\'entreprise (auto-entrepreneurs, EIRL, SARL, SAS, etc.). L\'exonération est totale si le revenu est inférieur à 75 % du PASS, puis dégressive jusqu\'à 100 % du PASS. Accessible sans condition de statut préalable (demandeur d\'emploi, salarié, étudiant). Demande via l\'URSSAF.',
    url: 'https://www.urssaf.fr/accueil/outils-documentation/guides-et-notices/creation-dentreprise/acre.html',
    typeMontant: 'subvention',
    montantMin: null,
    montantMax: null,
    tauxAide: null,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
    criteresPredefinis: {
      nafEligibles: [],
      nafExclus: [],
      effectifMin: null,
      effectifMax: null,
      ageEntrepriseMaxAns: 1,
      ageEntrepriseMinAns: null,
      formeJuridiqueEligibles: [],
      secteurs: [],
      objetProjet: ['création', 'reprise'],
      zoneGeographique: 'national',
      conditionsLibres: ['Entreprise créée ou reprise depuis moins de 12 mois'],
      confiance: 0.85,
    },
  },
  {
    sourceId: 'ft-nacre',
    source: 'france-travail',
    titre: 'NACRE — Nouvel Accompagnement pour la Création et Reprise d\'Entreprise',
    description:
      'Prêt à taux zéro couplé à un accompagnement de 3 ans pour les créateurs ou repreneurs d\'entreprise éligibles (demandeurs d\'emploi, bénéficiaires d\'aides sociales, jeunes de 18-25 ans, etc.). Montant du prêt : 1 000 à 8 000 €, sans garantie ni caution. L\'accompagnement est assuré par un opérateur agréé.',
    url: 'https://www.service-public.fr/professionnels-entreprises/vosdroits/F11677',
    typeMontant: 'pret',
    montantMin: 1000,
    montantMax: 8000,
    tauxAide: null,
    deadline: null,
    portee: 'national',
    codesRegion: [],
    codesDept: [],
    criteresPredefinis: {
      nafEligibles: [],
      nafExclus: [],
      effectifMin: null,
      effectifMax: null,
      ageEntrepriseMaxAns: 3,
      ageEntrepriseMinAns: null,
      formeJuridiqueEligibles: [],
      secteurs: [],
      objetProjet: ['création', 'reprise'],
      zoneGeographique: 'national',
      conditionsLibres: [
        'Dirigeant demandeur d\'emploi, bénéficiaire RSA/ASS ou jeune 18-25 ans',
        'Entreprise créée ou reprise depuis moins de 3 ans',
      ],
      confiance: 0.8,
    },
  },

  // ── Handicap ────────────────────────────────────────────────────────────────
  {
    sourceId: 'ft-agefiph-embauche-th',
    source: 'france-travail',
    titre: 'AGEFIPH — Aide à l\'embauche d\'un travailleur handicapé',
    description:
      'Aide financière de l\'AGEFIPH pour l\'embauche en CDI ou CDD > 6 mois d\'une personne en situation de handicap (RQTH). Montant de 4 000 € pour les entreprises non assujetties à l\'obligation d\'emploi (< 20 salariés) et selon le secteur. Pour les entreprises de 20 à 249 salariés en-dessous de leur quota de 6 % de travailleurs handicapés, l\'aide peut aller jusqu\'à 6 000 €.',
    url: 'https://www.agefiph.fr/entreprises-et-etablissements/aides-et-demarches',
    typeMontant: 'subvention',
    montantMin: 4000,
    montantMax: 6000,
    tauxAide: null,
    deadline: null,
    portee: 'national',
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
      objetProjet: ['recrutement', 'handicap'],
      zoneGeographique: 'national',
      conditionsLibres: [
        'Embauche d\'une personne reconnue travailleur handicapé (RQTH)',
        'CDI ou CDD de plus de 6 mois',
      ],
      confiance: 0.9,
    },
  },

  // ── Préparation opérationnelle à l'emploi ───────────────────────────────────
  {
    sourceId: 'ft-poei-afpr',
    source: 'france-travail',
    titre: 'AFPR / POEI — Aide à la formation préalable au recrutement',
    description:
      'L\'AFPR (Aide à la Formation Préalable au Recrutement) et la POEI (Préparation Opérationnelle à l\'Emploi Individuelle) permettent de financer une formation sur-mesure pour un demandeur d\'emploi avant son embauche. France Travail finance jusqu\'à 400 heures de formation. Très utile pour adapter un candidat à un poste spécifique introuvable sur le marché. Demande via votre conseiller France Travail entreprises.',
    url: 'https://www.francetravail.fr/employeur/vos-services-en-ligne/aides-et-dispositifs/preparer-le-recrutement/la-preparation-operationnelle-a-lemploi.html',
    typeMontant: 'subvention',
    montantMin: null,
    montantMax: null,
    tauxAide: 1.0,
    deadline: null,
    portee: 'national',
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
      objetProjet: ['recrutement', 'formation'],
      zoneGeographique: 'national',
      conditionsLibres: [
        'Recrutement d\'un demandeur d\'emploi inscrit à France Travail',
        'Poste en CDI, CDD > 6 mois ou contrat de professionnalisation',
      ],
      confiance: 0.85,
    },
  },
]

export async function fetchFranceTravailAides(): Promise<AideSourceBase[]> {
  return FRANCE_TRAVAIL_AIDES
}

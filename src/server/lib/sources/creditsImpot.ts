// Source : Direction Générale des Finances Publiques (DGFiP)
// Crédits et réductions d'impôt pour les entreprises.
// Ces avantages fiscaux ne requièrent pas de candidature : ils se déclarent
// sur la liasse fiscale (formulaires spécifiques) ou auprès de l'URSSAF.
// Source curatée — pas d'API publique.
// Dernière vérification : 2026-06-11

import type { AideSourceBase } from './types'

const CREDITS_IMPOT_AIDES: AideSourceBase[] = [
  // ── R&D et Innovation ──────────────────────────────────────────────────────
  {
    sourceId: 'ci-cir',
    source: 'credits-impot',
    titre: 'CIR — Crédit d\'Impôt Recherche',
    description:
      'Le CIR rembourse 30 % des dépenses de R&D (salaires chercheurs, brevets, sous-traitance agréée, amortissements) dans la limite de 100 M€, puis 5 % au-delà. Pour les PME ayant moins de 100 M€ de dépenses, le taux est de 30 %. Si le CIR excède l\'IS dû, le solde est remboursé immédiatement aux PME (au sens communautaire : < 250 salariés, CA < 50 M€ ou bilan < 43 M€). Déclaration : formulaire 2069-A joint à la liasse fiscale.',
    url: 'https://www.bofip.impots.gouv.fr/bofip/5595-PGP.html',
    typeMontant: 'subvention',
    montantMin: null,
    montantMax: null,
    tauxAide: 0.3,
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
      objetProjet: ['innovation', 'R&D', 'recherche'],
      zoneGeographique: 'national',
      conditionsLibres: [
        'Réalisation de travaux de R&D (recherche fondamentale, appliquée ou développement expérimental)',
        'Imposition à l\'IS ou à l\'IR dans la catégorie BIC',
      ],
      confiance: 0.85,
    },
  },
  {
    sourceId: 'ci-cii',
    source: 'credits-impot',
    titre: 'CII — Crédit d\'Impôt Innovation (PME uniquement)',
    description:
      'Le CII permet aux PME (< 250 salariés, CA < 50 M€) de bénéficier d\'un crédit d\'impôt de 20 % sur les dépenses d\'innovation (conception de prototypes ou installations pilotes de produits nouveaux). Plafond de dépenses : 400 000 € par an, soit un crédit maximal de 80 000 €. Remboursable immédiatement si le CII excède l\'IS. Non cumulable avec le CIR sur les mêmes dépenses.',
    url: 'https://www.bofip.impots.gouv.fr/bofip/5595-PGP.html',
    typeMontant: 'subvention',
    montantMin: null,
    montantMax: 80000,
    tauxAide: 0.2,
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
      objetProjet: ['innovation', 'prototype', 'produit nouveau'],
      zoneGeographique: 'national',
      conditionsLibres: [
        'PME au sens communautaire (< 250 salariés, CA < 50 M€ ou bilan < 43 M€)',
        'Dépenses de conception de prototypes ou installations pilotes de produits nouveaux',
      ],
      confiance: 0.9,
    },
  },
  {
    sourceId: 'ci-jei',
    source: 'credits-impot',
    titre: 'JEI / JEU — Jeune Entreprise Innovante ou Universitaire',
    description:
      'Statut ouvrant droit à des exonérations de charges sociales patronales sur les salaires des personnels de R&D, et à une exonération d\'IS les premières années. Conditions : moins de 8 ans d\'existence, PME indépendante, dépenses R&D représentant au moins 15 % des charges totales. Le statut JEU (Universitaire) est réservé aux entreprises issues de la recherche publique. Déclaration auprès de l\'URSSAF et du service des impôts.',
    url: 'https://www.service-public.fr/professionnels-entreprises/vosdroits/F31188',
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
      effectifMax: 249,
      ageEntrepriseMaxAns: 8,
      ageEntrepriseMinAns: null,
      formeJuridiqueEligibles: [],
      secteurs: [],
      objetProjet: ['innovation', 'R&D', 'recherche'],
      zoneGeographique: 'national',
      conditionsLibres: [
        'Entreprise de moins de 8 ans',
        'PME indépendante (capital non détenu à + 50 % par une grande entreprise)',
        'Dépenses R&D ≥ 15 % des charges totales de l\'exercice',
      ],
      confiance: 0.9,
    },
  },

  // ── Formation ──────────────────────────────────────────────────────────────
  {
    sourceId: 'ci-formation-dirigeant',
    source: 'credits-impot',
    titre: 'Crédit d\'Impôt Formation du Dirigeant',
    description:
      'Crédit d\'impôt égal au produit du nombre d\'heures de formation du chef d\'entreprise par le taux horaire du SMIC. Doublé pour les TPE de moins de 10 salariés. Le dirigeant peut être le gérant, le président ou le directeur général. S\'applique aux formations professionnelles (pas aux conférences ni aux séminaires commerciaux). Déclaration sur le formulaire 2069-RCI.',
    url: 'https://www.service-public.fr/professionnels-entreprises/vosdroits/F31214',
    typeMontant: 'subvention',
    montantMin: null,
    montantMax: 2000,
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
      objetProjet: ['formation'],
      zoneGeographique: 'national',
      conditionsLibres: [
        'Le dirigeant suit une formation professionnelle (hors conférences et séminaires)',
        'Imposition à l\'IS ou à l\'IR dans la catégorie BIC',
      ],
      confiance: 0.9,
    },
  },

  // ── Emploi ─────────────────────────────────────────────────────────────────
  {
    sourceId: 'ci-cie',
    source: 'credits-impot',
    titre: 'CIE — Contrat Initiative Emploi',
    description:
      'Aide à l\'embauche d\'un demandeur d\'emploi rencontrant des difficultés particulières d\'accès à l\'emploi (longue durée, seniors > 50 ans, bénéficiaires RSA/ASS). Prise en charge d\'une partie du salaire brut par France Travail : 30 à 47 % du SMIC selon le public ciblé. Durée de 6 à 24 mois. Le contrat peut être un CDD ou un CDI. Attribution soumise à instruction par France Travail.',
    url: 'https://www.francetravail.fr/employeur/vos-services-en-ligne/aides-et-dispositifs/accompagner-les-publics-eloignes-de-lemploi/les-contrats-aides/le-contrat-initiative-emploi.html',
    typeMontant: 'subvention',
    montantMin: null,
    montantMax: null,
    tauxAide: 0.47,
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
      objetProjet: ['recrutement', 'emploi'],
      zoneGeographique: 'national',
      conditionsLibres: [
        'Embauche d\'un demandeur d\'emploi en difficulté (longue durée, senior ≥ 50 ans, bénéficiaire RSA/ASS)',
        'Employeur du secteur marchand',
        'Attribution soumise à accord préalable de France Travail',
      ],
      confiance: 0.8,
    },
  },
]

export async function fetchCreditsImpotAides(): Promise<AideSourceBase[]> {
  return CREDITS_IMPOT_AIDES
}

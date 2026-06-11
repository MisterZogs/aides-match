export const THEMES = {
  emploi: {
    label: 'Embauche / RH',
    icon: '👥',
    question: 'Vous prévoyez d\'embaucher prochainement ?',
    description: 'Apprentissage, CIE, contrat pro, AGEFIPH, AFPR/POEI',
  },
  innovation: {
    label: 'R&D / Innovation',
    icon: '🔬',
    question: 'Vous avez un projet de recherche ou d\'innovation ?',
    description: 'CIR, CII, JEI/JEU, concours i-Nov, i-Lab BPI',
  },
  energie: {
    label: 'Énergie / Rénovation',
    icon: '⚡',
    question: 'Vous avez un projet de rénovation ou transition énergétique ?',
    description: 'CEE, ADEME, France Rénov, Fonds Chaleur, solaire',
  },
  financement: {
    label: 'Prêt / Garantie',
    icon: '💶',
    question: 'Vous cherchez un financement (prêt, garantie bancaire) ?',
    description: 'Prêts BPI, garanties BPI, Prêt Atout, Prêt Booster',
  },
  international: {
    label: 'Export / International',
    icon: '🌍',
    question: 'Vous vous développez à l\'international ?',
    description: 'Prêt Croissance International, aides export',
  },
  fiscal: {
    label: 'Optimisation fiscale',
    icon: '📊',
    question: 'Vous voulez valoriser des crédits d\'impôt ?',
    description: 'CIR, CII, Crédit d\'impôt formation dirigeant',
  },
  creation: {
    label: 'Création / Reprise',
    icon: '🚀',
    question: 'Vous avez créé ou repris votre entreprise il y a moins de 3 ans ?',
    description: 'ACRE, NACRE, aides à la création',
  },
  consultant: {
    label: 'Services / Indépendant',
    icon: '🧑‍💼',
    question: 'Vous êtes consultant, prestataire de services ou indépendant (auto-entrepreneur, SASU, EURL…) ?',
    description: 'CIR, CII, JEI, prêts TPE BPI, crédit impôt formation dirigeant',
  },
  numerique: {
    label: 'Tech / SaaS / Digital',
    icon: '💻',
    question: 'Vous développez un produit numérique, un SaaS ou une application ?',
    description: 'France Num, JEI, CIR algo/logiciel, aides e-commerce, cybersécurité',
  },
  commerce: {
    label: 'Commerce / Artisanat',
    icon: '🏪',
    question: 'Vous êtes commerçant, artisan ou dans la restauration ?',
    description: 'Aides CCI, fonds revitalisation, aides zones rurales, CEE véhicules',
  },
} as const

export type Theme = keyof typeof THEMES

export function classifierThemes(titre: string, source: string): Theme[] {
  const t = (titre + ' ' + source).toLowerCase()
  const themes: Theme[] = []

  if (/emploi|embauche|recrutement|apprenti|contrat.*pro|poei|afpr|agefiph|travailleur.*handicap|salarié/.test(t))
    themes.push('emploi')

  if (/innovation|r&d|recherche|cir|cii|jei|jeu|i-nov|i-lab|brevet|prototype|développement expérimental/.test(t))
    themes.push('innovation')

  if (/cee|énergi|énerg|rénov|chaleur|photovolt|solaire|pompe|isolation|led|biomass|géotherm|méthan|ademe|autoconsommation|décarboni|vert/.test(t))
    themes.push('energie')

  if (/prêt|garantie|trésorerie|transmission|croissance|booster|atout|développement tpe|financement/.test(t))
    themes.push('financement')

  if (/international|export|étranger|coface|trade/.test(t))
    themes.push('international')

  if (/crédit.*impôt|cir|cii|fiscal|jeune entreprise innovante|jei|jeu|formation.*dirigeant/.test(t))
    themes.push('fiscal')

  if (/création|créateur|repreneur|nacre|acre|reprise/.test(t))
    themes.push('creation')

  if (/consultant|conseil|prestation|indépendant|freelance|honoraire|intellectuel|jei|jeu|crédit.*impôt|cir|cii|formation.*dirigeant|diagnostic.*conseil/.test(t))
    themes.push('consultant')

  if (/numérique|digital|e-commerce|informatique|logiciel|saas|algorithme|cybersécurité|dématér|france num|internet|web|application|plateforme/.test(t))
    themes.push('numerique')

  if (/commerce|artisan|restaur|boulanger|coiffeur|réparation|commerce.*centre|revitalisation|cci|chambre.*commerce|véhicule|utilitaire/.test(t))
    themes.push('commerce')

  return themes.length > 0 ? themes : ['financement']
}

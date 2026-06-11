import type { GridFeature } from "./components/FeaturesGrid";

export const features: GridFeature[] = [
  {
    name: "Analyse en 30 secondes",
    description: "Entrez votre SIRET, notre moteur interroge instantanément toutes les sources et calcule votre éligibilité critère par critère.",
    emoji: "⚡",
    size: "medium",
  },
  {
    name: "10 sources officielles",
    description: "BPI, ADEME, France Travail, CEE, France Rénov, crédits d'impôt, zones prioritaires — tout en un seul endroit.",
    emoji: "🏛️",
    size: "medium",
  },
  {
    name: "Scoring détaillé",
    description: "Chaque aide est évaluée sur votre code NAF, effectif, âge, zone géographique. Vous savez exactement pourquoi vous êtes éligible ou non.",
    emoji: "🎯",
    size: "large",
  },
  {
    name: "Alertes mensuelles",
    description: "Soyez notifié dès qu'une nouvelle aide correspond à votre profil. Ne ratez plus aucune opportunité.",
    emoji: "🔔",
    size: "large",
  },
  {
    name: "Subventions, prêts & garanties",
    description: "Tous les types de dispositifs : subventions directes, prêts bonifiés, garanties bancaires, diagnostics conseils.",
    emoji: "💶",
    size: "medium",
  },
  {
    name: "Données SIRENE intégrées",
    description: "Enrichissement automatique depuis les registres officiels INSEE — aucune saisie manuelle de vos données.",
    emoji: "🏢",
    size: "medium",
  },
  {
    name: "Mis à jour chaque semaine",
    description: "Synchronisation automatique de toutes les sources chaque lundi. Vous consultez toujours des données fraîches.",
    emoji: "🔄",
    size: "small",
  },
  {
    name: "Gratuit sans inscription",
    description: "La recherche et les résultats sont entièrement gratuits. Le compte est uniquement nécessaire pour les alertes.",
    emoji: "🆓",
    size: "small",
  },
  {
    name: "URL partageable",
    description: "Chaque analyse a une URL permanente. Partagez vos résultats avec votre comptable, banquier ou conseiller.",
    emoji: "🔗",
    size: "small",
  },
];

export const testimonials = [
  {
    name: "Sophie M.",
    role: "Gérante — studio de design graphique",
    avatarSrc: "",
    socialUrl: "",
    quote: "En 2 minutes j'ai découvert le CIR et le CII dont je n'avais jamais entendu parler. Mon comptable n'en revenait pas.",
  },
  {
    name: "Thomas L.",
    role: "Fondateur — SaaS RH, 8 salariés",
    avatarSrc: "",
    socialUrl: "",
    quote: "On avait raté l'aide unique à l'apprentissage deux ans de suite. Maintenant on reçoit les alertes automatiquement.",
  },
  {
    name: "Nadia B.",
    role: "Dirigeante — PME industrie agroalimentaire",
    avatarSrc: "",
    socialUrl: "",
    quote: "Le scoring critère par critère est très rassurant. Je sais exactement sur quoi candidater sans perdre de temps.",
  },
];

export const faqs = [
  {
    id: 1,
    question: "La recherche est-elle vraiment gratuite ?",
    answer: "Oui, entrer votre SIRET et consulter la liste des aides éligibles est entièrement gratuit et sans inscription. L'abonnement Pro est uniquement nécessaire pour accéder aux fiches détaillées et recevoir des alertes mensuelles.",
    href: "/pricing",
  },
  {
    id: 2,
    question: "D'où proviennent les aides référencées ?",
    answer: "Nous agrégeons 10 sources officielles : BPI France, ADEME, France Travail, les Certificats d'Économies d'Énergie (CEE), France Rénov, les crédits d'impôt (CIR, CII, CIF), les aides territoires (ANCT), les zones géographiques prioritaires (ZFU, ZRR, QPV) et d'autres dispositifs nationaux.",
    href: "#",
  },
  {
    id: 3,
    question: "Comment fonctionne le scoring d'éligibilité ?",
    answer: "Notre moteur vérifie automatiquement votre code NAF, votre tranche d'effectif, l'âge de votre entreprise, votre zone géographique et votre forme juridique. Les critères qui ne peuvent pas être vérifiés automatiquement (comme un projet précis) sont listés explicitement pour que vous les vérifiiez vous-même.",
    href: "#",
  },
  {
    id: 4,
    question: "À quelle fréquence les aides sont-elles mises à jour ?",
    answer: "Chaque lundi matin, notre système synchronise automatiquement toutes les sources et désactive les aides dont la deadline est passée. Vous consultez toujours des données à jour.",
    href: "#",
  },
  {
    id: 5,
    question: "Que faire si une aide m'intéresse ?",
    answer: "Chaque aide affiche un lien vers la source officielle et la démarche à suivre. Les abonnés Pro accèdent à la fiche complète avec tous les critères détaillés, les montants et les contacts.",
    href: "/pricing",
  },
];

export const footerNavigation = {
  app: [
    { name: "Rechercher des aides", href: "/" },
    { name: "Tarifs", href: "/pricing" },
  ],
  company: [
    { name: "Contact", href: "mailto:contact@aides-match.fr" },
    { name: "Mentions légales", href: "#" },
    { name: "Politique de confidentialité", href: "#" },
  ],
};

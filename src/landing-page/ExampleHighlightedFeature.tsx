import HighlightedFeature from "./components/HighlightedFeature";

export default function ScoringDemo() {
  return (
    <HighlightedFeature
      name="Un scoring transparent, critère par critère"
      description="Vous ne recevez pas juste une liste d'aides — vous savez exactement pourquoi vous êtes éligible. Chaque résultat détaille les critères validés, échoués, et ceux à vérifier manuellement."
      highlightedComponent={<ScoringCard />}
      direction="row-reverse"
    />
  );
}

function ScoringCard() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">BPI France</p>
          <h3 className="mt-1 text-base font-semibold text-foreground">Prêt Développement TPE</h3>
        </div>
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
          Éligible
        </span>
      </div>

      <div className="mb-4 flex gap-4 text-sm text-muted-foreground">
        <span>Jusqu'à <strong className="text-foreground">50 000 €</strong></span>
        <span>·</span>
        <span>Prêt sans garantie</span>
        <span>·</span>
        <span>National</span>
      </div>

      <div className="space-y-2 rounded-xl bg-muted/50 p-3 text-sm">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Analyse des critères</p>

        {[
          { label: "Portée nationale", ok: true },
          { label: "Code NAF 6201Z compatible", ok: true },
          { label: "Effectif dans la fourchette (0–19 sal.)", ok: true },
        ].map((c) => (
          <div key={c.label} className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-xs text-green-600 dark:bg-green-900/30">✓</span>
            <span className="text-foreground">{c.label}</span>
          </div>
        ))}

        {[
          "Prêt accordé via un établissement bancaire partenaire",
          "Projet de développement commercial ou de recrutement",
        ].map((c) => (
          <div key={c} className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-xs text-amber-600 dark:bg-amber-900/30">?</span>
            <span className="text-muted-foreground">{c}</span>
          </div>
        ))}
      </div>

      <a
        href="#"
        className="mt-4 block w-full rounded-lg bg-primary py-2 text-center text-sm font-medium text-primary-foreground transition hover:opacity-90"
      >
        Voir la fiche complète →
      </a>
    </div>
  );
}

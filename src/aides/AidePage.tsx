import { useParams, Link } from 'react-router'
import { useQuery, getAideById } from 'wasp/client/operations'
import { useAuth } from 'wasp/client/auth'

export default function AidePage() {
  const { aideId } = useParams<{ aideId: string }>()
  const { data: user } = useAuth()
  const { data: aide, isLoading, error } = useQuery(getAideById, { aideId: aideId! }, { enabled: !!aideId })

  const isPro = ['pro', 'agency'].includes(user?.subscriptionPlan ?? '')

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (error || !aide) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-muted-foreground">Aide introuvable.</p>
          <Link to="/" className="text-primary underline">Retour à l'accueil</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-6">
          <button onClick={() => history.back()} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Retour aux résultats
          </button>
        </div>

        <div className="rounded-xl border border-border bg-card p-8 shadow-sm space-y-6">
          {/* En-tête */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {aide.typeMontant && (
                <span className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground capitalize">
                  {aide.typeMontant}
                </span>
              )}
              <span className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground capitalize">
                {aide.portee}
              </span>
              <span className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
                {aide.source}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">{aide.titre}</h1>
          </div>

          {/* Montant */}
          {aide.montantMax && (
            <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
              <p className="text-sm font-medium text-primary mb-1">Montant de l'aide</p>
              <p className="text-xl font-bold text-foreground">
                {aide.montantMin ? `${aide.montantMin.toLocaleString('fr-FR')} – ` : ''}
                {aide.montantMax.toLocaleString('fr-FR')} €
                {aide.tauxAide ? ` (${Math.round(aide.tauxAide * 100)} %)` : ''}
              </p>
            </div>
          )}

          {/* Deadline */}
          {aide.deadline && (
            <div className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 rounded-lg px-4 py-3 border border-amber-200 dark:border-amber-800">
              <span>⚠</span>
              <span>Date limite : <strong>{new Date(aide.deadline).toLocaleDateString('fr-FR')}</strong></span>
            </div>
          )}

          {/* Description — tronquée si non-Pro */}
          <div>
            <h2 className="font-semibold text-foreground mb-2">Description</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{aide.description}</p>
          </div>

          {/* Paywall */}
          {!isPro ? (
            <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-8 text-center space-y-4">
              <div className="text-4xl">🔒</div>
              <h3 className="text-lg font-bold text-foreground">
                Accès complet réservé aux abonnés Pro
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1 text-left max-w-xs mx-auto">
                <li>✓ Description complète et conditions détaillées</li>
                <li>✓ Lien vers le dossier de candidature officiel</li>
                <li>✓ Critères d'éligibilité complets</li>
                <li>✓ Alertes sur les nouvelles aides correspondantes</li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Link
                  to="/pricing"
                  className="rounded-lg bg-primary px-6 py-2.5 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Passer au plan Pro — 29 €/mois
                </Link>
                {!user && (
                  <Link
                    to="/login"
                    className="rounded-lg border border-border px-6 py-2.5 font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    Se connecter
                  </Link>
                )}
              </div>
              <p className="text-xs text-muted-foreground">Sans engagement · Résiliable à tout moment</p>
            </div>
          ) : (
            <div className="pt-4 border-t border-border">
              <a
                href={aide.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 transition-colors"
              >
                Accéder au dossier officiel
                <span aria-hidden>↗</span>
              </a>
              <p className="mt-2 text-xs text-muted-foreground">
                AidesMatch est un outil d'orientation. L'éligibilité définitive est déterminée par le porteur de l'aide.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

import { useParams, Link } from 'react-router'
import { useQuery, getResultats } from 'wasp/client/operations'
import { useAuth } from 'wasp/client/auth'
import { AideCard } from './components/AideCard'
import { useState } from 'react'
import { classifierThemes, THEMES, type Theme } from './lib/themes'

type Score = 'eligible' | 'probable' | 'non_eligible'

function getStoredThemes(): Set<Theme> {
  try {
    const raw = sessionStorage.getItem('aides-themes')
    return new Set(raw ? JSON.parse(raw) : [])
  } catch {
    return new Set()
  }
}

export default function ResultatsPage() {
  const { siren } = useParams<{ siren: string }>()
  const { data: user } = useAuth()
  const [activeThemes] = useState<Set<Theme>>(getStoredThemes)

  const { data: resultats, isLoading, error } = useQuery(getResultats, { siren: siren! }, { enabled: !!siren })

  const isPro = ['pro', 'agency'].includes(user?.subscriptionPlan ?? '')

  const shareUrl = `${window.location.origin}/resultats/${siren}`

  async function copyShareUrl() {
    await navigator.clipboard.writeText(shareUrl)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Chargement des résultats…</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-600">{String(error)}</p>
          <Link to="/" className="text-primary underline">Recommencer</Link>
        </div>
      </div>
    )
  }

  if (!resultats) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-600">Aucun résultat trouvé pour ce SIREN.</p>
          <Link to="/" className="text-blue-600 underline">Nouvelle recherche</Link>
        </div>
      </div>
    )
  }

  const filtrer = (r: typeof resultats.resultats[0]) => {
    if (activeThemes.size === 0) return true
    const themes = classifierThemes(r.aide.titre, r.aide.source)
    return themes.some((t) => activeThemes.has(t))
  }

  const tous = resultats.resultats.filter(filtrer)
  const eligibles = tous.filter((r) => r.score === 'eligible')
  const probables = tous.filter((r) => r.score === 'probable')
  const nonEligibles = tous.filter((r) => r.score === 'non_eligible')

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* En-tête entreprise */}
        <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{resultats.denomination}</h1>
              <p className="text-muted-foreground mt-1">
                {resultats.libelleNaf} · {resultats.commune} · SIREN {resultats.siren}
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-3xl font-bold text-primary">
                {eligibles.length + probables.length}
              </div>
              <div className="text-sm text-muted-foreground">aides potentielles</div>
            </div>
          </div>

          {activeThemes.size > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {([...activeThemes] as Theme[]).map((t) => (
                <span key={t} className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {THEMES[t].icon} {THEMES[t].label}
                </span>
              ))}
              <Link
                to={`/analyse/${resultats.siren}00000`}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Modifier
              </Link>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-3">
            <div className="rounded-lg bg-green-500/10 px-4 py-2 text-center">
              <div className="text-xl font-bold text-green-700 dark:text-green-400">{eligibles.length}</div>
              <div className="text-xs text-green-600 dark:text-green-500">Éligibles</div>
            </div>
            <div className="rounded-lg bg-amber-500/10 px-4 py-2 text-center">
              <div className="text-xl font-bold text-amber-700 dark:text-amber-400">{probables.length}</div>
              <div className="text-xs text-amber-600 dark:text-amber-500">Probables</div>
            </div>
            <div className="rounded-lg bg-muted px-4 py-2 text-center">
              <div className="text-xl font-bold text-muted-foreground">{nonEligibles.length}</div>
              <div className="text-xs text-muted-foreground">Non éligibles</div>
            </div>

            <button
              onClick={copyShareUrl}
              className="ml-auto rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
            >
              Partager ce rapport
            </button>
          </div>
        </div>

        {/* Liste des résultats */}
        <div className="space-y-4">
          {eligibles.length > 0 && (
            <section>
              <h2 className="mb-3 text-lg font-semibold text-green-700 dark:text-green-400">
                Aides éligibles ({eligibles.length})
              </h2>
              <div className="space-y-3">
                {eligibles.map((r) => (
                  <AideCard key={r.aide.id} aide={r.aide} score={r.score as Score} detail={r.detail as any} isPro={isPro} />
                ))}
              </div>
            </section>
          )}

          {probables.length > 0 && (
            <section className="mt-6">
              <h2 className="mb-3 text-lg font-semibold text-amber-700 dark:text-amber-400">
                Aides probables ({probables.length})
              </h2>
              <div className="space-y-3">
                {probables.map((r) => (
                  <AideCard key={r.aide.id} aide={r.aide} score={r.score as Score} detail={r.detail as any} isPro={isPro} />
                ))}
              </div>
            </section>
          )}

          {!isPro && (eligibles.length + probables.length) > 0 && (
            <div className="mt-6 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-6 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Accédez aux fiches complètes avec le plan Pro
              </h3>
              <p className="text-muted-foreground mb-4">
                Checklist des pièces, contact du porteur, alertes mensuelles sur les nouvelles aides.
              </p>
              <Link
                to="/pricing"
                className="inline-block rounded-lg bg-primary px-6 py-2.5 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Voir les offres — à partir de 29 €/mois
              </Link>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-muted-foreground underline hover:text-foreground">
            Nouvelle recherche
          </Link>
        </div>
      </div>
    </div>
  )
}

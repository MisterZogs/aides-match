import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { matchAides } from 'wasp/client/operations'
import { THEMES, type Theme } from './lib/themes'

interface EntrepriseInfo {
  denomination: string
  codeNaf: string
  commune: string
  dateCreation: string
  effectif: string
}

export default function AnalysePage() {
  const { siret } = useParams<{ siret: string }>()
  const navigate = useNavigate()
  const [entreprise, setEntreprise] = useState<EntrepriseInfo | null>(null)
  const [selectedThemes, setSelectedThemes] = useState<Set<Theme>>(new Set())
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!siret) return
    const siren = siret.slice(0, 9)
    fetch(`https://recherche-entreprises.api.gouv.fr/search?q=${siren}&page=1&per_page=1`)
      .then((r) => r.json())
      .then((data) => {
        const r = data.results?.[0]
        if (r) {
          setEntreprise({
            denomination: r.nom_complet,
            codeNaf: r.activite_principale ?? '',
            commune: r.siege?.libelle_commune ?? r.siege?.commune ?? '',
            dateCreation: r.date_creation ?? '',
            effectif: r.tranche_effectif_salarie ?? '',
          })
        }
      })
      .catch(() => {})
  }, [siret])

  function toggleTheme(theme: Theme) {
    setSelectedThemes((prev) => {
      const next = new Set(prev)
      if (next.has(theme)) next.delete(theme)
      else next.add(theme)
      return next
    })
  }

  async function handleSubmit() {
    if (!siret) return
    setSubmitting(true)
    setError('')
    try {
      sessionStorage.setItem('aides-themes', JSON.stringify([...selectedThemes]))
      const result = await matchAides({ siret })
      navigate(`/resultats/${result.siren}`)
    } catch (e: any) {
      setError(e.message ?? 'Erreur lors de l\'analyse')
      setSubmitting(false)
    }
  }

  const siren = siret?.slice(0, 9)

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-12">

        {/* Entreprise identifiée */}
        <div className="mb-8 rounded-xl border border-border bg-card p-5">
          {entreprise ? (
            <>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-xl font-bold text-foreground">{entreprise.denomination}</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    NAF {entreprise.codeNaf}
                    {entreprise.commune ? ` · ${entreprise.commune}` : ''}
                    {entreprise.dateCreation ? ` · Créée le ${new Date(entreprise.dateCreation).toLocaleDateString('fr-FR')}` : ''}
                  </p>
                </div>
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                  SIRET vérifié
                </span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="text-sm text-muted-foreground">Récupération des informations…</span>
            </div>
          )}
        </div>

        {/* Questionnaire */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Quels sont vos projets ?
          </h2>
          <p className="text-muted-foreground mb-1">
            Sélectionnez tout ce qui correspond à votre situation — vous pouvez en cocher plusieurs.
          </p>
          <p className="text-xs text-muted-foreground mb-6">
            Sans sélection, toutes les aides sont affichées.
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {(Object.entries(THEMES) as [Theme, typeof THEMES[Theme]][]).map(([key, theme]) => {
              const active = selectedThemes.has(key)
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleTheme(key)}
                  className={`rounded-xl border-2 p-4 text-left transition-all ${
                    active
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{theme.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold text-sm ${active ? 'text-primary' : 'text-foreground'}`}>
                          {theme.label}
                        </span>
                        {active && (
                          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">✓</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {theme.description}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Analyse en cours…
              </span>
            ) : selectedThemes.size > 0 ? (
              `Trouver mes aides (${selectedThemes.size} thème${selectedThemes.size > 1 ? 's' : ''} sélectionné${selectedThemes.size > 1 ? 's' : ''})`
            ) : (
              'Voir toutes les aides'
            )}
          </button>

          <Link
            to="/"
            className="text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Changer de SIRET
          </Link>
        </div>
      </div>
    </div>
  )
}

import type { Aide } from 'wasp/entities'
import { Link } from 'react-router'

type Score = 'eligible' | 'probable' | 'non_eligible'

interface Detail {
  criteresValides: string[]
  criteresEchoues: string[]
  criteresInconnus: string[]
}

interface AideCardProps {
  aide: Pick<Aide, 'id' | 'titre' | 'url' | 'typeMontant' | 'montantMin' | 'montantMax' | 'tauxAide' | 'deadline' | 'portee' | 'source'>
  score: Score
  detail: Detail
  isPro?: boolean
}

const SCORE_CONFIG: Record<Score, { label: string; border: string; badge: string }> = {
  eligible: {
    label: 'Éligible',
    border: 'border-green-500/40',
    badge: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
  },
  probable: {
    label: 'Probable',
    border: 'border-amber-400/40',
    badge: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
  },
  non_eligible: {
    label: 'Non éligible',
    border: 'border-border',
    badge: 'bg-muted text-muted-foreground border-border',
  },
}

function formatMontant(aide: AideCardProps['aide']): string {
  if (aide.tauxAide) return `${Math.round(aide.tauxAide * 100)} %`
  if (aide.montantMin && aide.montantMax)
    return `${aide.montantMin.toLocaleString('fr-FR')} – ${aide.montantMax.toLocaleString('fr-FR')} €`
  if (aide.montantMax) return `Jusqu'à ${aide.montantMax.toLocaleString('fr-FR')} €`
  if (aide.montantMin) return `À partir de ${aide.montantMin.toLocaleString('fr-FR')} €`
  return ''
}

function isDeadlineSoon(deadline: Date | null): boolean {
  if (!deadline) return false
  return new Date(deadline).getTime() - Date.now() < 60 * 24 * 3600 * 1000
}

export function AideCard({ aide, score, detail, isPro = false }: AideCardProps) {
  const config = SCORE_CONFIG[score]
  const montant = formatMontant(aide)
  const totalCriteres = detail.criteresValides.length + detail.criteresEchoues.length + detail.criteresInconnus.length
  const deadlineSoon = isDeadlineSoon(aide.deadline)

  return (
    <div className={`rounded-xl border-2 bg-card p-5 shadow-sm transition hover:shadow-md ${config.border}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-semibold ${config.badge}`}>
              {config.label}
            </span>
            {aide.typeMontant && (
              <span className="inline-flex rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground capitalize">
                {aide.typeMontant}
              </span>
            )}
            {deadlineSoon && aide.deadline && (
              <span className="inline-flex rounded-full bg-amber-100 dark:bg-amber-900/30 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:text-amber-400">
                ⚠ Clôture {new Date(aide.deadline).toLocaleDateString('fr-FR')}
              </span>
            )}
          </div>

          <h3 className="font-semibold text-foreground leading-snug">{aide.titre}</h3>

          <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
            {montant && <span className="font-medium text-foreground">{montant}</span>}
            <span className="capitalize">{aide.portee === 'national' ? 'National' : aide.portee}</span>
            <span className="text-muted-foreground/60">{aide.source}</span>
          </div>
        </div>

        {totalCriteres > 0 && (
          <div className="text-right shrink-0">
            <p className="text-xs text-muted-foreground mb-0.5">Critères vérifiés</p>
            <p className="text-lg font-bold text-foreground">
              {detail.criteresValides.length}
              <span className="text-sm font-normal text-muted-foreground">/{totalCriteres}</span>
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground italic">
          Score indicatif — éligibilité définitive auprès du porteur
        </p>
        {isPro ? (
          <Link
            to={`/aide/${aide.id}`}
            className="shrink-0 rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Voir la fiche →
          </Link>
        ) : (
          <Link
            to={`/aide/${aide.id}`}
            className="shrink-0 rounded-lg border border-border px-4 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
          >
            🔒 Fiche Pro
          </Link>
        )}
      </div>
    </div>
  )
}

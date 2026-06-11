import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'

interface EntreprisePreview {
  denomination: string
  libelleNaf: string
  commune: string
  dateCreation: string
}

function luhnCheck(siret: string): boolean {
  if (!/^\d{14}$/.test(siret)) return false
  let sum = 0
  for (let i = 0; i < 14; i++) {
    let digit = parseInt(siret[i])
    if (i % 2 === 0) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
  }
  return sum % 10 === 0
}

export function SiretInput() {
  const [siret, setSiret] = useState('')
  const [preview, setPreview] = useState<EntreprisePreview | null>(null)
  const [previewError, setPreviewError] = useState('')
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navigate = useNavigate()

  const siretClean = siret.replace(/\s/g, '')
  const isValidFormat = /^\d{14}$/.test(siretClean)
  const isValidLuhn = isValidFormat && luhnCheck(siretClean)

  useEffect(() => {
    if (!isValidFormat) {
      setPreview(null)
      setPreviewError('')
      return
    }

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      setPreviewError('')
      try {
        const res = await fetch(
          `https://recherche-entreprises.api.gouv.fr/search?q=${siretClean.slice(0, 9)}&page=1&per_page=1`
        )
        const data = await res.json()
        const r = data.results?.[0]
        if (r) {
          setPreview({
            denomination: r.nom_complet,
            libelleNaf: r.siege?.libelle_activite_principale ?? '',
            commune: r.siege?.commune ?? '',
            dateCreation: r.date_creation ?? '',
          })
        } else {
          setPreviewError('Entreprise introuvable')
          setPreview(null)
        }
      } catch {
        setPreviewError('Erreur lors de la vérification')
        setPreview(null)
      } finally {
        setLoading(false)
      }
    }, 500)
  }, [siretClean, isValidFormat])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValidLuhn) return
    navigate(`/analyse/${siretClean}`)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto space-y-4">
      <div>
        <label htmlFor="siret" className="block text-sm font-medium text-foreground mb-1">
          Numéro SIRET (14 chiffres)
        </label>
        <div className="flex gap-3">
          <input
            id="siret"
            type="text"
            inputMode="numeric"
            value={siret}
            onChange={(e) => setSiret(e.target.value)}
            placeholder="ex : 80295478500015"
            maxLength={17}
            className="flex-1 rounded-lg border border-input bg-background text-foreground px-4 py-3 text-lg font-mono shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={!isValidLuhn}
            className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Continuer →
          </button>
        </div>

        {siretClean.length === 14 && !isValidLuhn && (
          <p className="mt-1 text-sm text-red-600">SIRET invalide (vérifiez le numéro)</p>
        )}
      </div>

      {loading && (
        <div className="rounded-lg border border-border bg-muted p-4 text-sm text-muted-foreground animate-pulse">
          Vérification en cours…
        </div>
      )}

      {preview && (
        <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4 space-y-1">
          <p className="font-semibold text-green-700 dark:text-green-400">{preview.denomination}</p>
          <p className="text-sm text-green-600 dark:text-green-500">{preview.libelleNaf}</p>
          <p className="text-sm text-muted-foreground">
            {preview.commune}{preview.dateCreation ? ` · Créée le ${new Date(preview.dateCreation).toLocaleDateString('fr-FR')}` : ''}
          </p>
        </div>
      )}

      {previewError && (
        <p className="text-sm text-red-600">{previewError}</p>
      )}
    </form>
  )
}

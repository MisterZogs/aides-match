// Source : les-aides.fr (CCI)
// ⚠ Afficher "Source : les-aides.fr" dans l'UI — propriété intellectuelle CCI
// Inscription gratuite requise sur les-aides.fr pour obtenir la clé API

const BASE_URL = 'https://les-aides.fr/api'

export interface AideSource {
  sourceId: string
  source: 'les-aides'
  titre: string
  description: string
  url: string
  typeMontant: string | null
  montantMin: number | null
  montantMax: number | null
  tauxAide: number | null
  deadline: Date | null
  portee: string
  codesRegion: string[]
  codesDept: string[]
}

export async function fetchLesAides(): Promise<AideSource[]> {
  const apiKey = process.env.LES_AIDES_API_KEY
  if (!apiKey) {
    console.warn('[lesAides] LES_AIDES_API_KEY non configurée — source ignorée')
    return []
  }

  const res = await fetchWithRetry(`${BASE_URL}/aides?limit=200`, apiKey)
  const data = await res.json()

  return (data.items ?? data.results ?? []).map(mapAide)
}

function mapAide(raw: any): AideSource {
  return {
    sourceId: String(raw.id),
    source: 'les-aides',
    titre: raw.title ?? raw.name ?? '',
    description: raw.description ?? raw.text ?? '',
    url: raw.url ?? raw.link ?? '',
    typeMontant: raw.type ?? null,
    montantMin: raw.amount_min ?? null,
    montantMax: raw.amount_max ?? null,
    tauxAide: null,
    deadline: raw.deadline ? new Date(raw.deadline) : null,
    portee: raw.national ? 'national' : 'regional',
    codesRegion: raw.regions ?? [],
    codesDept: raw.departments ?? [],
  }
}

async function fetchWithRetry(url: string, apiKey: string, retries = 2): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 5000)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Authorization: `Bearer ${apiKey}` },
    })
    clearTimeout(timer)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res
  } catch (err) {
    clearTimeout(timer)
    if (retries > 0) return fetchWithRetry(url, apiKey, retries - 1)
    throw err
  }
}

// Source : DGE / ISM — https://data.aides-entreprises.fr/documentation
// Licence open data — mention "Source : aides-entreprises.fr" obligatoire dans l'UI

const BASE_URL = 'https://data.aides-entreprises.fr/api/v1'

export interface AideSource {
  sourceId: string
  source: 'aides-entreprises'
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

export async function fetchAidesEntreprises(since?: Date): Promise<AideSource[]> {
  const params = new URLSearchParams({ per_page: '100' })
  if (since) params.set('updated_since', since.toISOString())

  const res = await fetchWithRetry(`${BASE_URL}/aides?${params}`)
  const data = await res.json()

  return (data.results ?? []).map(mapAide)
}

function mapAide(raw: any): AideSource {
  return {
    sourceId: String(raw.id),
    source: 'aides-entreprises',
    titre: raw.name ?? raw.title ?? '',
    description: raw.description ?? '',
    url: raw.url ?? raw.link ?? '',
    typeMontant: normalizeType(raw.aid_types ?? []),
    montantMin: raw.amount_min ?? null,
    montantMax: raw.amount_max ?? null,
    tauxAide: raw.rate ? raw.rate / 100 : null,
    deadline: raw.submission_deadline ? new Date(raw.submission_deadline) : null,
    portee: raw.perimeter === 'France entière' ? 'national' : 'regional',
    codesRegion: raw.regions?.map((r: any) => String(r.code)) ?? [],
    codesDept: raw.departments?.map((d: any) => String(d.code)) ?? [],
  }
}

function normalizeType(types: string[]): string | null {
  if (types.includes('subvention')) return 'subvention'
  if (types.includes('prêt')) return 'pret'
  if (types.includes('garantie')) return 'garantie'
  if (types.includes('accompagnement')) return 'conseil'
  return types[0] ?? null
}

async function fetchWithRetry(url: string, retries = 2): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 5000)
  try {
    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(timer)
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
    return res
  } catch (err) {
    clearTimeout(timer)
    if (retries > 0) return fetchWithRetry(url, retries - 1)
    throw err
  }
}

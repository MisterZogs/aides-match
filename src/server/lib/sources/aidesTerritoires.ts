// Source : ANCT — https://aides-territoires.beta.gouv.fr/api/v1/
// ~3 000 dispositifs, 600+ porteurs

const BASE_URL = 'https://aides-territoires.beta.gouv.fr/api/v1'

export interface AideSource {
  sourceId: string
  source: 'aides-territoires'
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

export async function fetchAidesTerritoires(page = 1): Promise<AideSource[]> {
  const params = new URLSearchParams({
    audience: 'Entreprises',
    page: String(page),
    page_size: '100',
  })

  const res = await fetchWithRetry(`${BASE_URL}/aids/?${params}`)
  const data = await res.json()

  const aides: AideSource[] = (data.results ?? []).map(mapAide)

  // Pagination récursive jusqu'à 10 pages max (évite les boucles infinies)
  if (data.next && page < 10) {
    const nextPage = await fetchAidesTerritoires(page + 1)
    return [...aides, ...nextPage]
  }

  return aides
}

function mapAide(raw: any): AideSource {
  return {
    sourceId: String(raw.id),
    source: 'aides-territoires',
    titre: raw.name ?? '',
    description: raw.description ?? raw.description_md ?? '',
    url: raw.url ?? `https://aides-territoires.beta.gouv.fr/aides/${raw.slug}/`,
    typeMontant: mapFinanciers(raw.financers ?? []),
    montantMin: null,
    montantMax: null,
    tauxAide: raw.subvention_rate_upper ? raw.subvention_rate_upper / 100 : null,
    deadline: raw.submission_deadline ? new Date(raw.submission_deadline) : null,
    portee: mapPerimeter(raw.perimeter ?? ''),
    codesRegion: [],
    codesDept: [],
  }
}

function mapFinanciers(types: string[]): string | null {
  if (types.includes('subvention')) return 'subvention'
  if (types.includes('prêt')) return 'pret'
  return types[0] ?? null
}

function mapPerimeter(perimeter: string): string {
  if (perimeter.includes('France')) return 'national'
  if (perimeter.includes('Région') || perimeter.includes('région')) return 'regional'
  if (perimeter.includes('Département') || perimeter.includes('département')) return 'departemental'
  return 'local'
}

async function fetchWithRetry(url: string, retries = 2): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 5000)
  try {
    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(timer)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res
  } catch (err) {
    clearTimeout(timer)
    if (retries > 0) return fetchWithRetry(url, retries - 1)
    throw err
  }
}

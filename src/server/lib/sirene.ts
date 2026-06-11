import type { EntrepriseProfile } from 'wasp/entities'
import { prisma } from 'wasp/server'

const API_URL = 'https://recherche-entreprises.api.gouv.fr/search'
const CACHE_TTL_DAYS = 30

export async function enrichirDepuisSiret(siret: string): Promise<EntrepriseProfile> {
  const siren = siret.slice(0, 9)

  const cached = await prisma.entrepriseProfile.findUnique({ where: { siren } })
  if (cached) {
    const ageDays = (Date.now() - cached.fetchedAt.getTime()) / 86400000
    if (ageDays < CACHE_TTL_DAYS) return cached
  }

  const data = await fetchWithRetry(`${API_URL}?q=${siren}&page=1&per_page=1`)
  const result = data.results?.[0]
  if (!result) throw new Error(`Entreprise introuvable pour le SIRET ${siret}`)

  const siege = result.siege ?? {}
  const profile = {
    siren,
    siret: siege.siret ?? siret,
    denomination: result.nom_complet ?? '',
    codeNaf: (siege.activite_principale ?? '').replace('.', ''),
    libelleNaf: result.activite_principale_libelle ?? siege.libelle_activite_principale ?? '',
    formeJuridique: result.nature_juridique ?? '',
    effectifTranche: result.tranche_effectif_salarie ?? null,
    dateCreation: result.date_creation ? new Date(result.date_creation) : null,
    codePostal: siege.code_postal ?? '',
    codeInsee: siege.commune ?? '',
    codeRegion: siege.region ?? '',
    codeDept: siege.departement ?? '',
    commune: siege.libelle_commune ?? siege.commune ?? '',
    tva: null,
    fetchedAt: new Date(),
  }

  return prisma.entrepriseProfile.upsert({
    where: { siren },
    create: profile,
    update: profile,
  })
}

async function fetchWithRetry(url: string, retries = 2): Promise<any> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 5000)
  try {
    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(timer)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  } catch (err) {
    clearTimeout(timer)
    if (retries > 0) return fetchWithRetry(url, retries - 1)
    throw err
  }
}

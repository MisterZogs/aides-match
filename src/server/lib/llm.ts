import { Mistral } from '@mistralai/mistralai'
import type { Criteres } from './matching'

const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY })

const CRITERES_SCHEMA = `{
  "nafEligibles": ["string"],
  "nafExclus": ["string"],
  "effectifMin": number | null,
  "effectifMax": number | null,
  "ageEntrepriseMaxAns": number | null,
  "ageEntrepriseMinAns": number | null,
  "secteurs": ["string"],
  "objetProjet": ["string"],
  "zoneGeographique": "national" | "regional" | "departemental" | "local",
  "conditionsLibres": ["string"],
  "confiance": number
}`

const SYSTEM_PROMPT = `Tu es un expert en aides publiques aux entreprises françaises.
Extrais les critères d'éligibilité de cette aide sous forme de JSON strict.
Réponds UNIQUEMENT avec le JSON, sans aucun texte avant ou après.
Si tu n'es pas certain d'un critère, mets null plutôt que d'inventer.
Inclus un champ "confiance" entre 0 et 1 selon ta certitude globale.
Schema attendu :
${CRITERES_SCHEMA}`

export interface ExtractionResult {
  criteres: Criteres
  confiance: number
  tokens: number
  dureeMs: number
}

export async function extraireCriteres(
  titre: string,
  description: string
): Promise<ExtractionResult> {
  const debut = Date.now()

  try {
    const response = await client.chat.complete({
      model: 'mistral-medium-latest',
      maxTokens: 1024,
      responseFormat: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Titre : ${titre}\n\nDescription :\n${description}` },
      ],
    })

    const dureeMs = Date.now() - debut
    const usage = response.usage
    const tokens = (usage?.promptTokens ?? 0) + (usage?.completionTokens ?? 0)
    const text = response.choices?.[0]?.message?.content ?? ''

    const parsed = JSON.parse(typeof text === 'string' ? text : '')
    const { confiance, ...criteres } = parsed

    return { criteres, confiance: confiance ?? 0.5, tokens, dureeMs }
  } catch {
    return {
      criteres: {
        nafEligibles: [],
        nafExclus: [],
        effectifMin: null,
        effectifMax: null,
        ageEntrepriseMaxAns: null,
        ageEntrepriseMinAns: null,
        secteurs: [],
        objetProjet: [],
        zoneGeographique: 'national',
        conditionsLibres: [],
      },
      confiance: 0,
      tokens: 0,
      dureeMs: Date.now() - debut,
    }
  }
}

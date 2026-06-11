import { z } from 'zod'
import { HttpError } from 'wasp/server'
import type { GetAideById } from 'wasp/server/operations'
import type { Aide } from 'wasp/entities'

const InputSchema = z.object({
  aideId: z.string(),
})

export const getAideById: GetAideById<{ aideId: string }, Aide | null> = async (
  rawInput,
  context
) => {
  const { aideId } = InputSchema.parse(rawInput)

  const aide = await context.entities.Aide.findUnique({ where: { id: aideId } })
  if (!aide) return null

  // La fiche complète (criteresJson, conditionsLibres) est réservée aux abonnés
  // Les visiteurs non abonnés ne voient que les infos de base
  const isPro = context.user &&
    ['pro', 'agency'].includes(
      (await context.entities.User.findUnique({ where: { id: context.user.id } }))?.subscriptionPlan ?? ''
    )

  if (!isPro) {
    return {
      ...aide,
      criteresJson: null, // masqué pour les free
      description: aide.description.slice(0, 300) + '…',
    } as Aide
  }

  return aide
}

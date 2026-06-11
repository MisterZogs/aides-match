import { z } from 'zod'
import { HttpError } from 'wasp/server'
import type { CreateAlerte, UpdateAlerte, DeleteAlerte } from 'wasp/server/operations'

const FiltresSchema = z.object({
  themes: z.array(z.string()).default([]),
  regions: z.array(z.string()).default([]),
  typesMontant: z.array(z.string()).default([]),
  montantMin: z.number().nullable().default(null),
})

const CreateAlerteSchema = z.object({
  siren: z.string().length(9),
  nom: z.string().min(1).max(100),
  filtres: FiltresSchema.default({ themes: [], regions: [], typesMontant: [], montantMin: null }),
})

const UpdateAlerteSchema = z.object({
  id: z.string(),
  nom: z.string().min(1).max(100).optional(),
  filtres: FiltresSchema.optional(),
  actif: z.boolean().optional(),
})

const DeleteAlerteSchema = z.object({
  id: z.string(),
})

export const createAlerte: CreateAlerte = async (rawInput, context) => {
  if (!context.user) throw new HttpError(401)

  const input = CreateAlerteSchema.parse(rawInput)

  // Plan pro requis pour les alertes
  const user = await context.entities.User.findUnique({ where: { id: context.user.id } })
  if (!user || !['pro', 'agency'].includes(user.subscriptionPlan ?? '')) {
    throw new HttpError(403, 'Les alertes sont réservées aux abonnés Pro et Agency')
  }

  // Max 3 alertes pour le plan pro
  if (user.subscriptionPlan === 'pro') {
    const count = await context.entities.Alerte.count({
      where: { userId: context.user.id, actif: true },
    })
    if (count >= 3) throw new HttpError(403, 'Limite de 3 alertes atteinte pour le plan Pro')
  }

  return context.entities.Alerte.create({
    data: {
      userId: context.user.id,
      siren: input.siren,
      nom: input.nom,
      filtres: input.filtres,
    },
  })
}

export const updateAlerte: UpdateAlerte = async (rawInput, context) => {
  if (!context.user) throw new HttpError(401)

  const { id, ...data } = UpdateAlerteSchema.parse(rawInput)

  const alerte = await context.entities.Alerte.findUnique({ where: { id } })
  if (!alerte || alerte.userId !== context.user.id) throw new HttpError(404)

  return context.entities.Alerte.update({ where: { id }, data })
}

export const deleteAlerte: DeleteAlerte = async (rawInput, context) => {
  if (!context.user) throw new HttpError(401)

  const { id } = DeleteAlerteSchema.parse(rawInput)

  const alerte = await context.entities.Alerte.findUnique({ where: { id } })
  if (!alerte || alerte.userId !== context.user.id) throw new HttpError(404)

  return context.entities.Alerte.delete({ where: { id } })
}

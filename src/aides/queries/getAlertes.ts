import { HttpError } from 'wasp/server'
import type { GetAlertes } from 'wasp/server/operations'
import type { Alerte } from 'wasp/entities'

export const getAlertes: GetAlertes<void, Alerte[]> = async (_input, context) => {
  if (!context.user) throw new HttpError(401)

  return context.entities.Alerte.findMany({
    where: { userId: context.user.id },
    orderBy: { createdAt: 'desc' },
  })
}

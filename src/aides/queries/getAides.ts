import { z } from 'zod'
import type { GetAides } from 'wasp/server/operations'
import type { Aide } from 'wasp/entities'

const InputSchema = z.object({
  actif: z.boolean().default(true),
  source: z.string().optional(),
  portee: z.string().optional(),
  page: z.number().int().min(1).default(1),
  perPage: z.number().int().min(1).max(100).default(50),
})

export const getAides: GetAides<z.infer<typeof InputSchema>, { aides: Aide[]; total: number }> = async (
  rawInput,
  context
) => {
  const { actif, source, portee, page, perPage } = InputSchema.parse(rawInput)

  const where = {
    actif,
    ...(source ? { source } : {}),
    ...(portee ? { portee } : {}),
  }

  const [aides, total] = await Promise.all([
    context.entities.Aide.findMany({
      where,
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: { createdAt: 'desc' },
    }),
    context.entities.Aide.count({ where }),
  ])

  return { aides, total }
}

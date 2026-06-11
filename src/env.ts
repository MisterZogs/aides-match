import { defineEnvValidationSchema } from 'wasp/env'
import * as z from 'zod'

import { authEnvSchema } from './auth/env'
import { stripeEnvSchema } from './payment/stripe/env'
import { plausibleEnvSchema } from './analytics/env'

const anthropicEnvSchema = z.object({
  ANTHROPIC_API_KEY: z.string().optional(),
})

// Ces vars sont déclarées comme optionnelles pour permettre la compilation
// des fichiers LemonSqueezy et Polar qui font partie du template Open SaaS
// mais ne sont pas utilisés (on utilise uniquement Stripe).
const unusedPaymentProvidersEnvSchema = z.object({
  LEMONSQUEEZY_WEBHOOK_SECRET: z.string().optional(),
  LEMONSQUEEZY_API_KEY: z.string().optional(),
  LEMONSQUEEZY_STORE_ID: z.string().optional(),
  POLAR_ORGANIZATION_ACCESS_TOKEN: z.string().optional(),
  POLAR_SANDBOX_MODE: z.string().optional(),
  POLAR_WEBHOOK_SECRET: z.string().optional(),
  GOOGLE_ANALYTICS_PROPERTY_ID: z.string().optional(),
  GOOGLE_ANALYTICS_PRIVATE_KEY: z.string().optional(),
  GOOGLE_ANALYTICS_CLIENT_EMAIL: z.string().optional(),
})

export const serverEnvValidationSchema = defineEnvValidationSchema(
  authEnvSchema
    .merge(stripeEnvSchema)
    .merge(anthropicEnvSchema)
    .merge(plausibleEnvSchema)
    .merge(unusedPaymentProvidersEnvSchema)
)

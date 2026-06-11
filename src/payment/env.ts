import * as z from "zod";

export const paymentPlansSchema = z.object({
  PAYMENTS_PRO_SUBSCRIPTION_PLAN_ID: z.string({
    error: "PAYMENTS_PRO_SUBSCRIPTION_PLAN_ID is required",
  }),
  PAYMENTS_AGENCY_SUBSCRIPTION_PLAN_ID: z.string({
    error: "PAYMENTS_AGENCY_SUBSCRIPTION_PLAN_ID is required",
  }),
});

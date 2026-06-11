export enum SubscriptionStatus {
  PastDue = "past_due",
  CancelAtPeriodEnd = "cancel_at_period_end",
  Active = "active",
  Deleted = "deleted",
}

export enum PaymentPlanId {
  Pro = "pro",
  Agency = "agency",
}

export interface PaymentPlan {
  id: PaymentPlanId;
  effect: PaymentPlanEffect;
}

export type PaymentPlanEffect = { kind: "subscription" };

export const paymentPlans = {
  [PaymentPlanId.Pro]: {
    id: PaymentPlanId.Pro,
    effect: { kind: "subscription" },
  },
  [PaymentPlanId.Agency]: {
    id: PaymentPlanId.Agency,
    effect: { kind: "subscription" },
  },
} as const satisfies Record<PaymentPlanId, PaymentPlan>;

export function prettyPaymentPlanName(planId: PaymentPlanId): string {
  const planToName: Record<PaymentPlanId, string> = {
    [PaymentPlanId.Pro]: "Pro — 29 €/mois",
    [PaymentPlanId.Agency]: "Agency — 89 €/mois",
  };
  return planToName[planId];
}

export function parsePaymentPlanId(planId: string): PaymentPlanId {
  if ((Object.values(PaymentPlanId) as string[]).includes(planId)) {
    return planId as PaymentPlanId;
  } else {
    throw new Error(`Invalid PaymentPlanId: ${planId}`);
  }
}

export function getSubscriptionPaymentPlanIds(): PaymentPlanId[] {
  return Object.values(PaymentPlanId).filter(
    (planId) => paymentPlans[planId].effect.kind === "subscription",
  );
}

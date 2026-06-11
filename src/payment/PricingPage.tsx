import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "wasp/client/auth";
import {
  generateCheckoutSession,
  getCustomerPortalUrl,
  useQuery,
} from "wasp/client/operations";
import { Alert, AlertDescription } from "../client/components/ui/alert";
import { Button } from "../client/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "../client/components/ui/card";
import { cn } from "../client/utils";
import {
  PaymentPlanId,
  paymentPlans,
  prettyPaymentPlanName,
  SubscriptionStatus,
} from "./plans";

const bestDealPaymentPlanId: PaymentPlanId = PaymentPlanId.Pro;

interface PaymentPlanCard {
  name: string;
  price: string;
  description: string;
  features: string[];
}

export const paymentPlanCards: Record<PaymentPlanId, PaymentPlanCard> = {
  [PaymentPlanId.Pro]: {
    name: prettyPaymentPlanName(PaymentPlanId.Pro),
    price: "29 €",
    description: "Pour les TPE/PME qui veulent maximiser leurs aides",
    features: [
      "Fiches complètes de toutes les aides",
      "Checklist des pièces à fournir",
      "3 alertes SIREN (nouvelles aides chaque mois)",
      "Export PDF du rapport",
    ],
  },
  [PaymentPlanId.Agency]: {
    name: prettyPaymentPlanName(PaymentPlanId.Agency),
    price: "89 €",
    description: "Pour les experts-comptables et conseillers multi-clients",
    features: [
      "SIREN illimités",
      "Alertes illimitées",
      "Dashboard multi-clients",
      "Accès API (intégration CRM)",
      "White-label en option",
    ],
  },
};

const PricingPage = () => {
  const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: user } = useAuth();
  const isUserSubscribed =
    !!user &&
    !!user.subscriptionStatus &&
    user.subscriptionStatus !== SubscriptionStatus.Deleted;

  const {
    data: customerPortalUrl,
    isLoading: isCustomerPortalUrlLoading,
    error: customerPortalUrlError,
  } = useQuery(getCustomerPortalUrl, { enabled: isUserSubscribed });

  const navigate = useNavigate();

  async function handleBuyNowClick(paymentPlanId: PaymentPlanId) {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      setIsPaymentLoading(true);
      const checkoutResults = await generateCheckoutSession(paymentPlanId);
      if (checkoutResults?.sessionUrl) {
        window.open(checkoutResults.sessionUrl, "_self");
      } else {
        throw new Error("Erreur lors de la génération de la session de paiement");
      }
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Erreur lors du paiement. Veuillez réessayer.");
      }
      setIsPaymentLoading(false);
    }
  }

  const handleCustomerPortalClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (customerPortalUrlError || !customerPortalUrl) {
      setErrorMessage("Impossible d'accéder au portail client.");
      return;
    }
    window.open(customerPortalUrl, "_blank");
  };

  return (
    <div className="py-10 lg:mt-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div id="pricing" className="mx-auto max-w-4xl text-center">
          <h2 className="text-foreground mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Des offres adaptées à <span className="text-primary">votre usage</span>
          </h2>
        </div>
        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-center text-lg leading-8">
          La recherche et la liste des aides sont <strong>gratuites et sans inscription</strong>.
          Passez Pro pour accéder aux fiches complètes et aux alertes mensuelles.
        </p>

        {errorMessage && (
          <Alert variant="destructive" className="mt-8">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-x-8">
          {Object.values(PaymentPlanId).map((planId) => (
            <Card
              key={planId}
              className={cn(
                "relative flex grow flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-lg",
                {
                  "ring-primary bg-transparent! ring-2":
                    planId === bestDealPaymentPlanId,
                  "ring-border ring-1":
                    planId !== bestDealPaymentPlanId,
                },
              )}
            >
              {planId === bestDealPaymentPlanId && (
                <div
                  className="absolute top-0 right-0 -z-10 h-full w-full transform-gpu blur-3xl"
                  aria-hidden="true"
                >
                  <div
                    className="from-primary/40 via-primary/20 to-primary/10 absolute h-full w-full bg-linear-to-br opacity-30"
                    style={{ clipPath: "circle(670% at 50% 50%)" }}
                  />
                </div>
              )}
              <CardContent className="h-full justify-between p-8 xl:p-10">
                <div className="flex items-center justify-between gap-x-4">
                  <CardTitle
                    id={planId}
                    className="text-foreground text-lg leading-8 font-semibold"
                  >
                    {paymentPlanCards[planId].name}
                  </CardTitle>
                </div>
                <p className="text-muted-foreground mt-4 text-sm leading-6">
                  {paymentPlanCards[planId].description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-foreground text-4xl font-bold tracking-tight">
                    {paymentPlanCards[planId].price}
                  </span>
                  <span className="text-muted-foreground text-sm leading-6 font-semibold">
                    {paymentPlans[planId].effect.kind === "subscription" && "/mois"}
                  </span>
                </p>
                <ul
                  role="list"
                  className="text-muted-foreground mt-8 space-y-3 text-sm leading-6"
                >
                  {paymentPlanCards[planId].features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckCircle
                        className="text-primary h-5 w-5 flex-none"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {isUserSubscribed ? (
                  <Button
                    onClick={handleCustomerPortalClick}
                    disabled={isCustomerPortalUrlLoading}
                    variant={planId === bestDealPaymentPlanId ? "default" : "outline"}
                    className="w-full"
                  >
                    Gérer mon abonnement
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleBuyNowClick(planId)}
                    aria-describedby={planId}
                    variant={planId === bestDealPaymentPlanId ? "default" : "outline"}
                    className="w-full"
                    disabled={isPaymentLoading}
                  >
                    {!!user ? "Choisir ce plan" : "S'inscrire et choisir"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <p className="text-muted-foreground mt-8 text-center text-xs">
          AidesMatch ne garantit pas l'éligibilité aux aides — le score est indicatif.
          Vérifiez toujours les conditions complètes auprès du porteur de l'aide.
        </p>
      </div>
    </div>
  );
};

export default PricingPage;

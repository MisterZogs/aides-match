import { routes } from "wasp/client/router";
import type { NavigationItem } from "./NavBar";

export const marketingNavigationItems: NavigationItem[] = [
  { name: "Comment ça marche ?", to: "/#features" },
  { name: "Tarifs", to: routes.PricingPageRoute.to },
] as const;

export const demoNavigationitems: NavigationItem[] = [
  { name: "Tableau de bord", to: routes.DashboardRoute.to },
] as const;

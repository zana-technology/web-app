import { routes } from "@/router";
import { Step } from "@/types";

export const onboardingSteps: Step[] = [
  {
    title: "Get Started",
    step: 1,
    route: routes.auth.signup,
  },
  {
    title: "Role & Experience",
    step: 2,
    route: `${routes.auth.onboarding}`,
  },
  {
    title: "Location & Visa",
    step: 3,
    route: `${routes.auth.onboarding}?step=3`,
  },
  {
    title: "Work Type",
    step: 4,
    route: `${routes.auth.onboarding}?step=4`,
  },
  {
    title: "Language & Diversity",
    step: 5,
    route: `${routes.auth.onboarding}?step=5`,
  },
  {
    title: "Account Setup",
    step: 6,
    route: `${routes.auth.onboarding}?step=6`,
  },
];

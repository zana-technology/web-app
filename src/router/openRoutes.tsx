import {
  ForgotPassword,
  Landing,
  Login,
  Onboarding,
  OnboardingComplete,
  PrivacyPolicy,
  ProfilePreview,
  ResetPassword,
  Signup,
  VerifyEmail,
} from "@/pages";
import { routes } from "./routes";

export const authRoutes = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "verify/:id",
    element: <VerifyEmail />,
  },
  {
    path: "onboarding",
    element: <Onboarding />,
  },
  {
    path: "preview",
    element: <ProfilePreview />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "reset-password/:token",
    element: <ResetPassword />,
  },
];

export const openRoutes = [
  {
    path: routes.auth.complete,
    element: <OnboardingComplete />,
  },
];

export const landingRoutes = [
  { path: "/", element: <Landing /> },
  { path: "privacy-policy", element: <PrivacyPolicy /> },
];

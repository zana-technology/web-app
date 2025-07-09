import {
  Landing,
  Login,
  Onboarding,
  OnboardingComplete,
  ProfilePreview,
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
];

export const openRoutes = [
  { path: "/", element: <Landing /> },
  {
    path: routes.auth.complete,
    element: <OnboardingComplete />,
  },
];

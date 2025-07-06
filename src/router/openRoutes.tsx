import {
  Landing,
  Login,
  Onboarding,
  ProfilePreview,
  Signup,
  VerifyEmail,
} from "@/pages";

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

export const openRoutes = [{ path: "/", element: <Landing /> }];

import { Landing, Login, Signup, VerifyEmail } from "@/pages";

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
];

export const openRoutes = [{ path: "/", element: <Landing /> }];

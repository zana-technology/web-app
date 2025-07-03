import { Landing, Login, Signup } from "@/pages";

export const authRoutes = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
];

export const openRoutes = [{ path: "/", element: <Landing /> }];

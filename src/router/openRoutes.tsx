import { Landing, Login } from "@/pages";

export const authRoutes = [
  {
    path: "login",
    element: <Login />,
  },
];

export const openRoutes = [{ path: "/", element: <Landing /> }];

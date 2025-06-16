import { lazy } from "react";
import { routes } from "./routes";

const Login = lazy(() => import("@/App"));

const openRoutes = [
  {
    path: routes.auth.index,
    element: <Login />,
  },
];

export default openRoutes;

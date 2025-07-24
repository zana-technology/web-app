import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import RequireAuth from "./RequireAuth";
import protectedRoutes from "./protectedRoutes";
import { authRoutes, openRoutes } from "./openRoutes";
import { AppLayout, AuthLayout } from "@/layouts";
import { ErrorPage } from "@/components";

export const router = createBrowserRouter([
  ...openRoutes,
  {
    path: routes.auth.index,
    element: <AuthLayout />,
    children: authRoutes,
    errorElement: <ErrorPage />,
  },
  {
    path: routes.app.index,
    element: <RequireAuth />,
    children: [
      {
        element: <AppLayout />,
        children: protectedRoutes,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

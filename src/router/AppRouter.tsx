import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import RequireAuth from "./RequireAuth";
import protectedRoutes from "./protectedRoutes";
import { authRoutes, landingRoutes, openRoutes } from "./openRoutes";
import { AppLayout, AuthLayout, LandingLayout } from "@/layouts";
import { ErrorPage, NotFound } from "@/components";

export const router = createBrowserRouter([
  ...openRoutes,
  {
    path: routes.home,
    element: <LandingLayout />,
    children: landingRoutes,
    errorElement: <ErrorPage />,
  },
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
  {
    path: "*",
    element: <NotFound />,
  },
]);

import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import openRoutes from "./publicRoutes";
import protectedRoutes from "./privateRoutes";

const RouteWrapper = (children: React.ReactNode | null) => (
  //   <Suspense fallback={<PageLoader />}>{children}</Suspense>
  <p>Suspense goes here</p>
);

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authenticated Routes */}
        {/* <Route path="/" element={<MainLayout />}> */}
        <Route path="/">
          {protectedRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={RouteWrapper(route.element)}
            />
          ))}
        </Route>

        {/* Unauthenticated Routes */}

        {/* <Route path="/" element={<AuthLayout />}> */}
        <Route path="/">
          {openRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={RouteWrapper(route.element)}
            />
          ))}
        </Route>
        <Route path="*" element={<Navigate replace to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

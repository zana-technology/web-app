import { Navigate, Outlet } from "react-router-dom";
import { routes } from "./routes";

const RequireAuth = () => {
  const isAuthenticated = Boolean(localStorage.getItem("access_token"));

  return isAuthenticated ? <Outlet /> : <Navigate to={routes.auth.login} />;
};

export default RequireAuth;

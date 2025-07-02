import { logo } from "@/assets";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div>
      <div>
        <img src={logo} alt="Zana Logo" />
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;

import { logo } from "@/assets";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="w-full flex py-10 justify-center items-center">
        <img src={logo} alt="Zana Logo" />
      </div>
      <div className="flex-1 overflow-auto flex justify-center items-center">
        <div className="w-full px-4 sm:w-[640px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

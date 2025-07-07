import { logo } from "@/assets";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="w-full flex py-10 justify-center items-center">
        <img src={logo} alt="Zana Logo" />
      </div>
      <div className="flex-1 flex justify-center py-4 w-full overflow-x-hidden ">
        <div className="w-full px-4 py-5 sm:w-[640px] my-5 sm:mt-28 sm:mb-10 min-h-fit">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

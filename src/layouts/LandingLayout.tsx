import { LandingNavbar } from "@/components";
import { Outlet } from "react-router-dom";

export const LandingLayout = () => {
  return (
    <div className="flex w-screen justify-center">
      <div className="h-screen flex flex-col relative w-full max-w-[1440px]">
        <LandingNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default LandingLayout;

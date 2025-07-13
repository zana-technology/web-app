import { AppNavbar, Sidebar } from "@/components";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="w-[280px] hidden md:block"></div>
      <div className="flex flex-col h-screen flex-1 relative">
        <AppNavbar setShowSidebar={setShowSidebar} />
        <div className="h-14"></div>
        <div className="flex-1 md:border-l md:border-l-zana-grey-300 py-5 md:py-8 px-4 md:px-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;

import { AppNavbar, Sidebar } from "@/components";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex flex-col h-screen flex-1 relative w-full">
        <AppNavbar setShowSidebar={setShowSidebar} />
        <div className="h-14"></div>
        <div className="flex-1 md:border-l md:border-l-zana-grey-300 py-5 md:py-8 px-4 md:px-6 overflow-y-auto overflow-x-hidden min-w-0 md:ml-[280px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;

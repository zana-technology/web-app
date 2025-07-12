import { Sidebar } from "@/components";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-[280px]"></div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;

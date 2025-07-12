import { logoAvatar } from "@/assets";
import { sidebarData } from "./sidebarData";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import SidebarBottom from "./SidebarBottom";

export const Sidebar = () => {
  const location = useLocation();

  const pathname = location?.pathname;

  return (
    <div className="fixed w-[280px] bg-white flex flex-col gap-4 h-screen">
      <div className="h-14 flex items-center px-6 py-2.5">
        <img src={logoAvatar} alt="Zana Logo" className="h-9" />
      </div>
      <div className="flex flex-col justify-between px-4 flex-1">
        <div className="flex flex-col gap-2">
          {sidebarData?.map((x, i) => (
            <Link
              to={x.link}
              key={i}
              className={twMerge(
                "flex items-center gap-2 px-2 py-1.5 text-dark-400 rounded hover:text-dark-800 cursor-pointer font-medium",
                pathname === x?.link ? "bg-zana-grey-500 text-dark-800" : ""
              )}
            >
              <img src={x.icon} alt={x.title} className="h-[18px]" />
              <p>{x?.title}</p>
            </Link>
          ))}
        </div>
        <SidebarBottom />
      </div>
    </div>
  );
};

export default Sidebar;

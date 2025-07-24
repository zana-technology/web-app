import { Link } from "react-router-dom";
import { sidebarExtra } from "./sidebarData";
import { twMerge } from "tailwind-merge";
import { Dispatch, SetStateAction } from "react";
import { logoutIcon } from "@/assets";
import { handleLogout } from "@/libs";

const SidebarExtraMenu = ({
  setShowExtra,
}: {
  setShowExtra: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="absolute bg-zana-grey-500 w-full flex flex-col bottom-[60%] shadow-md z-20 border border-zana-grey-300 rounded-xl py-1.5">
      <div className="flex flex-col gap-2 bg-white  border border-zana-grey-300 rounded-xl">
        {sidebarExtra?.map((x, i) => (
          <Link
            to={x.disabled ? "#" : x.link}
            key={i}
            className={twMerge(
              "flex items-center gap-2 px-2 py-1.5 text-dark-400 rounded hover:text-dark-800 cursor-pointer font-medium"
              //   pathname === x?.link ? "bg-zana-grey-500 text-dark-800" : ""
            )}
            onClick={() => {
              setShowExtra(false);
            }}
          >
            <img src={x.icon} alt={x.title} className="h-[18px]" />
            <p>{x?.title}</p>
            {x?.disabled && <p className="text-[8px] text-green-500">Coming Soon</p>}
          </Link>
        ))}
      </div>
      <div
        className="flex items-center gap-2 px-2 py-1.5 text-dark-400  hover:text-dark-800 cursor-pointer font-medium mt-1"
        onClick={handleLogout}
      >
        <img src={logoutIcon} alt={"sing out"} className="h-[18px]" />
        <p>Sign out</p>
      </div>
    </div>
  );
};

export default SidebarExtraMenu;

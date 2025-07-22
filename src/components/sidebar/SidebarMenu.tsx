import { sidebarData } from "./sidebarData";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import SidebarBottom from "./SidebarBottom";
import { Dispatch, SetStateAction } from "react";

const SidebarMenu = ({
  setShowSidebar,
}: {
  setShowSidebar?: Dispatch<SetStateAction<boolean>>;
}) => {
  const location = useLocation();

  const pathname = location?.pathname;
  return (
    <div className="flex flex-col justify-between px-4 flex-1">
      <div className="flex flex-col gap-2">
        {sidebarData?.map((x, i) => (
          <Link
            to={x.disabled ? "#" : x.link}
            key={i}
            className={twMerge(
              "flex items-center gap-2 px-2 py-1.5 text-dark-400 rounded hover:text-dark-800 cursor-pointer font-medium",
              pathname === x?.link ? "bg-zana-grey-500 text-dark-800" : ""
            )}
            onClick={() => {
              if (setShowSidebar) setShowSidebar(false);
            }}
          >
            <img src={x.icon} alt={x.title} className="h-[18px]" />
            <p>{x?.title}</p>
            {x?.disabled && <p className="text-[8px] text-green-500">Coming Soon</p>}
          </Link>
        ))}

        {/* <Button
          title="Add a Job"
          icon={<IoMdAdd />}
          iconPosition="left"
          className="h-9 text-sm md:hidden flex mt-6"
          fullWidth
        /> */}
      </div>
      <SidebarBottom />
    </div>
  );
};

export default SidebarMenu;

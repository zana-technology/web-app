import { useLocation } from "react-router-dom";
import { sidebarData, sidebarExtra } from "./sidebarData";
import { IoIosNotificationsOutline } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { logo } from "@/assets";
import { Dispatch, SetStateAction } from "react";

export const AppNavbar = ({
  setShowSidebar,
}: {
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}) => {
  const location = useLocation();

  const pathname = location?.pathname;

  const forPageTitle = [...sidebarData, ...sidebarExtra];

  const getPageTitle = () => {
    const title = forPageTitle?.filter((x) => x.link === pathname)[0]?.title;

    return title;
  };

  return (
    <div className="h-14 flex items-center justify-between gap-3 px-4 md:px-6 md:pl-[304px] w-full border-b border-b-zana-grey-300 md:border-b-zana-grey-100 absolute ">
      <div className="font-semibold text-xs hidden md:flex gap-1 ">
        <p className="text-zana-grey-700">Zana</p>
        <p className="text-zana-grey-200">/</p>
        <p>{getPageTitle()}</p>
      </div>
      <img src={logo} alt="Zana Logo" className="md:hidden h-[18px]" />

      <div className="flex items-center gap-8">
        {/* <Button
          title="Add a Job"
          icon={<IoMdAdd />}
          iconPosition="left"
          className="h-9 text-sm hidden md:flex"
        /> */}

        <div className="text-gray-500 flex items-center gap-1.5 cursor-pointer">
          <div className="p-2.5">
            <IoIosNotificationsOutline size={20} />
          </div>
          <div className="p-2 md:hidden">
            <GiHamburgerMenu
              size={24}
              onClick={() => {
                setShowSidebar(true);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppNavbar;

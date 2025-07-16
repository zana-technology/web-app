import { logo, logoAvatar } from "@/assets";
import { useWindowWidth } from "@/hooks";
import { MdClose } from "react-icons/md";
import { Dispatch, SetStateAction } from "react";
import SidebarMenu from "./SidebarMenu";
import { motion } from "framer-motion";

export const Sidebar = ({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}) => {
  const width = useWindowWidth();

  if (width > 768) {
    return <DesktopSidebar />;
  } else {
    return <MobileSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />;
  }
};

const DesktopSidebar = () => {
  return (
    <div className="fixed w-[280px] bg-white flex flex-col gap-4 h-screen z-10">
      <div className="h-14 flex items-center px-6 py-2.5">
        <img src={logoAvatar} alt="Zana Logo" className="h-9" />
      </div>
      <SidebarMenu />
    </div>
  );
};

const MobileSidebar = ({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}) => {
  if (showSidebar) {
    return (
      <div className="fixed w-screen bg-dark-1000 flex justify-between backdrop-blur-md bg-opacity-70 z-[100]">
        <motion.div
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          exit={{ x: -50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="min-w-[280px] w-[70%]"
        >
          <div className="w-full bg-white flex flex-col gap-4 h-screen ">
            <div className="h-14 flex items-center px-4 py-6 border-b border-b-gray-300">
              <img src={logo} alt="Zana Logo" className="h-[18px]" />
            </div>

            <SidebarMenu />
          </div>
        </motion.div>

        <div
          className="mt-6 mr-5 flex-1 flex justify-end"
          onClick={() => {
            setShowSidebar(false);
          }}
        >
          <MdClose className="text-white" size={24} />
        </div>
      </div>
    );
  }
};

export default Sidebar;

import { logo, logoAvatar } from "@/assets";
import { useWindowWidth } from "@/hooks";
import { MdClose } from "react-icons/md";
import { Dispatch, SetStateAction } from "react";
import SidebarMenu from "./SidebarMenu";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { routes } from "@/router";

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
  const navigate = useNavigate();
  return (
    <div className="fixed w-[280px] bg-white flex flex-col gap-4 h-screen z-10">
      <div className="h-14 flex items-center px-6 py-2.5">
        <img
          src={logoAvatar}
          alt="Zana Logo"
          className="h-9"
          onClick={() => {
            navigate(routes.app.feed_auto_applied);
          }}
        />
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
  const navigate = useNavigate();

  if (showSidebar) {
    return (
      <div
        className="fixed inset-0 bg-dark-1000 flex justify-between backdrop-blur-md bg-opacity-70 z-[100] mobile-sidebar-height"
        style={{ height: "100dvh" }} // Dynamic viewport height for iOS
      >
        <motion.div
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          exit={{ x: -50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="min-w-[280px] w-[70%] flex flex-col"
          style={{
            height: "100dvh",
            paddingBottom: "env(safe-area-inset-bottom)", // iOS safe area
          }}
        >
          <div className="w-full bg-white flex flex-col h-full">
            {/* Header - Fixed */}
            <div className="h-14 flex items-center px-4 py-6 border-b border-b-gray-300 flex-shrink-0">
              <img
                src={logo}
                alt="Zana Logo"
                className="h-[18px]"
                onClick={() => {
                  navigate(routes.app.feed_auto_applied);
                  setShowSidebar(false);
                }}
              />
            </div>

            {/* Menu - Scrollable */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              <SidebarMenu setShowSidebar={setShowSidebar} />
            </div>
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

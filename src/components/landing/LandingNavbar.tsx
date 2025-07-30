import { logoAvatar } from "@/assets";
import { useNavigate } from "react-router-dom";
import { Button } from "../button";
import { routes } from "@/router";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { RemoveScroll } from "react-remove-scroll";

export const LandingNavbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="flex items-center justify-between gap-4 px-4 md:px-24 py-3 md:py-4 relative h-full">
      <img
        src={logoAvatar}
        alt="Zana Logo"
        className="h-10"
        onClick={() => {
          navigate("/");
        }}
      />
      <div className="hidden md:flex gap-3.5">
        <Button
          title="Login"
          variant="outlined"
          onClick={() => {
            navigate(routes.auth.login);
          }}
          className="font-semibold"
        />
        <Button
          title="Get Started"
          onClick={() => {
            navigate(routes.auth.signup);
          }}
          className="font-semibold"
        />
      </div>
      <div
        className="p-2 md:hidden"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        {showMenu ? <MdClose size={24} /> : <GiHamburgerMenu size={24} />}
      </div>
      {showMenu ? (
        <AnimatePresence mode="wait">
          <RemoveScroll className="fixed left-0 top-14">
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="bg-white w-screen h-screen   flex md:hidden flex-col pt-20 gap-8 px-4 sm:px-8"
            >
              <Button
                title="Login"
                variant="outlined"
                onClick={() => {
                  navigate(routes.auth.login);
                }}
                className="font-semibold"
                fullWidth
              />
              <Button
                title="Get Started"
                onClick={() => {
                  navigate(routes.auth.signup);
                }}
                className="font-semibold"
                fullWidth
              />
            </motion.div>
          </RemoveScroll>
        </AnimatePresence>
      ) : (
        ""
      )}
    </div>
  );
};

export default LandingNavbar;

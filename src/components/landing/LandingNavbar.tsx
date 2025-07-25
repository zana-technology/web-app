import { logoAvatar } from "@/assets";
import { useNavigate } from "react-router-dom";
import { Button } from "../button";
import { routes } from "@/router";
import { GiHamburgerMenu } from "react-icons/gi";

export const LandingNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between gap-4 px-4 md:px-24 py-3 md:py-4">
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
      <div className="p-2 md:hidden">
        <GiHamburgerMenu
          size={24}
          //   onClick={() => {
          //     setShowSidebar(true);
          //   }}
        />
      </div>
    </div>
  );
};

export default LandingNavbar;

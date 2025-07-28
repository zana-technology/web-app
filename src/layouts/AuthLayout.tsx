import { avatar, logo } from "@/assets";
import { routes } from "@/router";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const AuthLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const fullPath = `${location.pathname}${location.search}`;

  const showAvatar = [
    routes.auth.onboarding,
    `${routes.auth.onboarding}?step=2`,
    `${routes.auth.onboarding}?step=6`,
  ].includes(fullPath);

  return (
    <div className="h-screen flex flex-col relative">
      <div className="w-full flex py-10 justify-center items-center">
        <img
          src={logo}
          alt="Zana Logo"
          className="h-[18px]"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className="flex-1 flex justify-center py-4 w-full overflow-x-hidden ">
        <div className="w-full px-4 py-5 sm:w-[640px] my-5 min-h-fit">
          <Outlet />
        </div>
      </div>
      {showAvatar && (
        <div className="absolute bottom-0 right-5 z-10 flex ">
          <div className="w-[280px] xs:w-[350px] bg-zana-primary-normal  text-xs xs:text-sm text-white p-2.5 xs:p-3.5 rounded-xl absolute right-[70%] xs:right-[80%] bottom-3 xs:bottom-7 animate-chatPop">
            {fullPath === `${routes.auth.onboarding}?step=6` ? (
              <p>
                Almost there! Great job. I really need these informations so i help you the best way
                i can
              </p>
            ) : (
              <p>
                Hi there!, I’m <span className="font-bold text-zana-color-500">Zana</span>, your job
                hunting assistant. Lets find your next job together
              </p>
            )}
          </div>
          <img src={avatar} alt="Zana Avatar" className="w-[90px] sm:w-[142px]" />
        </div>
      )}
    </div>
  );
};

export default AuthLayout;

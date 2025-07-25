import { banner } from "@/assets";
import { Button } from "../button";
import { useNavigate } from "react-router-dom";
import { routes } from "@/router";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center mt-11 sm:mt-24 gap-8 md:gap-32 px-4">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="font-medium max-w-[771px] text-4xl sm:text-6xl">
          Your personal job assistant that never sleeps
        </h1>
        <p className="max-w-[725px] text-lg sm:text-xl">
          Zana finds, applies to, and tracks hundreds of job applications automatically while you
          focus on what matters the most - landing your dream job{" "}
        </p>
        <Button
          title="Get started for free"
          onClick={() => {
            navigate(routes.auth.signup);
          }}
          className="font-semibold"
        />
      </div>
      <img src={banner} alt="Zana app" className="w-full max-w-[832px] md:p-0 p-6" />
    </div>
  );
};

export default Hero;

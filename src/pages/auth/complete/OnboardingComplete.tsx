import { avatar, confetti, logo } from "@/assets";
import { Button } from "@/components";
import { routes } from "@/router";
import { useNavigate } from "react-router-dom";

const OnboardingComplete = () => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-cover bg-center w-screen h-screen flex flex-col"
      style={{ backgroundImage: `url(${confetti})` }}
    >
      <div className="w-full flex py-10 justify-center items-center">
        <img src={logo} alt="Zana Logo" className="h-[18px]" />
      </div>
      <div className="w-full flex flex-col justify-center items-center flex-1 p-5 -mt-28">
        <img src={avatar} alt="Zana Avatar" className="h-[142px]" />
        <div className="bg-zana-primary-normal text-white w-full xs:w-[442px] flex flex-col items-center justify-center text-center p-6 rounded-xl gap-8 min-h-[230px]">
          <div>
            <h4 className="text-2xl font-semibold">Onboarding completed!!</h4>
            <p>You are all set to go and Zana is ready to help you get that dream job!!</p>
          </div>
          <Button
            title="Lets Begin"
            fullWidth
            type="submit"
            showArrow={true}
            className="bg-zana-color-500 text-zana-primary-normal hover:bg-zana-color-500 hover:text-zana-primary-normal"
            onClick={() => {
              navigate(routes.app.feed);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingComplete;

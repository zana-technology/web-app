import { AuthHeader, StepIndicator } from "@/components";
import { onboardingSteps } from "@/libs";

const Signup = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <StepIndicator steps={onboardingSteps} currentStep={1} />
      <div className="w-full flex flex-col items-center py-14 px-4 xs:px-20 border border-zana-grey-300 mt-14">
        <AuthHeader
          title="Let’s get you started"
          subTitle="Put in your email address and create a password"
        />
      </div>
    </div>
  );
};

export default Signup;

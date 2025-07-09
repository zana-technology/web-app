import { AuthHeader, Button, OnboardingHash, StepIndicator } from "@/components";
import { onboardingSteps } from "@/libs";
import { useOnboarding } from "./logic";

const Onboarding = () => {
  const { currentStep, formik, renderStep, renderAuthHeader, goBack } = useOnboarding();
  const { handleSubmit, isSubmitting, isValid, dirty } = formik;
  return (
    <div className="w-full flex flex-col items-center sm:mt-5 sm:mb-10">
      <StepIndicator steps={onboardingSteps} currentStep={currentStep} />
      <OnboardingHash>
        <AuthHeader title={renderAuthHeader().title} subTitle={renderAuthHeader().subTitle} />
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {renderStep()}
          <div className="flex items-center gap-7 mt-3">
            {currentStep > 2 ? (
              <Button
                title="Back"
                showArrow={true}
                iconPosition="left"
                onClick={goBack}
                variant="outlined"
              />
            ) : (
              ""
            )}
            <Button
              title="Continue"
              fullWidth
              type="submit"
              loading={isSubmitting}
              showArrow={true}
              disabled={!(isValid && dirty)}
            />
          </div>
        </form>
      </OnboardingHash>
    </div>
  );
};

export default Onboarding;

import { AuthHeader, Button, StepIndicator } from "@/components";
import { onboardingSteps } from "@/libs";
import { useOnboarding } from "./logic";

const Onboarding = () => {
  const { currentStep, formik, renderStep, renderAuthHeader, goBack } =
    useOnboarding();
  const { handleSubmit, isSubmitting, isValid, dirty } = formik;
  return (
    <div className="w-full flex flex-col items-center">
      <StepIndicator steps={onboardingSteps} currentStep={currentStep} />
      <div className="w-full flex flex-col items-center py-14 px-4 xs:px-20 border border-zana-grey-300 mt-4 sm:mt-14">
        <AuthHeader
          title={renderAuthHeader().title}
          subTitle={renderAuthHeader().subTitle}
        />
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {renderStep()}
          <div className="flex items-center gap-7">
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
      </div>
    </div>
  );
};

export default Onboarding;

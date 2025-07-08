import { AuthHeader, Button, Input, StepIndicator } from "@/components";
import { useVerifyEmail } from "./logic";
import { onboardingShellClassName, onboardingSteps } from "@/libs";

const VerifyEmail = () => {
  const {
    formik,
    id,
    changeEmailHandler,
    canResend,
    restartCountdown,
    timeLeft,
    secondsLeft,
    loading,
  } = useVerifyEmail();

  const {
    values,
    touched,
    handleBlur,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
    dirty,
  } = formik;

  return (
    <div className="w-full flex flex-col items-center sm:mt-28 sm:mb-10">
      <StepIndicator steps={onboardingSteps} currentStep={1} />
      <div className={onboardingShellClassName}>
        <AuthHeader
          title="Check your email"
          subTitle={`We sent a code to ${id}.`}
          action={{
            title: "Change email",
            onClick: changeEmailHandler,
          }}
        />
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <Input
            label="Verification code"
            name="code"
            value={values.code}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.code}
            touched={touched.code}
            required
          />

          <Button
            title="Continue"
            fullWidth
            type="submit"
            loading={isSubmitting}
            showArrow={true}
            disabled={!(isValid && dirty)}
          />
          <Button
            title="Resend code"
            fullWidth
            loading={loading}
            disabled={!canResend}
            onClick={restartCountdown}
          />
          {secondsLeft !== 0 && (
            <p className="text-center">Resend code in {timeLeft}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;

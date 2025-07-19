import { AuthHeader, Button, Input, OnboardingHash, StepIndicator } from "@/components";
import { onboardingSteps } from "@/libs";
import { useSignup } from "./logic";

const Signup = () => {
  const { formik, goToLogin } = useSignup();

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
    <div className="w-full flex flex-col items-center sm:mt-8 sm:mb-5">
      <StepIndicator steps={onboardingSteps} currentStep={1} />
      <OnboardingHash>
        <AuthHeader
          title="Let’s get you started"
          subTitle="Put in your email address and create a password"
        />
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <Input
            label="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.email}
            touched={touched.email}
            required
          />
          <Input
            label="password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.password}
            touched={touched.password}
            required
            note="Password must be at least 8 characters long"
          />
          <Input
            label="confirm password"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword as string}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.confirmPassword}
            touched={touched.confirmPassword}
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
          <div className="flex items-center text-sm justify-center gap-1">
            <p>Already have an account?</p>{" "}
            <Button
              title="Log in"
              type="button"
              variant="text"
              className="p-0 text-sm font-semibold"
              onClick={goToLogin}
            />{" "}
          </div>
        </form>
      </OnboardingHash>
    </div>
  );
};

export default Signup;

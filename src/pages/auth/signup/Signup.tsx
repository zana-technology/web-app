import { AuthHeader, Button, Input, OnboardingHash, StepIndicator } from "@/components";
import { onboardingSteps } from "@/libs";
import { useSignup } from "./logic";

const Signup = () => {
  const { formik } = useSignup();

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
        </form>
      </OnboardingHash>
    </div>
  );
};

export default Signup;

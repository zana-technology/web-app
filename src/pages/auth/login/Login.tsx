import { AuthHeader, Button, Input, OnboardingHash } from "@/components";
import { useLogin } from "./logic";

const Login = () => {
  const { formik, goToForgotPw, goToSignup } = useLogin();

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
    <OnboardingHash className="sm:mt-40 sm:mb-10">
      <AuthHeader title="Welcome back" subTitle="Enter your correct details to continue" />

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <Input
          label="email"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={errors.username}
          touched={touched.username}
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
        />
        <Button
          title="Forgot password"
          type="button"
          variant="text"
          className="p-0 text-sm font-semibold"
          onClick={goToForgotPw}
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
          <p>Don't have an account?</p>{" "}
          <Button
            title="Sign up"
            type="button"
            variant="text"
            className="p-0 text-sm font-semibold"
            onClick={goToSignup}
          />{" "}
        </div>
      </form>
    </OnboardingHash>
  );
};

export default Login;

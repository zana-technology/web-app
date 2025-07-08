import { AuthHeader, Button, Input } from "@/components";
import { useLogin } from "./logic";
import { onboardingShellClassName } from "@/libs";
import { twMerge } from "tailwind-merge";

const Login = () => {
  const { formik } = useLogin();

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
    <div className={twMerge(onboardingShellClassName, "sm:mt-40 sm:mb-10")}>
      <AuthHeader
        title="Welcome back"
        subTitle="Enter your correct details to continue"
      />

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
          title="Continue"
          fullWidth
          type="submit"
          loading={isSubmitting}
          showArrow={true}
          disabled={!(isValid && dirty)}
        />
      </form>
    </div>
  );
};

export default Login;

import { AuthHeader, Button, Input } from "@/components";
import { useLogin } from "./logic";

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
    <div className="w-full flex flex-col items-center py-14 px-4 xs:px-20 border border-zana-grey-300 -mt-24">
      <AuthHeader
        title="Welcome back"
        subTitle="Enter your correct details to continue"
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

import { Button, Input } from "@/components";
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
  } = formik;

  return (
    <div className="w-full flex flex-col items-center py-14 px-20 border border-zana-grey-300 -mt-24">
      <h2 className="text-xl font-semibold">Welcome back</h2>
      <p className="text-dark-400 mb-12">
        Enter your correct details to continue
      </p>
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
        />
      </form>
    </div>
  );
};

export default Login;

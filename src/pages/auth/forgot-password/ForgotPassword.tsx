import { AuthHeader, Button, Input, OnboardingHash } from "@/components";
import { useForgotPassword } from "./logic";
import { IoMdArrowBack } from "react-icons/io";
import { avatar } from "@/assets";

const ForgotPassword = () => {
  const { formik, goToLogin, success } = useForgotPassword();

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
    <>
      {success ? (
        <div className="w-full flex flex-col justify-center items-center flex-1 p-5 ">
          <img src={avatar} alt="Zana Avatar" className="h-[142px]" />
          <div className="bg-zana-primary-normal text-white w-full xs:w-[442px] flex flex-col items-center justify-center text-center p-6 rounded-xl gap-8 min-h-[230px]">
            <div>
              <h4 className="text-2xl font-semibold">Check you email</h4>
              <p>We sent a password reset link to {values?.email}</p>
            </div>
            <div className="flex items-center text-sm justify-center gap-1">
              <Button
                title="Back to log in"
                type="button"
                variant="text"
                className="p-0 text-sm font-semibold text-white hover:text-white"
                onClick={goToLogin}
                icon={<IoMdArrowBack size={20} />}
                iconPosition="left"
              />{" "}
            </div>
          </div>
        </div>
      ) : (
        <OnboardingHash className="sm:mt-40 sm:mb-10">
          <AuthHeader
            title="Forget password"
            subTitle="Reset link would be sent to your email address"
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

            <Button
              title="Reset Password"
              fullWidth
              type="submit"
              loading={isSubmitting}
              showArrow={true}
              disabled={!(isValid && dirty)}
            />
            <div className="flex items-center text-sm justify-center gap-1">
              <Button
                title="Back to log in"
                type="button"
                variant="text"
                className="p-0 text-sm font-semibold"
                onClick={goToLogin}
                icon={<IoMdArrowBack size={20} />}
                iconPosition="left"
              />{" "}
            </div>
          </form>
        </OnboardingHash>
      )}
    </>
  );
};

export default ForgotPassword;

import { avatar } from "@/assets";
import { useResetPassword } from "./logic";
import { AuthHeader, Button, Input, OnboardingHash } from "@/components";
import { IoMdArrowBack } from "react-icons/io";

const ResetPassword = () => {
  const { formik, goToLogin, success } = useResetPassword();

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
              <h4 className="text-2xl font-semibold">Reset successful</h4>
              <p>
                Your password has been reset successfully. Click on the log in button and enter your
                details to resume.
              </p>
            </div>
            <Button
              title="Log in"
              fullWidth
              type="submit"
              showArrow={true}
              className="bg-zana-color-500 text-zana-primary-normal hover:bg-zana-color-500 hover:text-zana-primary-normal"
              onClick={goToLogin}
            />
          </div>
        </div>
      ) : (
        <OnboardingHash className="sm:mt-40 sm:mb-10">
          <AuthHeader
            title="Set a new password"
            subTitle="New password must be different from previous one"
          />

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
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
              placeholder="Create a secure password"
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
              placeholder="Confirm your secure password"
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

export default ResetPassword;

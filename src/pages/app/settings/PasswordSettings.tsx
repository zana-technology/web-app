import { Button, Input, JobDetailsShell } from "@/components";
import { usePasswordSettings } from "./logic";

const PasswordSettings = () => {
  const { formik } = usePasswordSettings();

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
    <JobDetailsShell title="Password">
      {" "}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <Input
          label="current password"
          name="currentPassword"
          type="password"
          value={values.currentPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={errors.currentPassword}
          touched={touched.currentPassword}
          required
        />
        <Input
          label="New password"
          name="newPassword"
          type="password"
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={errors.newPassword}
          touched={touched.newPassword}
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

        {dirty && (
          <div className="grid grid-cols-2 sm:flex w-full justify-end gap-8 mt-5">
            <Button
              title="Cancel"
              loading={isSubmitting}
              variant="outlined"
              className="w-full sm:w-fit"
            />
            <Button
              title="Save"
              type="submit"
              loading={isSubmitting}
              disabled={!(isValid && dirty)}
              className="w-full sm:w-[380px]"
            />
          </div>
        )}
      </form>
    </JobDetailsShell>
  );
};

export default PasswordSettings;

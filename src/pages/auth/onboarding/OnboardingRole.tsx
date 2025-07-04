import { Input } from "@/components";
import { CandidateProfile } from "@/types";
import { FormikProps } from "formik";

const OnboardingRole = ({
  formik,
}: {
  formik: FormikProps<CandidateProfile>;
}) => {
  const { values, touched, handleBlur, errors, handleChange } = formik;
  return (
    <>
      <Input
        label="Job title or Role"
        name="preferred_role"
        value={values.preferred_role}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={errors.preferred_role}
        touched={touched.preferred_role}
        placeholder="e.g Data Analyst, Marketing Specialist"
        required
        note="What kind of roles are you looking for?"
      />
      <Input
        label="Years of experience"
        name="max_years_of_experience"
        value={values.max_years_of_experience}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={errors.max_years_of_experience}
        touched={touched.max_years_of_experience}
        required
      />
    </>
  );
};

export default OnboardingRole;

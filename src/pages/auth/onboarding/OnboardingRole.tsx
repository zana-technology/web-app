import { Input, Select } from "@/components";
import { OnboardingFormValues, Option } from "@/types";
import { FormikProps } from "formik";

const OnboardingRole = ({
  formik,
  experienceLevels,
}: {
  formik: FormikProps<OnboardingFormValues>;
  experienceLevels: Option[];
}) => {
  const { values, touched, handleBlur, errors, handleChange, setFieldValue } =
    formik;
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
      <Select
        label="Years of experience"
        name="max_years_of_experience"
        value={values.max_years_of_experience.toString()}
        onBlur={handleBlur}
        errorMessage={errors.max_years_of_experience}
        touched={touched.max_years_of_experience}
        required
        onChange={(item) => {
          setFieldValue(`max_years_of_experience`, item.value);
        }}
        options={experienceLevels}
      />
    </>
  );
};

export default OnboardingRole;

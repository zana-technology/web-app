import { Input, Select } from "@/components";
import { OnboardingFormValues, Option } from "@/types";
import { FormikProps } from "formik";

const OnboardingRole = ({
  formik,
  experienceLevels,
}: {
  formik: FormikProps<OnboardingFormValues>;
  experienceLevels: Option<{ min: number; max: number }>[];
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
        name="experience_level"
        value={values.experience_level as string}
        onBlur={handleBlur}
        errorMessage={errors.experience_level}
        touched={touched.experience_level}
        required
        onChange={(item) => {
          setFieldValue(`experience_level`, item.value);
          setFieldValue(`min_years_of_experience`, item.min);
          setFieldValue(`max_years_of_experience`, item.max);
        }}
        options={experienceLevels}
      />
    </>
  );
};

export default OnboardingRole;

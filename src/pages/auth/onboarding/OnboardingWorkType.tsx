import { SelectButtonGroup } from "@/components/button";
import { OnboardingFormValues } from "@/types";
import { FormikProps } from "formik";

const OnboardingWorkType = ({
  formik,
}: {
  formik: FormikProps<OnboardingFormValues>;
}) => {
  const { values, touched, errors, setFieldValue } = formik;

  return (
    <>
      <SelectButtonGroup
        label="Work type (Select all that applies)"
        required
        value={values?.preferred_employment_types}
        name="preferred_employment_types"
        onChange={(item) => {
          setFieldValue("preferred_employment_types", item);
        }}
        errorMessage={errors.preferred_employment_types as string}
        touched={touched.preferred_employment_types}
        options={[
          { label: "Full Time", value: "full_time" },
          { label: "Part Time", value: "part_time" },
          { label: "Contract", value: "contract" },
          { label: "Internship", value: "internship" },
          { label: "Freelance", value: "freelance" },
        ]}
        multiple
      />
      <SelectButtonGroup
        label="Work mode (Select all that applies)"
        required
        value={values?.work_preferences}
        name="work_preferences"
        onChange={(item) => {
          setFieldValue("work_preferences", item);
        }}
        errorMessage={errors.work_preferences as string}
        touched={touched.work_preferences}
        options={[
          { label: "On-site", value: "on_site" },
          { label: "Remote", value: "remote_only" },
          { label: "Hybrid", value: "hybrid" },
        ]}
        multiple
        className="grid-cols-3"
      />
    </>
  );
};

export default OnboardingWorkType;

import { MultiSelect, Select } from "@/components";
import { loadCSVAsArray } from "@/libs";
import { OnboardingFormValues, Option } from "@/types";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";

const OnboardingRole = ({
  formik,
  experienceLevels,
}: {
  formik: FormikProps<OnboardingFormValues>;
  experienceLevels: Option<{ min: number; max: number }>[];
}) => {
  const { values, touched, handleBlur, errors, setFieldValue } = formik;

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    loadCSVAsArray("/data/job_titles_list.csv").then(setData);
  }, []);

  return (
    <>
      <MultiSelect
        label="Job title(s) or Role(s)*"
        name={`preferred_role`}
        values={values?.preferred_role
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item.length > 0)
          .map((item) => ({ label: item, value: item }))}
        onBlur={handleBlur}
        errorMessage={errors.preferred_role as string}
        touched={touched.preferred_role}
        onChange={(item) => {
          console.log("item", item);
          const values = item.map((x) => x.value).join(", ");
          setFieldValue("preferred_role", values);
        }}
        options={data?.map((x) => ({
          label: x.title,
          value: x.title,
        }))}
        placeholder="Select preferred job role"
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

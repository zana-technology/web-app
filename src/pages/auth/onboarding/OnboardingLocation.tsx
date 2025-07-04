import { Select } from "@/components";
import { SelectButtonGroup } from "@/components/button";
import { CandidateProfile, Option } from "@/types";
import { FormikProps } from "formik";

const OnboardingLocation = ({
  formik,
  countryOptions,
}: {
  formik: FormikProps<CandidateProfile>;
  countryOptions: Option[];
}) => {
  const { values, touched, handleBlur, errors, handleChange, setFieldValue } =
    formik;

  return (
    <>
      <Select
        label="Location"
        name={`current_location`}
        value={values?.current_location as string}
        onBlur={handleBlur}
        errorMessage={errors.current_location}
        touched={touched.current_location}
        onChange={(item) => {
          setFieldValue("current_location", item.value);
        }}
        options={countryOptions}
        required
      />

      <SelectButtonGroup
        label="Do you require visa sponsorship ?"
        required
        value={values?.needs_visa_sponsorship ? "YES" : "NO"}
        name="needs_visa_sponsorship"
        onChange={(item) => {
          console.log(item);
          setFieldValue(
            "needs_visa_sponsorship",
            item === "YES" ? true : false
          );
        }}
        options={[
          { label: "Yes", value: "YES" },
          { label: "No", value: "NO" },
        ]}
      />
    </>
  );
};

export default OnboardingLocation;

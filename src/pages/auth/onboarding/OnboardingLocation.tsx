import { MultiSelect, Select } from "@/components";
import { SelectButtonGroup } from "@/components/button";
import { OnboardingFormValues, Option } from "@/types";
import { FormikProps } from "formik";

const OnboardingLocation = ({
  formik,
  countryOptions,
  visaRegionOptions,
}: {
  formik: FormikProps<OnboardingFormValues>;
  countryOptions: Option[];
  visaRegionOptions: Option[];
}) => {
  const { values, touched, handleBlur, errors, setFieldValue } = formik;

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
        errorMessage={errors.needs_visa_sponsorship as string}
        touched={touched.needs_visa_sponsorship}
        options={[
          { label: "Yes", value: "YES" },
          { label: "No", value: "NO" },
        ]}
      />
      <MultiSelect
        label="Regions you need visa"
        name={`visa_regions`}
        values={values?.visa_regions.map((x) => ({
          label: x,
          value: x,
        }))}
        onBlur={handleBlur}
        errorMessage={errors.visa_regions as string}
        touched={touched.visa_regions}
        onChange={(item) => {
          const values = item.map((x) => x.value);
          setFieldValue("visa_regions", values);
        }}
        options={visaRegionOptions}
        required
      />
    </>
  );
};

export default OnboardingLocation;

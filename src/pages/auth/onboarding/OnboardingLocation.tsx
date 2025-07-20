import { Checkbox, MultiSelect, Select } from "@/components";
import { OnboardingFormValues, Option } from "@/types";
import { FormikProps } from "formik";

const OnboardingLocation = ({
  formik,
  countryOptions,
}: {
  formik: FormikProps<OnboardingFormValues>;
  countryOptions: Option[];
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
      <MultiSelect
        label="Countries of interest (max of 5 selection)"
        name={`preferred_work_regions`}
        values={values?.preferred_work_regions.map((x) => ({
          label: x,
          value: x,
        }))}
        onBlur={handleBlur}
        errorMessage={errors.preferred_work_regions as string}
        touched={touched.preferred_work_regions}
        onChange={(item) => {
          const values = item.map((x) => x.value);
          setFieldValue("preferred_work_regions", values);
        }}
        options={countryOptions}
        placeholder="Select preferred locations to work"
        required
        max={5}
      />

      {values?.preferred_work_regions?.length > 0 && (
        <div>
          <p className="text-sm mb-2">Mark the countries you need visa sponsorship *</p>
          <div className="flex flex-col gap-2.5 border border-zana-grey-300 rounded-lg p-3">
            {values?.preferred_work_regions?.map((x, i) => (
              <Checkbox
                key={i}
                id={`visa_regions-${x}`}
                name={`visa_regions`}
                title={x}
                checked={values?.visa_regions.includes(x)}
                onChange={() => {
                  const previous = values?.visa_regions;

                  let newRegions = [];

                  if (previous?.includes(x)) {
                    newRegions = previous.filter((region) => region !== x);
                  } else {
                    newRegions = [...previous, x];
                  }
                  setFieldValue("visa_regions", newRegions);
                }}
                variant="alt"
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default OnboardingLocation;

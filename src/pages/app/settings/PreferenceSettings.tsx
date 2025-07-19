import { Button, Checkbox, MultiSelect, PageLoader, Text } from "@/components";
import { twMerge } from "tailwind-merge";
import { usePreferenceSettings } from "./logic";
import { countriesAndStates } from "@/libs";

const PreferenceSettings = () => {
  const { isLoading, formik } = usePreferenceSettings();

  const {
    values,
    touched,
    handleBlur,
    errors,
    handleSubmit,
    isSubmitting,
    isValid,
    dirty,
    setFieldValue,
  } = formik;

  const countryOptions = countriesAndStates?.map((x) => ({
    label: x.name,
    value: x.name,
  }));

  const borderInfo = "w-full p-4 rounded-xl border border-zana-grey-300 grid sm:grid-cols-2 gap-4";
  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : (
        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* <div className={twMerge(borderInfo)}>
            <Text
              label="Auto apply"
              value="Allow Zana apply to job that matches your profile automatically."
              variant="switch"
            />
            <div className="flex items-center gap-4">
              <Checkbox
                id={`auto_apply_enabled_true`}
                name={`auto_apply_enabled`}
                title={"Yes"}
                checked={values?.auto_apply_enabled}
                onChange={() => setFieldValue("auto_apply_enabled", true)}
                variant="alt"
                className="border border-zana-grey-300 p-2.5 min-w-fit rounded-lg"
              />

              <Checkbox
                id={`auto_apply_enabled_false`}
                name={`auto_apply_enabled`}
                title={"No"}
                checked={!values?.auto_apply_enabled}
                onChange={() => setFieldValue("auto_apply_enabled", false)}
                variant="alt"
                className="border border-zana-grey-300 p-2.5 min-w-fit rounded-lg"
              />
            </div>
          </div> */}
          <div className={twMerge(borderInfo)}>
            <Text
              label="Work type"
              value="What type of job are you interested in?"
              variant="switch"
            />
            <MultiSelect
              name={`preferred_employment_types`}
              values={values?.preferred_employment_types.map((x) => ({
                label: x,
                value: x,
              }))}
              onBlur={handleBlur}
              errorMessage={errors.preferred_employment_types as string}
              touched={touched.preferred_employment_types}
              onChange={(item) => {
                const values = item.map((x) => x.value);
                setFieldValue("preferred_employment_types", values);
              }}
              options={[
                { label: "Full Time", value: "full_time" },
                { label: "Part Time", value: "part_time" },
                { label: "Contract", value: "contract" },
                { label: "Internship", value: "internship" },
                { label: "Freelance", value: "freelance" },
              ]}
              placeholder="Select preferred job types"
            />
          </div>
          <div className={twMerge(borderInfo)}>
            <Text
              label="Work location"
              value="Which countries would you like to work in?"
              variant="switch"
            />
            <MultiSelect
              name={`preferred_work_regions`}
              values={values?.preferred_work_regions.map((x) => ({
                label: x,
                value: x,
              }))}
              onBlur={handleBlur}
              errorMessage={errors.preferred_work_regions as string}
              touched={touched.preferred_work_regions}
              onChange={(item) => {
                const workRegions = item.map((x) => x.value);

                const filterVisaRegions = () => {
                  if (values?.visa_regions?.length > 0) {
                    return values?.visa_regions.filter((country) => workRegions.includes(country));
                  }

                  return [];
                };
                setFieldValue("preferred_work_regions", workRegions);
                setFieldValue("visa_regions", filterVisaRegions());
              }}
              options={countryOptions}
              placeholder="Select preferred locations to work"
            />
          </div>
          <div className={twMerge(borderInfo)}>
            <Text
              label="Visa sponsorship"
              value="Select the countries do you need visa sponsorship"
              variant="switch"
            />
            <div className="flex flex-col gap-2.5">
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
          {dirty && (
            <div className="sm:flex w-full justify-end gap-8 mt-5">
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
      )}
    </>
  );
};

export default PreferenceSettings;

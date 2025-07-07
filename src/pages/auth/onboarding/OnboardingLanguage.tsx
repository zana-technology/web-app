import { Select } from "@/components";
import { OnboardingFormValues, Option } from "@/types";
import { FormikProps } from "formik";
import { TbUsers } from "react-icons/tb";

const OnboardingLanguage = ({
  formik,
  workingLanguageOptions,
  ethnicityOptions,
  genderOptions,
  disabilityStatusOptions,
}: {
  formik: FormikProps<OnboardingFormValues>;
  workingLanguageOptions: Option[];
  ethnicityOptions: Option[];
  genderOptions: Option[];
  disabilityStatusOptions: Option[];
}) => {
  const { values, touched, handleBlur, errors, setFieldValue } = formik;

  return (
    <>
      <Select
        label="Preferred Working Language (optional)"
        name={`preferred_language`}
        value={values?.preferred_language as string}
        onBlur={handleBlur}
        errorMessage={errors.preferred_language}
        touched={touched.preferred_language}
        onChange={(item) => {
          setFieldValue("preferred_language", item.value);
          const languages = [
            {
              language: item.value,
              proficiency: "Native",
            },
          ];
          setFieldValue("languages", languages);
        }}
        options={workingLanguageOptions}
        note="This helps us find jobs that match your language skills and show roles in companies where your language is valued."
      />
      <div className="border border-zana-grey-300 bg-zana-grey-500 px-5 py-6 rounded-lg flex flex-col gap-3">
        <div className="flex items-center">
          <TbUsers size={24} />
          <p className="text-xl font-medium">Optional Diversity Information</p>
        </div>
        <p>
          Help Zana personalise your experience and connect you with inclusive
          employers. Your information is private and used only with your
          consent.
        </p>
        <Select
          label="Race/Ethnicity"
          name={`ethnicity`}
          value={values?.ethnicity as string}
          onBlur={handleBlur}
          errorMessage={errors.ethnicity}
          touched={touched.ethnicity}
          onChange={(item) => {
            setFieldValue("ethnicity", item.value);
          }}
          options={ethnicityOptions}
        />
        <Select
          label="Gender"
          name={`gender`}
          value={values?.gender as string}
          onBlur={handleBlur}
          errorMessage={errors.gender}
          touched={touched.gender}
          onChange={(item) => {
            setFieldValue("gender", item.value);
          }}
          options={genderOptions}
        />
        <Select
          label="Disability status"
          name={`disability_status`}
          value={values?.disability_status as string}
          onBlur={handleBlur}
          errorMessage={errors.disability_status}
          touched={touched.disability_status}
          onChange={(item) => {
            setFieldValue("disability_status", item.value);
          }}
          options={disabilityStatusOptions}
        />
      </div>
    </>
  );
};

export default OnboardingLanguage;

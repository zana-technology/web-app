import { userIcon } from "@/assets";
import { Input, MultiSelect, PhoneInput, ProfileSection, Text } from "@/components";
import { loadCSVAsArray } from "@/libs";
import { OnboardingProfileFormValues, Option, ShowFormState } from "@/types";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";

interface PersonalInfoProps {
  personalInformation: Option[];
  formik: FormikProps<OnboardingProfileFormValues>;
  showForm: ShowFormState;
  showFormHandler: (obj: Partial<ShowFormState>) => void;
}

const PersonalInfo = ({
  personalInformation,
  formik,
  showForm,
  showFormHandler,
}: PersonalInfoProps) => {
  const {
    values,
    errors,
    setFieldValue,
    handleChange,
    handleBlur,
    touched,
    isSubmitting,
    handleSubmit,
  } = formik;

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    loadCSVAsArray("/data/job_titles_list.csv").then(setData);
  }, []);

  return (
    <ProfileSection
      section={{
        title: "Personal information",
        icon: userIcon,
      }}
      button={{
        title: showForm?.personalInfo ? "Done editing" : "Edit",
        icon: showForm?.personalInfo ? <BsCheck size={24} /> : <MdOutlineEdit />,
        onClick: () => {
          if (!showForm?.personalInfo) {
            showFormHandler({ personalInfo: true });
          } else {
            handleSubmit();
          }
        },
        type: showForm?.personalInfo ? "submit" : "button",
        loading: showForm?.personalInfo ? isSubmitting : false,
      }}
    >
      {showForm?.personalInfo ? (
        <div className="flex flex-col w-full gap-6">
          <Input
            label="Full name"
            name="full_name"
            value={values.full_name}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.full_name}
            touched={touched.full_name}
            placeholder="e.g Kesiena Omonigho, Samson "
          />
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
          <Input
            label="Email address"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.email}
            touched={touched.email}
          />
          <PhoneInput
            label="Phone number"
            name={`phone_number`}
            value={values?.phone_number as string}
            onChange={(value) => {
              setFieldValue(`phone_number`, value);
            }}
            onBlur={handleBlur}
            errorMessage={errors.phone_number}
            touched={touched?.phone_number}
            defaultCountry={"US"}
          />
          <Input
            label="Location"
            name="current_location"
            value={values.current_location}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.current_location}
            touched={touched.current_location}
          />
          <Input
            label="LinkedIn"
            name="linkedin_url"
            value={values.linkedin_url}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.linkedin_url}
            touched={touched.linkedin_url}
          />
          <Input
            label="Portfolio"
            name="portfolio_url"
            value={values.portfolio_url}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.portfolio_url}
            touched={touched.portfolio_url}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {personalInformation?.map((x, i) => (
            <Text key={i} label={x.label} value={x.value} />
          ))}
        </div>
      )}
    </ProfileSection>
  );
};

export default PersonalInfo;

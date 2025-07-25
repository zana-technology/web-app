import { userIcon } from "@/assets";
import { Input, PhoneInput, ProfileSection, Text } from "@/components";
import { OnboardingProfileFormValues, Option, ShowFormState } from "@/types";
import { FormikProps } from "formik";
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

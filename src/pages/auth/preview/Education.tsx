import { graduationHatIcon } from "@/assets";
import { ProfileSection } from "@/components";
import { PreviewChildProps } from "@/types";
import { BsCheck } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";

const Education = ({ profile, formik, showForm, showFormHandler }: PreviewChildProps) => {
  const {
    values,
    errors,
    setFieldValue,
    handleBlur,
    touched,
    isSubmitting,
    handleSubmit,
    handleChange,
  } = formik;

  return (
    <ProfileSection
      section={{
        title: "Education",
        icon: graduationHatIcon,
      }}
      button={{
        title: showForm?.education ? "Save" : "Add education",
        icon: showForm?.education ? <BsCheck size={24} /> : <IoMdAdd />,
        onClick: () => {
          if (!showForm?.education) {
            showFormHandler({ education: true });
          } else {
            handleSubmit();
          }
        },
        loading: isSubmitting,
      }}
    >
      <p className="w-full">{profile?.professional_summary ?? "Work Experience not yet added"}</p>
    </ProfileSection>
  );
};

export default Education;

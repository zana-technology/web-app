import { fileIcon } from "@/assets";
import { ProfileSection } from "@/components";
import TextArea from "@/components/input/TextArea";
import { PreviewChildProps } from "@/types";
import { BsCheck } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";

const ProfessionalSummary = ({ profile, formik, showForm, showFormHandler }: PreviewChildProps) => {
  const { values, errors, handleChange, handleBlur, touched, isSubmitting, handleSubmit } = formik;

  return (
    <ProfileSection
      section={{
        title: "Professional Summary ",
        icon: fileIcon,
      }}
      button={{
        title: showForm?.professionalSummary ? "Done editing" : "Edit",
        icon: showForm?.professionalSummary ? <BsCheck size={24} /> : <MdOutlineEdit />,
        onClick: () => {
          if (!showForm?.professionalSummary) {
            showFormHandler({ professionalSummary: true });
          } else {
            handleSubmit();
          }
        },
        loading: isSubmitting,
      }}
    >
      {showForm?.professionalSummary ? (
        <TextArea
          label="Professional Summary"
          name="professional_summary"
          value={values?.professional_summary as string}
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={errors.professional_summary}
          touched={touched.professional_summary}
        />
      ) : (
        <p className="w-full">
          {profile?.professional_summary ?? "Professional summary not yet added"}
        </p>
      )}
    </ProfileSection>
  );
};

export default ProfessionalSummary;

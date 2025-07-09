import { graduationHatIcon } from "@/assets";
import { PageTitle, ProfileSection } from "@/components";
import { useProfilePreview } from "./logic";
import { IoMdAdd } from "react-icons/io";
import { FormikProvider } from "formik";
import PersonalInfo from "./PersonalInfo";
import Skills from "./Skills";
import { CandidateProfileDto } from "@/types";
import Languages from "./Languages";
import ProfessionalSummary from "./ProfessionalSummary";
import WorkExperience from "./WorkExperience";
import Education from "./Education";

const ProfilePreview = () => {
  const { isLoading, profile, personalInformation, formik, showForm, showFormHandler } =
    useProfilePreview();

  const {
    values,
    errors,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    isSubmitting,
  } = formik;

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="w-full px-5 py-7 bg-zana-color-100 border border-zana-color-300 rounded-2xl">
        <PageTitle
          title="Profile Preview"
          subtitle="Review and edit where needed, the information extracted from your CV"
        />
      </div>
      <FormikProvider value={formik}>
        <form className="flex flex-col w-full gap-8" onSubmit={handleSubmit}>
          <PersonalInfo
            personalInformation={personalInformation}
            formik={formik}
            showForm={showForm}
            showFormHandler={showFormHandler}
          />
          <Skills
            profile={profile as CandidateProfileDto}
            formik={formik}
            showForm={showForm}
            showFormHandler={showFormHandler}
          />
          <Languages
            profile={profile as CandidateProfileDto}
            formik={formik}
            showForm={showForm}
            showFormHandler={showFormHandler}
          />
          <ProfessionalSummary
            profile={profile as CandidateProfileDto}
            formik={formik}
            showForm={showForm}
            showFormHandler={showFormHandler}
          />
          <WorkExperience
            profile={profile as CandidateProfileDto}
            formik={formik}
            showForm={showForm}
            showFormHandler={showFormHandler}
          />
          <Education
            profile={profile as CandidateProfileDto}
            formik={formik}
            showForm={showForm}
            showFormHandler={showFormHandler}
          />
        </form>
      </FormikProvider>

      <ProfileSection
        section={{
          title: "Certifications",
          icon: graduationHatIcon,
        }}
        button={{
          title: "Add certification",
          icon: <IoMdAdd />,
        }}
      >
        <p className="w-full">{profile?.professional_summary ?? "Work Experience not yet added"}</p>
      </ProfileSection>
    </div>
  );
};

export default ProfilePreview;

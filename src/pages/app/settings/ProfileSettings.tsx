import { PageLoader } from "@/components";
import Certifications from "@/pages/auth/preview/Certifications";
import Education from "@/pages/auth/preview/Education";
import Languages from "@/pages/auth/preview/Languages";
import { useProfilePreview } from "@/pages/auth/preview/logic";
import PersonalInfo from "@/pages/auth/preview/PersonalInfo";
import ProfessionalSummary from "@/pages/auth/preview/ProfessionalSummary";
import Skills from "@/pages/auth/preview/Skills";
import WorkExperience from "@/pages/auth/preview/WorkExperience";
import { CandidateProfileDto } from "@/types";
import { FormikProvider } from "formik";

const ProfileSettings = () => {
  const {
    isLoading,
    profile,
    personalInformation,
    formik,
    showForm,
    showFormHandler,
    // goBack
  } = useProfilePreview();

  //   const { handleSubmit, isValid, dirty, isSubmitting, setFieldValue } = formik;

  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : (
        <FormikProvider value={formik}>
          <form className="flex flex-col w-full gap-8">
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
            <Certifications
              profile={profile as CandidateProfileDto}
              formik={formik}
              showForm={showForm}
              showFormHandler={showFormHandler}
            />
            {/* <div className="flex items-center gap-4">
              <Button
                title="Back"
                showArrow={true}
                iconPosition="left"
                onClick={goBack}
                variant="outlined"
              />
              <Button
                title="Complete Setup"
                fullWidth
                type="submit"
                loading={isSubmitting}
                showArrow={true}
                disabled={!(isValid && dirty)}
                onClick={() => {
                  setFieldValue("completed", true);
                  handleSubmit();
                }}
              />
            </div> */}
          </form>
        </FormikProvider>
      )}
    </>
  );
};

export default ProfileSettings;

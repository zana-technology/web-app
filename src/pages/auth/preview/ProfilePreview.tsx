import { Button, PageLoader, PageTitle } from "@/components";
import { useProfilePreview } from "./logic";
import { FormikProvider } from "formik";
import PersonalInfo from "./PersonalInfo";
import Skills from "./Skills";
import { CandidateProfileDto } from "@/types";
import Languages from "./Languages";
import ProfessionalSummary from "./ProfessionalSummary";
import WorkExperience from "./WorkExperience";
import Education from "./Education";
import Certifications from "./Certifications";

const ProfilePreview = () => {
  const { isLoading, profile, personalInformation, formik, showForm, showFormHandler, goBack } =
    useProfilePreview();

  const { handleSubmit, isValid, dirty, isSubmitting, setFieldValue, errors } = formik;

  console.log("errors", errors);
  return (
    <div className="flex flex-col w-full gap-8">
      <div className="w-full px-5 py-7 bg-zana-color-100 border border-zana-color-300 rounded-2xl">
        <PageTitle
          title="Profile Preview"
          subtitle="Review and edit where needed, the information extracted from your CV"
        />
      </div>
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
            <div className="flex items-center gap-4">
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
            </div>
          </form>
        </FormikProvider>
      )}
    </div>
  );
};

export default ProfilePreview;

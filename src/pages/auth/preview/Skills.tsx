import { codepenIcon } from "@/assets";
import { ProfileSection, Taginput } from "@/components";
import { CandidateProfileDto, OnboardingProfileFormValues, ShowFormState } from "@/types";
import { FormikProps } from "formik";
import { BsCheck } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";

interface SkillsProps {
  profile: CandidateProfileDto;
  formik: FormikProps<OnboardingProfileFormValues>;
  showForm: ShowFormState;
  showFormHandler: (obj: Partial<ShowFormState>) => void;
}

const Skills = ({ profile, formik, showForm, showFormHandler }: SkillsProps) => {
  const { values, errors, setFieldValue, handleBlur, touched, isSubmitting, handleSubmit } = formik;

  return (
    <ProfileSection
      section={{
        title: "Skills",
        icon: codepenIcon,
      }}
      button={{
        title: showForm?.skills ? "Done editing" : "Add skills",
        icon: showForm?.skills ? <BsCheck size={24} /> : <IoMdAdd />,
        onClick: () => {
          if (!showForm?.skills) {
            showFormHandler({ skills: true });
          } else {
            handleSubmit();
          }
        },
        loading: isSubmitting,
      }}
    >
      {showForm?.skills ? (
        <Taginput
          tags={values.skills as string[]}
          setTags={(item) => {
            setFieldValue("skills", item);
          }}
          name="skills"
          onBlur={handleBlur}
          errorMessage={errors.skills as string}
          touched={touched.skills}
          placeholder="Enter Skill"
          // suggestionData={collectionSuggestion}
        />
      ) : (
        <div className="flex items-center gap-4 flex-wrap">
          {profile?.skills && profile?.skills?.length > 0 ? (
            <>
              {profile?.skills?.map((x, i) => (
                <div
                  key={i}
                  className="h-10 flex items-center text-sm bg-zana-primary-light text-zana-primary-normal px-3 py-2 rounded-full"
                >
                  {x}
                </div>
              ))}
            </>
          ) : (
            "Skills not yet added"
          )}
        </div>
      )}
    </ProfileSection>
  );
};

export default Skills;

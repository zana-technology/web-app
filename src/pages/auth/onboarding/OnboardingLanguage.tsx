import { CandidateProfile } from "@/types";
import { FormikProps } from "formik";

const OnboardingLanguage = ({
  formik,
}: {
  formik: FormikProps<CandidateProfile>;
}) => {
  const { values, touched, handleBlur, errors, handleChange } = formik;

  return <div>OnboardingLanguage</div>;
};

export default OnboardingLanguage;

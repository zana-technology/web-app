import { CandidateProfile } from "@/types";
import { FormikProps } from "formik";

const OnboardingAccountSetup = ({
  formik,
}: {
  formik: FormikProps<CandidateProfile>;
}) => {
  const { values, touched, handleBlur, errors, handleChange } = formik;

  return <div>OnboardingAccountSetup</div>;
};

export default OnboardingAccountSetup;

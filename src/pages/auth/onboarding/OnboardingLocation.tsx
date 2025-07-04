import { CandidateProfile } from "@/types";
import { FormikProps } from "formik";

const OnboardingLocation = ({
  formik,
}: {
  formik: FormikProps<CandidateProfile>;
}) => {
  const { values, touched, handleBlur, errors, handleChange } = formik;

  return <div>OnboardingLocation</div>;
};

export default OnboardingLocation;

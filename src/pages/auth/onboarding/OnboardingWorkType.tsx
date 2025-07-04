import { CandidateProfile } from "@/types";
import { FormikProps } from "formik";

const OnboardingWorkType = ({
  formik,
}: {
  formik: FormikProps<CandidateProfile>;
}) => {
  const { values, touched, handleBlur, errors, handleChange } = formik;

  return <div>OnboardingWorkType</div>;
};

export default OnboardingWorkType;

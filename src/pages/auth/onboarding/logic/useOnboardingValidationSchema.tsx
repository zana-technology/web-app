import { useSearchParams } from "react-router-dom";
import * as yup from "yup";

const useOnboardingValidationSchema = () => {
  const [searchParams] = useSearchParams();

  const currentStep = parseInt(searchParams.get("step") as string) || 2;

  const step2ValidationShema = yup.object().shape({
    preferred_role: yup.string().required("Preferred role is required"),
    experience_level: yup.string().required("Experience level is required"),
    min_years_of_experience: yup.number(),
    max_years_of_experience: yup.number().min(1, "Max Years of experience cannot be less than 1"),
  });

  const step3ValidationShema = yup.object().shape({
    current_location: yup.string().required("Current Location is required"),
    needs_visa_sponsorship: yup.bool(),
    visa_regions: yup.array(),
  });

  const step4ValidationShema = yup.object().shape({
    preferred_employment_types: yup
      .array()
      .required("Select work type")
      .min(1, "Select at least 1 work type"),
    work_preferences: yup
      .array()
      .required("Select work mode")
      .min(1, "Select at least 1 work mode"),
  });

  const step5ValidationShema = yup.object().shape({
    preferred_language: yup.string().optional(),
  });

  const step6ValidationShema = yup.object().shape({
    full_name: yup
      .string()
      .trim()
      .required("Full name is required")
      .min(3, "Full name must be at least 3 characters")
      .test(
        "is-full-name",
        "Please enter your full name (first and last)",
        (value) => !!value && value.trim().split(" ").length >= 2
      ),

    phone_number: yup.string().required("Phone number is required"),
    portfolio_url: yup.string().url("Enter a valid url starting with http:// or https://"),
    resume: yup.array().required("CV/Resume is required").min(1, "CV/Resume is required"),
  });

  const validationSchema = () => {
    switch (currentStep) {
      case 2:
        return step2ValidationShema;
      case 3:
        return step3ValidationShema;
      case 4:
        return step4ValidationShema;
      case 5:
        return step5ValidationShema;
      case 6:
        return step6ValidationShema;
      default:
        return step2ValidationShema;
    }
  };
  return { validationSchema };
};

export default useOnboardingValidationSchema;

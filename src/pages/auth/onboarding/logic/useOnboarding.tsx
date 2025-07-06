import { useNavigate, useSearchParams } from "react-router-dom";
import OnboardingRole from "../OnboardingRole";
import { useFormik } from "formik";
import { OnboardingFormValues } from "@/types";
import OnboardingLocation from "../OnboardingLocation";
import OnboardingWorkType from "../OnboardingWorkType";
import OnboardingLanguage from "../OnboardingLanguage";
import OnboardingAccountSetup from "../OnboardingAccountSetup";
import { routes } from "@/router";
import { authApi, countriesAndStates, removeEmptyKeys } from "@/libs";
import useOnboardingValidationSchema from "./useOnboardingValidationSchema";

export const useOnboarding = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentStep = parseInt(searchParams.get("step") as string) || 2;

  const renderAuthHeader = () => {
    switch (currentStep) {
      case 2:
        return {
          title: "What role are you looking for?",
          subTitle: "Tell us about your dream job",
        };
      case 3:
        return {
          title: "Where are you currently located?",
          subTitle: "Choose your location and visa need",
        };
      case 4:
        return {
          title: "What type of work suits you?",
          subTitle: "Select your preferred work arrangements",
        };
      case 5:
        return {
          title: "Language & Personal Info",
          subTitle: "Help us personalise your experience (optional)",
        };
      case 6:
        return {
          title: "Create your account",
          subTitle: "Almost done! Let’s set up your profile",
        };
      default:
        return {
          title: "What role are you looking for?",
          subTitle: "Tell us about your dream job",
        };
    }
  };

  const initialValues: OnboardingFormValues = {
    //STEP2
    preferred_role: "",
    experience_level: "",
    min_years_of_experience: 0,
    max_years_of_experience: 0,

    //STEP3
    current_location: "",
    needs_visa_sponsorship: false,
    visa_regions: [],

    //STEP4
    preferred_employment_types: [],
    work_preferences: [],

    //STEP5
    ethnicity: "",
    preferred_language: "",
    languages: [],
    gender: "",
    disability_status: null,

    //STEP6
    full_name: "",
    portfolio_url: "",
    resume: [],

    //NOT USED
    // avatar_url: "",
    // phone_number: "",
    // platform_email: "",
    // skills: [],
    // professional_summary: "",
    // linkedin_url: "",
    // github_url: "",
    // min_salary_expectation: 0,
    // max_salary_expectation: 0,
    // preferred_currency: "",
    // auto_apply_enabled: false,
    // extras: {},
    // work_experiences: [
    //   {
    //     company_name: "",
    //     job_title: "",
    //     location: "",
    //     description: "",
    //     start_date: "",
    //     end_date: "",
    //     is_current: false,
    //     extras: {},
    //   },
    // ],
    // educational_qualifications: [
    //   {
    //     institution_name: "",
    //     location: "",
    //     degree: "",
    //     field_of_study: "",
    //     description: "",
    //     grade: "",
    //     start_date: "",
    //     end_date: "",
    //     extras: {},
    //   },
    // ],
    // certifications: [
    //   {
    //     name: "",
    //     issuing_organization: "",
    //     issue_date: "",
    //     expiration_date: null,
    //     credential_id: "",
    //     credential_url: "",
    //     extras: {},
    //   },
    // ],
  };

  const { validationSchema } = useOnboardingValidationSchema();

  const formik = useFormik<OnboardingFormValues>({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      if (currentStep < 6) {
        return navigate(`${routes.auth.onboarding}?step=${currentStep + 1}`);
      }

      const payload = { ...values };

      delete payload?.resume;

      removeEmptyKeys(payload);

      const { success } = await authApi.onboarding(payload);

      if (success) {
        navigate(routes.auth.preview);
      }
    },
  });

  const experienceLevels = [
    { label: "Entry Level (0–2 years)", value: "entry", min: 0, max: 2 },
    { label: "Mid Level (3–5 years)", value: "mid", min: 3, max: 5 },
    { label: "Senior Level (6–10 years)", value: "senior", min: 6, max: 10 },
    { label: "Lead/Principal (10+ years)", value: "lead", min: 11, max: 25 },
  ];

  const countryOptions = countriesAndStates?.map((x) => ({
    label: x.name,
    value: x.name,
  }));
  const visaRegionOptions = ["Africa", "Europe", "Asia"]?.map((x) => ({
    label: x,
    value: x,
  }));

  const workingLanguageOptions = [
    { label: "English", value: "english" },
    { label: "Spanish", value: "spanish" },
    { label: "French", value: "french" },
    { label: "German", value: "german" },
    { label: "Mandarin Chinese", value: "mandarin" },
    { label: "Arabic", value: "arabic" },
    { label: "Portuguese", value: "portuguese" },
    { label: "Hindi", value: "hindi" },
    { label: "Swahili", value: "swahili" },
    { label: "Other", value: "other" },
  ];

  const ethnicityOptions = [
    { label: "Black or African Descent", value: "black" },
    { label: "White", value: "white" },
    { label: "Hispanic or Latino", value: "hispanic" },
    { label: "Asian", value: "asian" },
    { label: "Middle Eastern or North African", value: "mena" },
    { label: "Indigenous or Native Peoples", value: "indigenous" },
    { label: "Mixed or Multiple Ethnic Groups", value: "mixed" },
    { label: "Other", value: "other" },
    { label: "Prefer not to say", value: "prefer_not_to_say" },
  ];

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Non-binary", value: "non_binary" },
    { label: "Transgender", value: "transgender" },
    { label: "Prefer not to say", value: "prefer_not_to_say" },
    { label: "Other", value: "other" },
  ];

  const disabilityStatusOptions = [
    { label: "Yes, I have a disability", value: "yes" },
    { label: "No, I do not have a disability", value: "no" },
    { label: "Prefer not to say", value: "prefer_not_to_say" },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 2:
        return (
          <OnboardingRole formik={formik} experienceLevels={experienceLevels} />
        );
      case 3:
        return (
          <OnboardingLocation
            formik={formik}
            countryOptions={countryOptions}
            visaRegionOptions={visaRegionOptions}
          />
        );
      case 4:
        return <OnboardingWorkType formik={formik} />;
      case 5:
        return (
          <OnboardingLanguage
            formik={formik}
            workingLanguageOptions={workingLanguageOptions}
            ethnicityOptions={ethnicityOptions}
            genderOptions={genderOptions}
            disabilityStatusOptions={disabilityStatusOptions}
          />
        );
      case 6:
        return <OnboardingAccountSetup formik={formik} />;
      default:
        return (
          <OnboardingRole formik={formik} experienceLevels={experienceLevels} />
        );
    }
  };

  const goBack = () => {
    if (currentStep > 2) {
      return navigate(`${routes.auth.onboarding}?step=${currentStep - 1}`);
    }
  };

  return {
    renderStep,
    currentStep,
    formik,
    renderAuthHeader,
    navigate,
    goBack,
  };
};

export default useOnboarding;

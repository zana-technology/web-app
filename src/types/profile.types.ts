import { FormikProps } from "formik";

export interface WorkExperience {
  company_name: string;
  job_title: string;
  location: string;
  description: string;
  start_date: string;
  end_date: string;
  is_current: boolean | null;
  extras: {
    [key: string]: unknown;
  };
}

export interface Education {
  institution_name: string;
  location: string;
  degree: string;
  field_of_study: string;
  description: string;
  grade: string;
  completion_year: number | null;
  extras: {
    [key: string]: unknown;
  };
}

export interface Certification {
  name: string;
  issuing_organization: string;
  issue_date: string;
  expiration_date: string | null;
  credential_id: string;
  credential_url: string;
  extras: {
    [key: string]: unknown;
  };
}

export interface Languages {
  language: string;
  proficiency: string;
}

export type OnboardingFormValues = {
  preferred_role: string;
  experience_level?: string;
  min_years_of_experience: number;
  max_years_of_experience: number;
  current_location: string;
  needs_visa_sponsorship: boolean;
  visa_regions: string[];
  preferred_employment_types: string[];
  work_preferences: string[];
  ethnicity: string;
  preferred_language: string;
  languages: Languages[];
  gender: string;
  disability_status: string | null;
  full_name: string;
  portfolio_url: string;
  resume?: File[];
};

export type OnboardingProfileFormValues = {
  full_name: string;
  platform_email: string;
  phone_number: string;
  current_location: string;
  linkedin_url: string;
  portfolio_url: string;
  skills: string[];
  languages: Languages[];
  professional_summary: string;
  work_experiences: WorkExperience[];
  educational_qualifications: Education[];
  certifications: Certification[];
  completed?: boolean;
};

export type SettingsPreference = {
  auto_apply_enabled: boolean;
  preferred_employment_types: string[];
  preferred_locations: string[];
  visa_regions: string[];
};

export type CandidateProfileDto = OnboardingFormValues &
  OnboardingProfileFormValues &
  SettingsPreference & {
    avatar_url: string;
    github_url: string;
    min_salary_expectation: number;
    max_salary_expectation: number;
    preferred_currency: string;
    extras: {
      [key: string]: unknown;
    };
    uid: string;
  };
export interface UploadedResume {
  file_name: string;
  file_type: string;
  is_primary: boolean;
  file_url: string;
}

export interface ShowFormState {
  personalInfo: boolean;
  skills: boolean;
  languages: boolean;
  professionalSummary: boolean;
  workExperience: boolean;
  education: boolean;
  certifications: boolean;
  // Add more if needed
}

export interface PreviewChildProps {
  profile: CandidateProfileDto;
  formik: FormikProps<OnboardingProfileFormValues>;
  showForm: ShowFormState;
  showFormHandler: (obj: Partial<ShowFormState>) => void;
}

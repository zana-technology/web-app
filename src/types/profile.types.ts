export interface WorkExperience {
  company_name: string;
  job_title: string;
  location: string;
  description: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
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
  start_date: string;
  end_date: string;
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

export interface CandidateProfile {
  full_name: string;
  avatar_url: string;
  phone_number: string;
  platform_email: string;
  ethnicity: string;
  gender: string;
  disability_status: string | null;
  languages: {
    [language: string]: {
      proficiency: string;
    };
  };
  skills: string[];
  professional_summary: string;
  preferred_role: string;
  min_years_of_experience: number;
  max_years_of_experience: number;
  current_location: string;
  needs_visa_sponsorship: boolean;
  visa_regions: string[];
  linkedin_url: string;
  github_url: string;
  portfolio_url: string;
  preferred_employment_types: string[];
  work_preferences: string[];
  min_salary_expectation: number;
  max_salary_expectation: number;
  preferred_currency: string;
  auto_apply_enabled: boolean;
  extras: {
    [key: string]: unknown;
  };
  work_experiences: WorkExperience[];
  educational_qualifications: Education[];
  certifications: Certification[];
  preferred_language: string;
}

export type OnboardingFormValues = CandidateProfile & {
  resume?: File[];
  experience_level?: string;
};

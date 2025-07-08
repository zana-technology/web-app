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

export interface Languages {
  language: string;
  proficiency: string;
}

export type CandidateProfileDto = OnboardingFormValues & {
  avatar_url: string;
  phone_number: string;
  platform_email: string;
  skills: string[];
  professional_summary: string;
  linkedin_url: string;
  github_url: string;
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
};

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
export interface UploadedResume {
  file_name: string;
  file_type: string;
  is_primary: boolean;
  file_url: string;
}

export interface ApplicationData {
  application_email: string;
  status: string;
  applied_at: string; // ISO date string
  next_step: string;
  next_step_due_at: string;
  uid: string;
  resume: {
    file_name: string;
    file_type: string;
    is_primary: boolean;
    file_url: string;
    uid: string;
    version: number;
    created_at: string;
    updated_at: string;
  };
  cover_letter_url: string;
  ats_score: number;
  ats_stats: {
    strengths: string[];
    improvements: string[];
  };

  //I added
  company: string;
  companyLogo: string;
  job_role: string;
}

export interface ApplicationsResponse {
  data: ApplicationData[];
  count: number;
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
}

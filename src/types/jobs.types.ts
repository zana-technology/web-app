export interface JobData {
  title: string;
  description: string;
  company: string;
  location: string;
  job_url: string;
  site: string;
  salary_range: [number | null, number | null];
  salary_currency: string;
  is_remote: boolean;
  visa_sponsored: boolean;
  date_posted: string;
  keywords: string[];
  uid: string;
  applicants: number;
  views: number;
  applied: boolean;
  saved: boolean;
  created_at: string;
  updated_at: string;
  match_score: number;

  // I added
  companyLogo?: string;
  status?: JobStatus;
  mode: JobMode;
  perks?: string[];
  requirements?: string[];
  niceToHaves?: string[];
  companyInfo?: {
    industry?: string;
    size?: string;
    founded?: number;
    website?: string;
    about?: string;
  };
  matchBreakdown?: { label: string; value: number }[];
}

export enum JobStatus {
  AutoApplied = "AUTO-APPLIED",
  NeedsReview = "NEEDS-REVIEW",
}
export enum JobMode {
  Remote = "Remote",
  Hybrid = "Hybrid",
  Onsite = "Onsite",
}

//company logo missing
//% match missing
//

export interface JobResponse {
  data: JobData[];
  count: number;
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
}

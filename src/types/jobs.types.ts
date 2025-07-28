export interface JobData {
  title: string;
  description: string;
  company: Company;
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
  benefits: string[];
  required_qualifications?: string[];
  preferred_qualifications?: string[];

  // I added
  companyLogo?: string;
  status?: JobStatus;
  mode: JobMode;
  // requirements?: string[];
  // niceToHaves?: string[];
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

export interface Company {
  name: string;
  size: string | null;
  industry: string | null;
  website: string | null;
  description: string | null;
  logo_url: string | null;
  year_founded: number | null;
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

export interface CreditInfo {
  credits_purchased: number;
  credits_used: number;
  credits_remaining: number;
  purchased_at: string | null; // ISO date string or null if not purchased
}

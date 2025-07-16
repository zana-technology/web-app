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
  is_remote?: boolean;
  salary_range?: [number | null, number | null];
  salary_currency?: string;
  location?: string;
  description: string;
  perks?: string[];
  requirements?: string[];
}

export interface ApplicationsResponse {
  data: ApplicationData[];
  count: number;
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
}

export interface JobCorrespondence {
  company: string;
  jobTitle: string;
  applicationId: string;
  thread: EmailMessage[];
}

export interface EmailMessage {
  subject: string;
  body: string;
  sentAt: string; // ISO string
  isRead: boolean;
  from: "me" | "company";
  status?: "sent" | "replied" | "interview scheduled" | "rejected" | "offer" | "follow-up";
}

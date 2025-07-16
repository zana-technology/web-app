import {
  companyLogo,
  fileColoredIcon,
  fileGreyIcon,
  fileIcon,
  mailColoredIcon,
  mailIcon,
  overviewColoredIcon,
  overviewIcon,
  presentationColoredIcon,
  presentationIcon,
} from "@/assets";
import { routes } from "@/router";
import { ApplicationData } from "@/types";
import { useNavigate, useSearchParams } from "react-router-dom";
import ApplicationsOverview from "../ApplicationsOverview";
import ApplicationsEmails from "../ApplicationsEmails";
import ApplicationDocuments from "../ApplicationDocuments";
import ApplicationATS from "../ApplicationATS";

export const useSingleApplication = () => {
  const navigate = useNavigate();

  const backToApplications = () => {
    navigate(routes.app.applications);
  };

  const application: ApplicationData = {
    application_email: "jane.doe@example.com",
    status: "Offer-Received",
    applied_at: "2025-07-10T14:23:00.000Z",
    next_step: "Technical Interview",
    next_step_due_at: "2025-07-20T10:00:00.000Z",
    uid: "app_123456789",
    resume: {
      file_name: "JaneDoe_Resume.pdf",
      file_type: "application/pdf",
      is_primary: true,
      file_url: "https://example.com/resumes/janedoe_resume.pdf",
      uid: "resume_987654321",
      version: 2,
      created_at: "2025-07-05T08:30:00.000Z",
      updated_at: "2025-07-10T12:45:00.000Z",
    },
    cover_letter_url: "https://example.com/coverletters/janedoe_coverletter.pdf",
    ats_score: 82,
    ats_stats: {
      strengths: ["Relevant experience", "Strong keywords match", "Clear formatting"],
      improvements: ["Add measurable achievements", "Customize summary"],
    },
    company: "TechNova Inc.",
    companyLogo: companyLogo,
    job_role: "Frontend Engineer",
    is_remote: true,
    salary_range: [80000, 100000],
    salary_currency: "USD",
    location: "San Francisco, CA",
    description:
      "We’re looking for a talented and detail-oriented Frontend Engineer to join our growing product team. You’ll be responsible for building beautiful and scalable web interfaces that improve the experience for thousands of users.",
    requirements: [
      "3+ years of experience in frontend development.",
      "Proficiency in HTML, CSS, JavaScript, and TypeScript.",
      "Strong experience with React and modern frontend tools (e.g., Vite, Webpack, Tailwind).",
      "Familiarity with REST APIs and state management libraries (e.g., Redux, Zustand, or MobX).",
      "Experience with version control systems like Git.",
      "A good eye for design and attention to detail.",
    ],
    perks: [
      "Competitive salary",
      "Flexible working hours",
      "Remote-first culture",
      "Learning & development budget",
      "Health insurance",
    ],
  };

  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab");

  const tabMenu = [
    {
      label: "Overview",
      value: "overview",
      icon: currentTab === "overview" || !currentTab ? overviewColoredIcon : overviewIcon,
    },
    {
      label: "Emails",
      value: "emails",
      icon: currentTab === "emails" ? mailColoredIcon : mailIcon,
    },
    {
      label: "Documents",
      value: "documents",
      icon: currentTab === "documents" ? fileColoredIcon : fileGreyIcon,
    },
    {
      label: "ATS Analysis",
      value: "ats-analysis",
      icon: currentTab === "ats-analysis" ? presentationColoredIcon : presentationIcon,
    },
  ];

  const renderTab = () => {
    switch (currentTab) {
      case tabMenu[0]?.value:
        return <ApplicationsOverview application={application} />;
      case tabMenu[1]?.value:
        return <ApplicationsEmails application={application} />;
      case tabMenu[2]?.value:
        return <ApplicationDocuments application={application} />;
      case tabMenu[3]?.value:
        return <ApplicationATS application={application} />;

      default:
        return <ApplicationsOverview application={application} />;
    }
  };
  return { backToApplications, application, tabMenu, renderTab };
};

export default useSingleApplication;

import { Button, PageLoader, PageTitle, SearchInput, TabMenu } from "@/components";
import { useFeed } from "./logic";
import { JobData } from "@/types";
import { CiFilter } from "react-icons/ci";
import Jobs from "./Jobs";
import { companyLogo } from "@/assets";

const Feed = () => {
  const { isLoading, tabMenu, setSearchQuery } = useFeed();

  const dummyJobs: JobData[] = [
    {
      title: "Frontend Developer",
      description: "Build UI components using React and Tailwind.",
      company: "TechNova",
      location: "Remote",
      job_url: "https://example.com/jobs/1",
      site: "Indeed",
      salary_range: [50000, 70000],
      salary_currency: "USD",
      is_remote: true,
      visa_sponsored: false,
      date_posted: "2025-07-10T10:00:00.000Z",
      keywords: ["React", "Tailwind", "JavaScript"],
      uid: "job_001",
      applicants: 42,
      views: 180,
      applied: false,
      saved: true,
      created_at: "2025-07-10T10:00:00.000Z",
      updated_at: "2025-07-10T10:00:00.000Z",
      companyLogo: companyLogo,
      match: 87,
    },
    {
      title: "Backend Engineer",
      description: "Work with Node.js and PostgreSQL to build APIs.",
      company: "Backendify",
      location: "New York, NY",
      job_url: "https://example.com/jobs/2",
      site: "LinkedIn",
      salary_range: [60000, 90000],
      salary_currency: "USD",
      is_remote: false,
      visa_sponsored: true,
      date_posted: "2025-07-11T09:30:00.000Z",
      keywords: ["Node.js", "PostgreSQL", "API"],
      uid: "job_002",
      applicants: 30,
      views: 150,
      applied: true,
      saved: false,
      created_at: "2025-07-11T09:30:00.000Z",
      updated_at: "2025-07-11T09:30:00.000Z",
      companyLogo: companyLogo,
      match: 56,
    },
    {
      title: "Fullstack Developer",
      description: "Join a fast-paced startup building a SaaS product.",
      company: "ScaleUp Labs",
      location: "San Francisco, CA",
      job_url: "https://example.com/jobs/3",
      site: "AngelList",
      salary_range: [null, null],
      salary_currency: "USD",
      is_remote: true,
      visa_sponsored: false,
      date_posted: "2025-07-09T12:15:00.000Z",
      keywords: ["React", "Node.js", "Startup"],
      uid: "job_003",
      applicants: 15,
      views: 90,
      applied: false,
      saved: false,
      created_at: "2025-07-09T12:15:00.000Z",
      updated_at: "2025-07-09T12:15:00.000Z",
      companyLogo: companyLogo,
      match: 87,
    },
    {
      title: "DevOps Engineer",
      description: "Manage cloud infrastructure and CI/CD pipelines.",
      company: "InfraCloud",
      location: "Austin, TX",
      job_url: "https://example.com/jobs/4",
      site: "Stack Overflow",
      salary_range: [85000, 110000],
      salary_currency: "USD",
      is_remote: false,
      visa_sponsored: true,
      date_posted: "2025-07-08T08:00:00.000Z",
      keywords: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      uid: "job_004",
      applicants: 22,
      views: 200,
      applied: false,
      saved: true,
      created_at: "2025-07-08T08:00:00.000Z",
      updated_at: "2025-07-08T08:00:00.000Z",
      companyLogo: companyLogo,
      match: 66,
    },
    {
      title: "UI/UX Designer",
      description: "Design intuitive interfaces for mobile and web apps.",
      company: "DesignFlow",
      location: "Remote",
      job_url: "https://example.com/jobs/5",
      site: "Dribbble",
      salary_range: [40000, 60000],
      salary_currency: "USD",
      is_remote: true,
      visa_sponsored: false,
      date_posted: "2025-07-07T15:45:00.000Z",
      keywords: ["Figma", "UX", "Design Systems"],
      uid: "job_005",
      applicants: 50,
      views: 250,
      applied: true,
      saved: true,
      created_at: "2025-07-07T15:45:00.000Z",
      updated_at: "2025-07-07T15:45:00.000Z",
      companyLogo: companyLogo,
      match: 87,
    },
  ];

  return (
    <div>
      <PageTitle title="Job Feed" subtitle="Personalised job recommendations powered by Zana" />

      <div className="mt-8">
        {isLoading ? (
          <PageLoader />
        ) : (
          <>
            <div className="w-full flex flex-col-reverse lg:flex-row  justify-between lg:items-center gap-6">
              <TabMenu menu={tabMenu} />
              <div className="flex gap-4">
                <SearchInput
                  placeholder="Search jobs, companies, or locations "
                  setSearchQuery={setSearchQuery}
                />
                <Button
                  title="Filter"
                  icon={<CiFilter className="text-dark-700" size={20} />}
                  iconPosition="left"
                  variant="outlined"
                />
              </div>
            </div>
            <Jobs jobs={dummyJobs} />
          </>
        )}
      </div>
    </div>
  );
};

export default Feed;

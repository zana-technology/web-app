import {
  companyColoredIcon,
  companyIcon,
  companyLogo,
  overviewColoredIcon,
  overviewIcon,
  requirementsColoredIcon,
  requirementsIcon,
  zanaInsightsColoredIcon,
  zanaInsightsIcon,
} from "@/assets";
import { jobsApi } from "@/libs";
import { useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import JobDetailsOverview from "../JobDetailsOverview";
import { JobData, JobMode, JobStatus } from "@/types";
import JobDetailsRequirements from "../JobDetailsRequirements";
import ZanaInsights from "../ZanaInsights";
import JobDetailsCompanyInfo from "../JobDetailsCompanyInfo";
import { routes } from "@/router";

export const useJobDetails = () => {
  const { id } = useParams();

  const { isLoading, data } = jobsApi.useGetSingleJob({ id: id as string });

  const job = useMemo(() => {
    if (data?.success) {
      const jobDetails = data?.data;
      return {
        ...jobDetails,
        status: jobDetails?.applied ? JobStatus.AutoApplied : JobStatus.NeedsReview,
        mode: jobDetails?.is_remote ? JobMode.Remote : JobMode.Onsite,
      };
    }
  }, [data]) as JobData;

  const [searchParams] = useSearchParams();

  const currentTab = searchParams.get("tab");

  const tabMenu = [
    {
      label: "Overview",
      value: "overview",
      icon: currentTab === "overview" || !currentTab ? overviewColoredIcon : overviewIcon,
    },
    {
      label: "Requirements",
      value: "requirements",
      icon: currentTab === "requirements" ? requirementsColoredIcon : requirementsIcon,
    },
    {
      label: "Company",
      value: "company",
      icon: currentTab === "requirements" ? companyColoredIcon : companyIcon,
    },
    {
      label: "Zana Insights",
      value: "zana-insights",
      icon: currentTab === "requirements" ? zanaInsightsColoredIcon : zanaInsightsIcon,
    },
  ];

  const navigate = useNavigate();

  // const job: JobData = {
  //   title: "Frontend Developer",
  //   description:
  //     "We're looking for a Senior Frontend Developer to join our dynamic team and help build the next generation of our web applications. You'll work closely with our design and backend teams to create exceptional user experiences. In this role, you'll be responsible for developing and maintaining our React-based applications, implementing responsive designs, and ensuring optimal performance across all devices. You'll also mentor junior developers and contribute to our technical architecture decisions. We offer a collaborative environment where innovation is encouraged, and your ideas can make a real impact. Our tech stack includes React, TypeScript, Node.js, and modern CSS frameworks. We're committed to using the latest technologies and best practices.",
  //   company: "TechNova",
  //   location: "Ottawa, Canada",
  //   job_url: "https://example.com/jobs/1",
  //   site: "Indeed",
  //   salary_range: [50000, 70000],
  //   salary_currency: "USD",
  //   is_remote: true,
  //   visa_sponsored: true,
  //   date_posted: "2025-07-10T10:00:00.000Z",
  //   keywords: ["React", "Tailwind", "JavaScript"],
  //   uid: "job_001",
  //   applicants: 42,
  //   views: 180,
  //   applied: false,
  //   saved: true,
  //   created_at: "2025-07-10T10:00:00.000Z",
  //   updated_at: "2025-07-10T10:00:00.000Z",
  //   companyLogo: companyLogo,
  //   match: 70,
  //   status: JobStatus.AutoApplied,
  //   mode: JobMode.Remote,
  //   perks: [
  //     "Competitive salary and equity package",
  //     "Comprehensive health, dental, and vision insurance",
  //     "401(k) with company matching",
  //     "Flexible work arrangements and remote options",
  //     "Professional development budget ($3,000/year)",
  //     "Unlimited PTO policy",
  //     "Top-tier equipment and home office setup",
  //   ],
  //   requirements: [
  //     "5+ years of frontend development experience",
  //     "Expert knowledge of React and TypeScript",
  //     "Experience with modern CSS frameworks (Tailwind, Styled Components)",
  //     "Proficiency in Node.js and Express",
  //     "Experience with state management (Redux, Zustand)",
  //     "Knowledge of testing frameworks (Jest, Cypress)",
  //     "Understanding of CI/CD pipelines",
  //   ],
  //   niceToHaves: [
  //     "Experience with Next.js or similar frameworks",
  //     "Knowledge of GraphQL",
  //     "DevOps experience with AWS or similar platforms",
  //     "Top-tier equipment and home office setup",
  //   ],
  //   companyInfo: {
  //     industry: "Software Development",
  //     size: "51–200 employees",
  //     founded: 2018,
  //     website: "https://examplecompany.com",
  //     about:
  //       "TechNova is a leading software company that builds innovative solutions for modern businesses. We're passionate about creating technology that makes work more efficient and enjoyable.",
  //   },
  //   matchBreakdown: [
  //     { label: "You have 3+ years experience in frontend development", value: 20 },
  //     { label: "Your have experience in modern CSS frameworks", value: 10 },
  //     { label: "Your CV was a solid match", value: 30 },
  //     { label: "Your CV was a solid match", value: 10 },
  //   ],
  // };

  const renderTab = () => {
    switch (currentTab) {
      case tabMenu[0]?.value:
        return <JobDetailsOverview job={job} />;
      case tabMenu[1]?.value:
        return <JobDetailsRequirements job={job} />;
      case tabMenu[2]?.value:
        return <JobDetailsCompanyInfo job={job} />;
      case tabMenu[3]?.value:
        return <ZanaInsights job={job} />;

      default:
        return <JobDetailsOverview job={job} />;
    }
  };

  const backToFeed = () => {
    navigate(routes.app.feed);
  };

  return { tabMenu, job, renderTab, isLoading, backToFeed };
};

export default useJobDetails;

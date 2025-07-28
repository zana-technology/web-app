import {
  companyColoredIcon,
  companyIcon,
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
        companyLogo: jobDetails?.company?.logo_url ?? "",
        status: jobDetails?.applied ? JobStatus.AutoApplied : JobStatus.NeedsReview,
        mode: jobDetails?.is_remote ? JobMode.Remote : JobMode.Onsite,
      };
    }
  }, [data]) as JobData;

  const [searchParams] = useSearchParams();

  const currentTab = searchParams.get("tab");

  const fromTab = searchParams.get("from");

  const tabMenu = useMemo(() => {
    return [
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
        icon: currentTab === "company" ? companyColoredIcon : companyIcon,
      },
      ...(job?.applied
        ? [
            {
              label: "Zana Insights",
              value: "zana-insights",
              icon: currentTab === "zana-insights" ? zanaInsightsColoredIcon : zanaInsightsIcon,
            },
          ]
        : []),
    ];
  }, [currentTab, job?.applied]);
  const navigate = useNavigate();

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
    navigate(`${routes.app.feed}?tab=${fromTab}`);
  };

  return { tabMenu, job, renderTab, isLoading, backToFeed };
};

export default useJobDetails;

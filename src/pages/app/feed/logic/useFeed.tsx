import { companyLogo } from "@/assets";
import { jobsApi } from "@/libs";
import { JobMode, JobStatus } from "@/types";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useFeed = () => {
  const {
    isLoading,
    data,
    setSearchQuery,
    setFilters,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = jobsApi.useGetJobs();

  const jobs = useMemo(() => {
    if (!data?.pages[0]?.success) return [];
    return data.pages.flatMap((page) =>
      page?.data?.data?.map((x) => ({
        ...x,
        companyLogo: x?.company?.logo_url ?? companyLogo,
        match_score: x?.match_score ?? 0,
        salary_currency: x?.salary_currency ?? "USD",
        status: x?.applied ? JobStatus.AutoApplied : JobStatus.NeedsReview,
        mode: x?.is_remote ? JobMode.Remote : JobMode.Onsite,
      }))
    );
  }, [data]);

  const tabMenu = [
    {
      label: "Auto-Applied",
      value: "applied",
    },
    { label: "All Jobs", value: "all" },
    {
      label: "To Review",
      value: "review",
    },
    {
      label: "Saved",
      value: "saved",
    },
  ];

  const [searchParams] = useSearchParams();

  const currentTab = searchParams.get("tab");

  useEffect(() => {
    if (currentTab === tabMenu[0]?.value) {
      setFilters({
        applied: true,
      });
    } else if (currentTab === tabMenu[2]?.value) {
      setFilters({
        applied: false,
      });
    } else if (currentTab === tabMenu[3]?.value) {
      setFilters({
        saved: true,
      });
    } else {
      setFilters({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  const renderEmptyText = () => {
    switch (currentTab) {
      case tabMenu[0]?.value:
        return {
          text: "Auto applying in progress",
          subText:
            "Zana is searching for the best jobs to apply for you. Hold tight and check back within 1 hour",
        };
      case tabMenu[1]?.value:
        return {
          text: "All Jobs matching your profile",
          subText:
            "Zana is searching for the best jobs for you. Hold tight and check back within 1 hour",
        };
      case tabMenu[2]?.value:
        return {
          text: "No Jobs needing Review",
          subText: "When you have jobs needing reviews, they will show here",
        };
      case tabMenu[3]?.value:
        return {
          text: "No saved jobs yet",
          subText: "When you save a job, they will show here",
        };

      default:
        return {
          text: "Auto applying in progress",
          subText:
            "Zana is searching for the best jobs to apply for you. Hold tight and check back within 1 hour",
        };
    }
  };

  return {
    isLoading,
    tabMenu,
    setSearchQuery,
    jobs,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    setFilters,
    currentTab,
    renderEmptyText,
  };
};

export default useFeed;

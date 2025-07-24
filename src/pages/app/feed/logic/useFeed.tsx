import { companyLogo } from "@/assets";
import { jobsApi } from "@/libs";
import { JobMode, JobStatus } from "@/types";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useFeed = () => {
  const { isLoading, data, setCurrentPage, currentPage, setSearchQuery, setFilters } =
    jobsApi.useGetJobs();

  const jobs = useMemo(() => {
    if (data?.success) {
      return data?.data?.data?.map((x) => ({
        ...x,
        companyLogo: x?.company?.logo_url ?? companyLogo,
        match_score: x?.match_score ?? 0,
        salary_currency: x?.salary_currency ?? "USD",
        status: x?.applied ? JobStatus.AutoApplied : JobStatus.NeedsReview,
        mode: x?.is_remote ? JobMode.Remote : JobMode.Onsite,
      }));
    }
  }, [data?.data, data?.success]);

  const meta = useMemo(() => {
    if (data?.success) {
      return {
        total: data?.data?.count,
        page: data?.data?.offset,
        limit: data?.data?.limit,
      };
    }
  }, [data]);

  const tabMenu = [
    { label: "All Jobs", value: "all" },
    {
      label: "Auto-Applied",
      value: "applied",
    },
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
    if (currentTab === tabMenu[1]?.value) {
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

  return {
    isLoading,
    tabMenu,
    setSearchQuery,
    jobs,
    meta,
    currentPage,
    setCurrentPage,
    setFilters,
    currentTab,
  };
};

export default useFeed;

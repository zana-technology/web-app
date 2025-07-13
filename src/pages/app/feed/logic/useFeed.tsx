import { jobsApi } from "@/libs";
import { useMemo } from "react";

export const useFeed = () => {
  const { isLoading, data, setCurrentPage, setSearchQuery } = jobsApi.useGetJobs();

  const jobs = useMemo(() => {
    if (data?.success) {
      return data?.data?.data;
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

  console.log("jobs", jobs);

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

  return { isLoading, tabMenu, setSearchQuery };
};

export default useFeed;

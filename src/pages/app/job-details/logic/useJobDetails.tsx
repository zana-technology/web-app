import { jobsApi } from "@/libs";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

export const useJobDetails = () => {
  const { id } = useParams();

  const { isLoading, data } = jobsApi.useGetSingleJob({ id: id as string });

  const jobDetails = useMemo(() => {
    if (data?.success) {
      return data?.data;
    }
  }, [data]);

  console.log("jobDetails", jobDetails);

  const tabMenu = [
    { label: "Overview", value: "overview" },
    {
      label: "Requirements",
      value: "requirements",
    },
    {
      label: "Company",
      value: "company",
    },
    {
      label: "Zana Insights",
      value: "zana-insights",
    },
  ];

  return { isLoading };
};

export default useJobDetails;

import { apiQueryKeys, useFetcher } from "../config";
import { JobData, JobResponse } from "@/types";
import { apiRoutes } from "../routes";

const useGetJobs = () => {
  return useFetcher<JobResponse>({
    queryKey: [apiQueryKeys.getJobs],
    url: apiRoutes.jobs.index,
    paginate: true,
    hasFilters: true,
  });
};
const useGetSingleJob = ({ id }: { id: string }) => {
  return useFetcher<JobData>({
    queryKey: [apiQueryKeys.getSingleJob],
    url: apiRoutes.jobs.single.replace("%id%", id),
  });
};

export const jobsApi = {
  useGetJobs,
  useGetSingleJob,
};

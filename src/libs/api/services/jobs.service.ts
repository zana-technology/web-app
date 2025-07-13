import { apiQueryKeys, useFetcher } from "../config";
import { JobResponse } from "@/types";
import { apiRoutes } from "../routes";

const useGetJobs = () => {
  return useFetcher<JobResponse>({
    queryKey: [apiQueryKeys.getProfile],
    url: apiRoutes.jobs.index,
    paginate: true,
    hasFilters: true,
  });
};

export const jobsApi = {
  useGetJobs,
};

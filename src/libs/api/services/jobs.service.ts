import { apiQueryKeys, apiRequest, useFetcher, useInfiniteFetcher } from "../config";
import { CreditInfo, JobData, JobResponse, SignupDto } from "@/types";
import { apiRoutes } from "../routes";

const useGetJobs = () => {
  return useInfiniteFetcher<JobResponse>({
    queryKey: [apiQueryKeys.getJobs],
    url: apiRoutes.jobs.index,
    hasFilters: true,
  });
};

const useGetSingleJob = ({ id }: { id: string }) => {
  return useFetcher<JobData>({
    queryKey: [apiQueryKeys.getSingleJob, id],
    url: apiRoutes.jobs.single.replace("%id%", id),
  });
};

const save = async (id: string) => {
  return await apiRequest<SignupDto>({
    url: apiRoutes.jobs.save.replace("%id%", id),
    method: "post",
  });
};

const useGetJobCredit = () => {
  return useFetcher<CreditInfo>({
    queryKey: [apiQueryKeys.getJobCredits],
    url: apiRoutes.jobs.credits,
  });
};

export const jobsApi = {
  useGetJobs,
  useGetSingleJob,
  save,
  useGetJobCredit,
};

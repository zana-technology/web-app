import { apiQueryKeys, apiRequest, useFetcher } from "../config";
import { JobData, JobResponse, SignupDto } from "@/types";
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

export const jobsApi = {
  useGetJobs,
  useGetSingleJob,
  save,
};

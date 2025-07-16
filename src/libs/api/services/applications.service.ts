import { ApplicationData, ApplicationsResponse } from "@/types";
import { apiQueryKeys, useFetcher } from "../config";
import { apiRoutes } from "../routes";

const useGetApplications = () => {
  return useFetcher<ApplicationsResponse>({
    queryKey: [apiQueryKeys.getSingleJob],
    url: apiRoutes.jobs.applications,
    paginate: true,
    hasFilters: true,
  });
};

const useGetSingleApplication = ({ id }: { id: string }) => {
  return useFetcher<ApplicationData>({
    queryKey: [apiQueryKeys.getSingleApplication],
    url: apiRoutes.jobs.singleApplication.replace("%id%", id),
  });
};

export const applicationsApi = {
  useGetApplications,
  useGetSingleApplication,
};

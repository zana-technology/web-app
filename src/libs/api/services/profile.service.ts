import { CandidateProfileDto, OnboardingProfileFormValues, UploadedResume } from "@/types";
import { apiQueryKeys, apiRequest, useFetcher } from "../config";
import { apiRoutes } from "../routes";

const updateProfile = async (payload: OnboardingProfileFormValues) => {
  return await apiRequest<CandidateProfileDto>({
    url: apiRoutes.profile.index,
    method: "patch",
    payload,
  });
};
const addResume = async (payload: UploadedResume) => {
  return await apiRequest<CandidateProfileDto>({
    url: apiRoutes.profile.resume,
    method: "post",
    payload,
  });
};

const useGetProfile = () => {
  return useFetcher<CandidateProfileDto>({
    queryKey: [apiQueryKeys.getProfile],
    url: apiRoutes.profile.index,
    triggerError: false,
    hasFilters: true,
  });
};

export const profileApi = {
  updateProfile,
  addResume,
  useGetProfile,
};

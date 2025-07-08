import { CandidateProfileDto, UploadedResume } from "@/types";
import { apiRequest } from "../config";
import { apiRoutes } from "../routes";

const updateProfile = async (payload: CandidateProfileDto) => {
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

export const profileApi = {
  updateProfile,
  addResume,
};

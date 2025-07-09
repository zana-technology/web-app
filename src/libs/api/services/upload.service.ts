import { UploadedResourceDto } from "@/types";
import { apiRequest } from "../config";
import { apiRoutes } from "../routes";

const upload = async (payload: FormData) => {
  return await apiRequest<UploadedResourceDto>({
    url: apiRoutes.upload.index,
    method: "post",
    payload,
    hasImageUpload: true,
  });
};

export const uploadApi = { upload };

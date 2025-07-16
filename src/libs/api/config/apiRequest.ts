/* eslint-disable @typescript-eslint/no-explicit-any */
import { Data, IApiResponseDTO, IErrorMessageDTO, Response } from "@/types";
import { constant } from "../../utils";
import client from "./client";
import config from "./config";
import { showToast } from "@/components";

type axiosMethod = "get" | "post" | "put" | "delete" | "patch";

interface Props {
  baseUrl?: string;
  url: string;
  method?: axiosMethod;
  hasImageUpload?: boolean;
  hasImageDownload?: boolean;
  payload?: Data;
  triggerError?: boolean;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
}

const apiRequest = async <T>({
  baseUrl = config.BASE_API_URL,
  url,
  method = "get",
  payload,
  hasImageUpload,
  hasImageDownload,
  onUploadProgress,
  onDownloadProgress,
  triggerError = true,
}: Props): Promise<Response<T>> => {
  try {
    let headers = {};
    if (hasImageUpload) {
      headers = {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data",
        "Cache-Control": "no-cache",
      };
    }
    if (hasImageDownload) {
      headers = {
        responseType: "blob",
      };
    }
    headers = {
      "Cache-Control": "no-cache",
    };

    const { data } = await client[method]<IApiResponseDTO<T>>(baseUrl + url, payload, {
      headers,
      timeout: 30000,
      onUploadProgress,
      onDownloadProgress,
    });

    return {
      success: true,
      data: data.data as T,
      title: data?.message,
      message: data?.detail,
      ...(data?.meta && { meta: data?.meta }),
    };
  } catch (error: any) {
    const { data } = (error.response || {}) as IErrorMessageDTO;

    if (error?.message === constant.tokenExpired) {
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
        showToast({
          message: "Your Session has expired. Login again to continue",
          variant: "error",
          title: "Session Expired",
        });
      }
      return {
        success: false,
        redirect: "/auth/login",
      };
    }

    const errorTitle = data?.message;
    const errorMessage = data?.detail ? data?.detail : "Something went wrong";

    if (triggerError) {
      showToast({
        message: errorMessage,
        variant: "error",
        title: errorTitle || "Error",
      });
    }

    return {
      success: false,
      errorMessage,
      errorTitle,
    };
  }
};

export { apiRequest };

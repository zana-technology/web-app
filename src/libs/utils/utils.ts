import { FileWithPreview, ResourceType, SignupDto } from "@/types";
import { jobsApi, uploadApi } from "../api";
import { queryClient } from "@/App";
import { showToast } from "@/components";
import { apiQueryKeys } from "../api/config";
import { routes } from "@/router";

export const capitalizeFirstLetter = function toTitleCase(str: string) {
  return str?.replace(/\w\S*/g, function (txt) {
    return txt?.charAt(0)?.toUpperCase() + txt?.substr(1)?.toLowerCase();
  });
};

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>[\]_\-+=;'/\\])[A-Za-z\d!@#$%^&*(),.?":{}|<>[\]_\-+=;'/\\]+$/;

export const phoneNumberRegex = /^[+0-9\s()-]{7,20}$/;

export const toSentenceCase = (key: string) => {
  if (!key) return "";

  const isSnake = key.includes("_");
  const isKebab = key.includes("-");
  const isCamelOrPascal = /[a-z][A-Z]/.test(key) || /^[A-Z][a-z]+/.test(key);

  let spaced = key;

  if (isSnake) {
    spaced = key.replace(/_/g, " ");
  } else if (isKebab) {
    spaced = key.replace(/-/g, " ");
  } else if (isCamelOrPascal) {
    spaced = key.replace(/([a-z])([A-Z])/g, "$1 $2");
  }

  const lower = spaced.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

export const hasTokenExpired = (dateString: string): boolean => {
  const expiryDate = new Date(dateString);
  const now = new Date();
  return expiryDate.getTime() <= now.getTime();
};

export const staleTimeMins = (minutes: number) => {
  return 1000 * 60 * minutes;
};

export const encodeQueryData = (
  query: Record<string, string | number | boolean | undefined | null>
): string => {
  const encodedQuery = Object.entries(query).map(([key, value]) => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(value ?? "")}`;
  });
  return encodedQuery.join("&");
};

export const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export const handleAuthSuccess = (authData: SignupDto) => {
  const expiresAt = new Date(authData.expires_at * 1000).toISOString();
  const refreshExpiresAt = new Date(Date.now() + SEVEN_DAYS_MS).toISOString();

  localStorage.setItem("access_token", authData.access_token);
  localStorage.setItem("refresh_token", authData.refresh_token);
  localStorage.setItem("token_expiry", expiresAt);
  localStorage.setItem("refresh_token_expiry", refreshExpiresAt);
};

export const handleUpload = async (files: File[], resourceType = ResourceType.Document) => {
  const results = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("resource", file); // Match backend's expected key
    formData.append("resource_type", resourceType);

    const { data, success, errorMessage } = await uploadApi.upload(formData);

    if (!success) {
      return { success: false, errorMessage };
    }

    results.push(data);
  }

  return { success: true, data: results };
};

const urlToFile = async (url: string, fileName: string): Promise<FileWithPreview> => {
  try {
    const response = await fetch(url, {
      mode: "no-cors", // Add no-cors mode to bypass CORS restrictions
    });

    const isVideo = url.toLowerCase().includes("video");

    const blob = await response.blob();
    const fileType = blob.type || isVideo ? "video/mp4" : "image/jpeg"; // Default to JPEG if type is missing

    // Create a File object
    const file = new File([blob], fileName, {
      type: fileType,
    }) as FileWithPreview;

    // Add additional properties
    file.preview = url;
    file.originalUrl = url;

    return file;
  } catch (error) {
    console.error("Error fetching image:", error);
    // Return a placeholder or handle error as needed
    throw new Error(`Failed to convert URL to file`);
  }
};

const urlToFile2 = async (url: string, fileName: string): Promise<FileWithPreview> => {
  try {
    const response = await fetch(url);

    const blob = await response.blob();
    const isVideo = url.toLowerCase().includes("video");
    const fileType = blob.type || (isVideo ? "video/mp4" : "image/jpeg");

    const file = new File([blob], fileName, { type: fileType }) as FileWithPreview;

    file.preview = url;
    file.originalUrl = url;

    return file;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw new Error("Failed to convert URL to file");
  }
};

export const convertUrlsToFiles = async (
  imageUrls: { url: string; fileName: string }[]
): Promise<FileWithPreview[]> => {
  return await Promise.all(imageUrls.map(({ url, fileName }) => urlToFile(url, fileName)));
};

export const removeEmptyKeys = (payload: Record<string, any>) => {
  for (const key in payload) {
    if (payload[key] && typeof payload[key] === "object") {
      // Skip Date objects and other special objects
      if (payload[key] instanceof Date) {
        continue;
      }

      // Recursively clean nested objects
      removeEmptyKeys(payload[key]);

      // Remove the object if it becomes empty after cleaning
      if (Object.keys(payload[key]).length === 0) {
        delete payload[key];
      }
    } else if (payload[key] === undefined || payload[key] === null || payload[key] === "") {
      delete payload[key];
    }
  }
};

export const refreshQuery = ({ queryKey }: { queryKey: string[] }) => {
  queryKey.forEach((key) => {
    queryClient.invalidateQueries({
      queryKey: [key],
    });
  });
};

export const generateStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
    case "not verified":
    case "interview scheduled":
      return "text-util-warning-700 bg-util-warning-50 border-util-warning-200";
    case "active":
    case "yes":
    case "success":
    case "successful":
    case "completed":
    case "confirmed":
    case "verified":
    case "approved":
    case "offer received":
      return "text-util-success-700 bg-util-success-50 border-util-success-200";
    case "failed":
    case "no":
    case "blocked":
    case "inactive":
    case "cancelled":
    case "rejected":
    case "out of stock":
    case "debit":
      return "text-util-error-700 bg-util-error-50 border-util-error-200";
    case "processing":
    case "ready to ship":
      return "text-blue-600 bg-blue-100";
    case "applied":
      return "text-util-indigo-700 bg-util-indigo-50 border-util-indigo-200";
    default:
      return "text-r-dark-2 bg-r-grey-2";
  }
};

export const currencyFormatter = ({
  amount,
  currency = "NGN",
  subUnit = false,
  compact = false,
  showFraction = true,
}: {
  amount: number;
  currency?: string;
  subUnit?: boolean;
  compact?: boolean;
  showFraction?: boolean;
}) => {
  const value = subUnit ? amount / 100 : amount;

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    notation: compact ? "compact" : "standard",
    compactDisplay: "short",
    maximumFractionDigits: showFraction ? 2 : 0,
    minimumFractionDigits: showFraction ? 2 : 0,
  }).format(value);
};

export function truncateText(text: string, maxLength: number) {
  return text.length > maxLength ? text.slice(0, maxLength).trimEnd() + "..." : text;
}

export const saveJob = async (id: string) => {
  const { success, message, title } = await jobsApi.save(id);

  if (success) {
    refreshQuery({ queryKey: [apiQueryKeys.getJobs, apiQueryKeys.getSingleJob] });
    showToast({
      title: title,
      message: message,
    });
  }
};

export const handleLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("token_expiry");
  localStorage.removeItem("refresh_token_expiry");
  window.location.href = routes.auth.login;
};

import { FileWithPreview, SignupDto } from "@/types";

export const capitalizeFirstLetter = function toTitleCase(str: string) {
  return str?.replace(/\w\S*/g, function (txt) {
    return txt?.charAt(0)?.toUpperCase() + txt?.substr(1)?.toLowerCase();
  });
};

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>[\]_\-+=;'/\\])[A-Za-z\d!@#$%^&*(),.?":{}|<>[\]_\-+=;'/\\]+$/;

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
  const expiresAt = new Date(Date.now() + SEVEN_DAYS_MS).toISOString();

  localStorage.setItem("access_token", authData.access_token);
  localStorage.setItem("refresh_token", authData.refresh_token);
  localStorage.setItem("token_expiry", expiresAt);
};

// export const handleImageUpload = async (files: File[], fileType?: string) => {
//   const results = [];

//   for (const file of files) {
//     const formData = new FormData();
//     formData.append('file', file);

//     const { data, success, errorMessage } = await uploadDocument(
//       formData,
//       fileType,
//     );

//     if (!success) {
//       return { success: false, errorMessage };
//     }

//     results.push(data);
//   }

//   return { success: true, data: results };
// };

const urlToFile = async (
  url: string,
  fileName: string
): Promise<FileWithPreview> => {
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

export const convertUrlsToFiles = async (
  imageUrls: { url: string; fileName: string }[]
): Promise<FileWithPreview[]> => {
  return await Promise.all(
    imageUrls.map(({ url, fileName }) => urlToFile(url, fileName))
  );
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
    } else if (
      payload[key] === undefined ||
      payload[key] === null ||
      payload[key] === ""
    ) {
      delete payload[key];
    }
  }
};

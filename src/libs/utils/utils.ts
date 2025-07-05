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

export const capitalizeFirstLetter = function toTitleCase(str: string) {
  return str?.replace(/\w\S*/g, function (txt) {
    return txt?.charAt(0)?.toUpperCase() + txt?.substr(1)?.toLowerCase();
  });
};

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>[\]_\-+=;'/\\])[A-Za-z\d!@#$%^&*(),.?":{}|<>[\]_\-+=;'/\\]+$/;

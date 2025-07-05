import { LoginFormValues, SignupFormValues } from "@/types";
import { apiRequest } from "../config";
import { apiRoutes } from "../routes";

const login = async (payload: LoginFormValues) => {
  return await apiRequest<LoginFormValues>({
    url: apiRoutes.auth.login,
    method: "post",
    payload,
  });
};

const signup = async (payload: SignupFormValues) => {
  return await apiRequest<SignupFormValues>({
    url: apiRoutes.auth.signup,
    method: "post",
    payload,
  });
};

const verifyEmail = async (payload: SignupFormValues) => {
  return await apiRequest<SignupFormValues>({
    url: apiRoutes.auth.verifyEmail,
    method: "post",
    payload,
  });
};

export const authApi = {
  login,
  signup,
  verifyEmail,
};

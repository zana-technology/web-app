import {
  CandidateProfileDto,
  LoginFormValues,
  OnboardingFormValues,
  SignupDto,
  SignupFormValues,
  VerifyEmailFormValues,
} from "@/types";
import { apiRequest } from "../config";
import { apiRoutes } from "../routes";

const login = async (payload: LoginFormValues) => {
  return await apiRequest<SignupDto>({
    url: apiRoutes.auth.login,
    method: "post",
    payload,
  });
};

const signup = async (payload: SignupFormValues) => {
  return await apiRequest<SignupDto>({
    url: apiRoutes.auth.signup,
    method: "post",
    payload,
  });
};

const verifyEmail = async (payload: VerifyEmailFormValues) => {
  return await apiRequest<VerifyEmailFormValues>({
    url: apiRoutes.auth.verifyEmail,
    method: "post",
    payload,
  });
};

const onboarding = async (payload: OnboardingFormValues) => {
  return await apiRequest<CandidateProfileDto>({
    url: apiRoutes.profile.index,
    method: "patch",
    payload,
  });
};

const resendVerificationEmail = async () => {
  return await apiRequest({
    url: apiRoutes.auth.resendVerificationEmail,
    method: "post",
  });
};

export const authApi = {
  login,
  signup,
  verifyEmail,
  onboarding,
  resendVerificationEmail,
};

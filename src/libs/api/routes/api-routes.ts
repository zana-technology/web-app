const serviceRoot = {
  auth: "/v1/auth",
  profile: "/v1/profile",
  upload: "/v1/uploads/users",
};

export const apiRoutes = {
  auth: {
    login: `${serviceRoot.auth}/signin`,
    signup: `${serviceRoot.auth}/signup`,
    verifyEmail: `${serviceRoot.auth}/verify-email`,
    resendVerificationEmail: `${serviceRoot.auth}/resend-verification-email`,
    refreshToken: `${serviceRoot.auth}/refresh-token`,
    logout: `${serviceRoot.auth}/logout`,
  },
  profile: {
    index: `${serviceRoot.profile}`,
    resume: `${serviceRoot.profile}/resume`,
  },
  upload: {
    index: `${serviceRoot.upload}`,
  },
};

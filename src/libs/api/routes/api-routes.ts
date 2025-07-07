const serviceRoot = {
  auth: "/v1/auth",
  profile: "/v1/profile",
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
  },
};

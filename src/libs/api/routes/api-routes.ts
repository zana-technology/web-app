const serviceRoot = {
  auth: "/v1/auth",
  profile: "/v1/profile",
  upload: "/v1/uploads/users",
  jobs: "/v1/jobs",
  subscription: "/v1/subscription",
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
  jobs: {
    index: `${serviceRoot.jobs}`,
    applications: `${serviceRoot.jobs}/applications`,
    singleApplication: `${serviceRoot.jobs}/applications/%id%`,
    single: `${serviceRoot.jobs}/%id%`,
    save: `${serviceRoot.jobs}/%id%/save-unsave`,
    credits: `${serviceRoot.jobs}/credits`,
  },
  subscription: {
    plan: `${serviceRoot.subscription}/%plan%`,
    status: `${serviceRoot.subscription}/status`,
  },
};

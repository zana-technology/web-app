export const routes = {
  home: "/",
  auth: {
    index: "/auth",
    login: "/auth/login",
    signup: "/auth/signup",
    verify: "/auth/verify/:id",
    onboarding: "/auth/onboarding",
    preview: "/auth/preview",
    complete: "/auth/complete",
    forgotPassword: "/auth/forgot-password",
  },
  app: {
    index: "/app",
    feed: "/app/feed",
    applications: "/app/applications",
    analytics: "/app/analytics",
    inbox: "/app/inbox",
    upskilling: "/app/upskilling",
    JobDetails: "/app/job/%id%",
  },
};

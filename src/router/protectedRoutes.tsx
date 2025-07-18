import { Applications, Feed, JobDetails, Settings, SingleApplication } from "@/pages";

const protectedRoutes = [
  {
    path: "feed",
    element: <Feed />,
  },
  {
    path: "job/:id",
    element: <JobDetails />,
  },
  {
    path: "applications",
    element: <Applications />,
  },
  {
    path: "applications/:id",
    element: <SingleApplication />,
  },
  {
    path: "settings",
    element: <Settings />,
  },
];

export default protectedRoutes;

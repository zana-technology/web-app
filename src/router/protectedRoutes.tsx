import { Applications, Feed, JobDetails, SingleApplication } from "@/pages";

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
];

export default protectedRoutes;

import { Feed } from "@/pages";
import { JobDetails } from "@/pages/app/job-details";

const protectedRoutes = [
  {
    path: "feed",
    element: <Feed />,
  },
  {
    path: "job/:id",
    element: <JobDetails />,
  },
];

export default protectedRoutes;

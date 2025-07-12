import { analyticsIcon, applicationIcon, feedIcon, mailIcon, starIcon } from "@/assets";
import { routes } from "@/router";

export const sidebarData = [
  {
    title: "Job Feed",
    icon: feedIcon,
    link: routes.app.feed,
  },
  {
    title: "Applications",
    icon: applicationIcon,
    link: routes.app.applications,
  },
  {
    title: "Analytics",
    icon: analyticsIcon,
    link: routes.app.analytics,
  },
  {
    title: "Inbox",
    icon: mailIcon,
    link: routes.app.inbox,
  },
  {
    title: "Zana Upskilling",
    icon: starIcon,
    link: routes.app.upskilling,
  },
];

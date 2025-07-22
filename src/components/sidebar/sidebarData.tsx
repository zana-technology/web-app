import {
  analyticsIcon,
  applicationIcon,
  feedIcon,
  filePolicyIcon,
  giftIcon,
  linkGreyIcon,
  mailIcon,
  settingsIcon,
  starIcon,
} from "@/assets";
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
    disabled: true,
  },
  {
    title: "Analytics",
    icon: analyticsIcon,
    link: routes.app.analytics,
    disabled: true,
  },
  {
    title: "Inbox",
    icon: mailIcon,
    link: routes.app.inbox,
    disabled: true,
  },
  {
    title: "Zana Upskilling",
    icon: starIcon,
    link: routes.app.upskilling,
    disabled: true,
  },
  {
    title: "Settings",
    icon: settingsIcon,
    link: routes.app.settings,
  },
];

export const sidebarExtra = [
  {
    title: "Home Page",
    icon: linkGreyIcon,
    link: routes.home,
    disabled: true,
  },
  {
    title: "Settings",
    icon: settingsIcon,
    link: routes.app.settings,
  },
  {
    title: "Referral",
    icon: giftIcon,
    link: routes.app.referral,
    disabled: true,
  },
  {
    title: "Policy",
    icon: filePolicyIcon,
    link: routes.policy,
    disabled: true,
  },
];

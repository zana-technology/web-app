import { useSearchParams } from "react-router-dom";
import ProfileSettings from "../ProfileSettings";
import ResumeSettings from "../ResumeSettings";
import PasswordSettings from "../PasswordSettings";
import PreferenceSettings from "../PreferenceSettings";
import ApperanceSettings from "../ApperanceSettings";
import BillingSettings from "../BillingSettings";

export const useSettings = () => {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab");

  const tabMenu = [
    { label: "Profile", value: "profile" },
    {
      label: "Resume / Cv",
      value: "resume",
    },
    {
      label: "Password",
      value: "password",
    },
    {
      label: "Preferences",
      value: "preferences",
    },
    // {
    //   label: "Appearance",
    //   value: "appearance",
    // },
    {
      label: "Billing",
      value: "billing",
    },
  ];

  const renderTab = () => {
    switch (currentTab) {
      case tabMenu[0]?.value:
        return <ProfileSettings />;
      case tabMenu[1]?.value:
        return <ResumeSettings />;
      case tabMenu[2]?.value:
        return <PasswordSettings />;
      case tabMenu[3]?.value:
        return <PreferenceSettings />;
      // case tabMenu[4]?.value:
      //   return <ApperanceSettings />;
      case tabMenu[4]?.value:
        return <BillingSettings />;

      default:
        return <ProfileSettings />;
    }
  };

  return { tabMenu, renderTab };
};

export default useSettings;

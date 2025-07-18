import { PageTitle, TabMenu } from "@/components";
import { useSettings } from "./logic";

const Settings = () => {
  const { tabMenu, renderTab } = useSettings();
  return (
    <>
      <PageTitle title="Settings" subtitle="Manage your account here" className="mb-10" />
      <TabMenu menu={tabMenu} />
      <div className="mt-6">{renderTab()}</div>
    </>
  );
};

export default Settings;

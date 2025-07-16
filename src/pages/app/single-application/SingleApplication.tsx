import { Button, TabMenu } from "@/components";
import { IoMdArrowBack } from "react-icons/io";
import { useSingleApplication } from "./logic";
import ApplicationHighlights from "./ApplicationHighlights";

const SingleApplication = () => {
  const { backToApplications, application, tabMenu, renderTab } = useSingleApplication();
  return (
    <>
      <Button
        title="Back"
        className="p-0 text-dark-400 mb-7"
        icon={<IoMdArrowBack size={20} />}
        iconPosition="left"
        variant="text"
        onClick={backToApplications}
      />
      <>
        <ApplicationHighlights application={application} />
        <TabMenu menu={tabMenu} />
        <div className="w-full mt-6">{renderTab()}</div>
      </>
    </>
  );
};

export default SingleApplication;

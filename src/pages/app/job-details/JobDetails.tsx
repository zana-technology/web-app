import { timeIcon } from "@/assets";
import { useJobDetails } from "./logic";
import { Button, PageLoader, TabMenu } from "@/components";
import { IoMdArrowBack } from "react-icons/io";
import JobDetailsCompany from "./JobDetailsCompany";
import JobDetailHighlights from "./JobDetailHighlights";
import moment from "moment";
import { constant, saveJob } from "@/libs";
import { FiBookmark } from "react-icons/fi";

const JobDetails = () => {
  const { tabMenu, job, renderTab, isLoading, backToFeed } = useJobDetails();
  return (
    <>
      <Button
        title="Back"
        className="p-0 text-dark-400 mb-7"
        icon={<IoMdArrowBack size={20} />}
        iconPosition="left"
        variant="text"
        onClick={backToFeed}
      />
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          <div className="w-full border border-zana-grey-300 px-4 md:px-5 py-4 rounded-xl md:rounded-2xl mb-16">
            <JobDetailsCompany job={job} />
            <JobDetailHighlights job={job} />
            <div className="flex justify-between mt-3 ">
              <div className="flex gap-1 items-center">
                <img src={timeIcon} alt="time" className="w-4 h-4" />
                <p className="text-util-grey-500">
                  {job?.date_posted ? moment(job?.date_posted).fromNow() : constant.notAdded}
                </p>
              </div>
              <Button
                title={job?.saved ? "Unsave" : "Save"}
                icon={<FiBookmark size={20} />}
                iconPosition="left"
                className={job?.saved ? "text-zana-primary-normal" : "text-dark-400"}
                variant="text"
                onClick={() => {
                  saveJob(job?.uid);
                }}
              />
            </div>
          </div>
          <TabMenu menu={tabMenu} />
          <div className="w-full mt-6">{renderTab()}</div>
        </>
      )}
    </>
  );
};

export default JobDetails;

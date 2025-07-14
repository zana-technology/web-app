import { bookmarkIcon, timeIcon } from "@/assets";
import { useJobDetails } from "./logic";
import { Button, TabMenu } from "@/components";
import { IoMdArrowBack } from "react-icons/io";
import JobDetailsCompany from "./JobDetailsCompany";
import JobDetailHighlights from "./JobDetailHighlights";
import moment from "moment";

const JobDetails = () => {
  const { tabMenu, job, renderTab } = useJobDetails();
  return (
    <>
      <Button
        title="Back"
        className="p-0 text-dark-400 mb-7"
        icon={<IoMdArrowBack size={20} />}
        iconPosition="left"
        variant="text"
      />
      <div className="w-full border border-zana-grey-300 px-4 md:px-5 py-4 rounded-xl md:rounded-2xl mb-16">
        <JobDetailsCompany job={job} />
        <JobDetailHighlights job={job} />
        <div className="flex justify-between mt-3 ">
          <div className="flex gap-1 items-center">
            <img src={timeIcon} alt="time" className="w-4 h-4" />
            <p className="text-util-grey-500">{moment(job.date_posted).fromNow()}</p>
          </div>
          <Button
            title="Save"
            icon={<img src={bookmarkIcon} alt="save" className="w-5" />}
            iconPosition="left"
            className=" text-dark-400"
            variant="text"
          />
        </div>
      </div>
      <TabMenu menu={tabMenu} />
      <div className="w-full mt-6">{renderTab()}</div>
    </>
  );
};

export default JobDetails;

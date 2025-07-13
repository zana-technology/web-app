import {
  appliedIcon,
  bookmarkIcon,
  companyLogo,
  needsReviewIcon,
  passportIcon,
  salaryIcon,
  timeIcon,
} from "@/assets";
import { useJobDetails } from "./logic";
import { JobData, JobMode, JobStatus } from "@/types";
import { Button, MatchPercentage, StatusTag } from "@/components";
import { IoMdArrowBack } from "react-icons/io";
import { toSentenceCase } from "@/libs";
import JobDetailsCompany from "./JobDetailsCompany";
import JobDetailHighlights from "./JobDetailHighlights";
import moment from "moment";

const JobDetails = () => {
  const job: JobData = {
    title: "Frontend Developer",
    description: "Build UI components using React and Tailwind.",
    company: "TechNova",
    location: "Ottawa, Canada",
    job_url: "https://example.com/jobs/1",
    site: "Indeed",
    salary_range: [50000, 70000],
    salary_currency: "USD",
    is_remote: true,
    visa_sponsored: true,
    date_posted: "2025-07-10T10:00:00.000Z",
    keywords: ["React", "Tailwind", "JavaScript"],
    uid: "job_001",
    applicants: 42,
    views: 180,
    applied: false,
    saved: true,
    created_at: "2025-07-10T10:00:00.000Z",
    updated_at: "2025-07-10T10:00:00.000Z",
    companyLogo: companyLogo,
    match: 70,
    status: JobStatus.AutoApplied,
    mode: JobMode.Remote,
  };
  //   useJobDetails();
  return (
    <>
      <Button
        title="Back"
        className="bg-transparent text-dark-400 mb-7"
        icon={<IoMdArrowBack size={20} />}
        iconPosition="left"
      />
      <div className="w-full border border-zana-grey-300 px-4 md:px-5 py-4 rounded-xl md:rounded-2xl">
        <JobDetailsCompany job={job} />
        <JobDetailHighlights job={job} />
        <div className="flex justify-between mt-3">
          <div className="flex gap-1 items-center">
            <img src={timeIcon} alt="time" className="w-4 h-4" />
            <p className="text-util-grey-500">{moment(job.date_posted).fromNow()}</p>
          </div>
          <Button
            title="Save"
            icon={<img src={bookmarkIcon} alt="save" className="w-5" />}
            iconPosition="left"
            className="bg-transparent text-dark-400 hover:bg-transparent"
          />
        </div>
      </div>
    </>
  );
};

export default JobDetails;

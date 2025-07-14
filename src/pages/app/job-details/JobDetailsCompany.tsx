import { appliedIcon, needsReviewIcon, passportIcon } from "@/assets";
import { MatchPercentage, StatusTag } from "@/components";
import { toSentenceCase } from "@/libs";
import { JobData, JobStatus } from "@/types";

const JobDetailsCompany = ({ job }: { job: JobData }) => {
  return (
    <div className="flex justify-between gap-3 flex-wrap mb-6">
      <div className="flex gap-3 items-center">
        <img src={job.companyLogo} className="h-12 w-12 object-cover" />
        <div>
          <h4 className="font-semibold text-xl">{job?.title}</h4>
          <p className="text-sm text-gray-500">{job?.company}</p>
        </div>
      </div>
      <div className="flex items-center gap-2.5 flex-wrap">
        <MatchPercentage value={job.match as number} />
        <StatusTag
          value={toSentenceCase(job.status as string)}
          status={job.status === JobStatus?.AutoApplied ? "success" : "pending"}
          icon={
            <img
              src={job.status === JobStatus?.AutoApplied ? appliedIcon : needsReviewIcon}
              alt="Job status"
              className="w-4 h-4"
            />
          }
        />
        {job?.visa_sponsored ? (
          <StatusTag
            value={"Visa Sponsor"}
            status={"success"}
            icon={<img src={passportIcon} alt="Visa status" className="w-4 h-4" />}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default JobDetailsCompany;

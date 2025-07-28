import { checkedIcon } from "@/assets";
import { JobDetailsShell } from "@/components";
import { JobData } from "@/types";

const JobDetailsRequirements = ({ job }: { job: JobData }) => {
  return (
    <>
      <JobDetailsShell title="Required Qualification">
        <div className="flex flex-col gap-3">
          {job?.required_qualifications?.map((x, i) => (
            <div className="flex items-center gap-2" key={i}>
              <img src={checkedIcon} className="w-5 h-5" alt="star" /> <p>{x}</p>
            </div>
          ))}
        </div>
      </JobDetailsShell>
      <JobDetailsShell title="Nice to have" className="mt-6">
        <div className="flex flex-col gap-3">
          {job?.preferred_qualifications?.map((x, i) => (
            <div className="flex items-center gap-2" key={i}>
              <img src={checkedIcon} className="w-5 h-5" alt="star" /> <p>{x}</p>
            </div>
          ))}
        </div>
      </JobDetailsShell>
    </>
  );
};

export default JobDetailsRequirements;

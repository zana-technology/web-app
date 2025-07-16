import { checkedIcon } from "@/assets";
import { JobDetailsShell } from "@/components";
import { JobData } from "@/types";

const ZanaInsights = ({ job }: { job: JobData }) => {
  return (
    <>
      {" "}
      <JobDetailsShell
        title={`What made you a ${job?.match_score ? `${job?.match_score}%` : ""} match for this job?`}
      >
        <div className="flex flex-col gap-3">
          {job?.matchBreakdown?.map((x, i) => (
            <div className="flex items-center gap-2" key={i}>
              <img src={checkedIcon} className="w-5 h-5" alt="star" />{" "}
              <p>
                {x.label} <span className="text-green-500">{x.value}%</span>{" "}
              </p>
            </div>
          ))}
        </div>
      </JobDetailsShell>
    </>
  );
};

export default ZanaInsights;

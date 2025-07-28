import { starGoldIcon } from "@/assets";
import { Button, DangerousContent, JobDetailsShell } from "@/components";
import { formatText } from "@/libs";
import { JobData } from "@/types";
import { useState } from "react";

const JobDetailsOverview = ({ job }: { job: JobData }) => {
  const [expanded, setExpanded] = useState(false);

  const maxLength = 300;

  const isLong = job?.description.length > maxLength;
  const displayedDescription =
    expanded || !isLong ? job?.description : job?.description?.slice(0, maxLength) + "...";
  return (
    <>
      <JobDetailsShell title="Job Description">
        <DangerousContent
          content={formatText(displayedDescription)}
          className="mb-2 flex flex-col gap-5"
        />
        {isLong && (
          <Button
            title={expanded ? "Read Less" : "Read More"}
            variant="text"
            className="p-0"
            onClick={() => setExpanded((prev) => !prev)}
          />
        )}
      </JobDetailsShell>
      <JobDetailsShell title="Benefits and Perks" className="mt-6">
        <div className="flex flex-col gap-3">
          {job?.benefits?.map((x, i) => (
            <div className="flex items-center gap-2" key={i}>
              <img src={starGoldIcon} className="w-5 h-5" alt="star" /> <p>{x}</p>
            </div>
          ))}
        </div>
      </JobDetailsShell>
    </>
  );
};

export default JobDetailsOverview;

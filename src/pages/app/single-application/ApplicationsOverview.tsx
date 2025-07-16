import { checkedIcon, starGoldIcon } from "@/assets";
import { Button, JobDetailsShell } from "@/components";
import { ApplicationData } from "@/types";
import { useState } from "react";

const ApplicationsOverview = ({ application }: { application: ApplicationData }) => {
  const [expanded, setExpanded] = useState(false);

  const maxLength = 300;

  const isLong = (application?.description as string).length > maxLength;
  const displayedDescription =
    expanded || !isLong
      ? application?.description
      : application?.description?.slice(0, maxLength) + "...";
  return (
    <div>
      <JobDetailsShell title="Job Description">
        <p className="mb-2">{displayedDescription}</p>
        {isLong && (
          <Button
            title={expanded ? "Read Less" : "Read More"}
            variant="text"
            className="p-0"
            onClick={() => setExpanded((prev) => !prev)}
          />
        )}
      </JobDetailsShell>
      <JobDetailsShell title="Required Qualification" className="mt-6">
        <div className="flex flex-col gap-3">
          {application?.requirements?.map((x, i) => (
            <div className="flex items-center gap-2" key={i}>
              <img src={checkedIcon} className="w-5 h-5" alt="star" /> <p>{x}</p>
            </div>
          ))}
        </div>
      </JobDetailsShell>
      <JobDetailsShell title="Benefits and Perks" className="mt-6">
        <div className="flex flex-col gap-3">
          {application?.perks?.map((x, i) => (
            <div className="flex items-center gap-2" key={i}>
              <img src={starGoldIcon} className="w-5 h-5" alt="star" /> <p>{x}</p>
            </div>
          ))}
        </div>
      </JobDetailsShell>
    </div>
  );
};

export default ApplicationsOverview;

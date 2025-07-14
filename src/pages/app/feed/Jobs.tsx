import { appliedIcon, bookmarkIcon, needsReviewIcon } from "@/assets";
import { Button, MatchPercentage, StatusTag } from "@/components";
import { toSentenceCase, truncateText } from "@/libs";
import { JobData, JobStatus } from "@/types";
import JobHighlights from "./JobHighlights";
import { useNavigate } from "react-router-dom";
import { routes } from "@/router";

const Jobs = ({ jobs }: { jobs: JobData[] }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full grid lg:grid-cols-2 gap-6 mt-8">
      {jobs?.map((x, i) => (
        <div
          key={i}
          className="rounded-2xl bg-zana-grey-500 border border-zana-grey-100 p-2 w-full"
        >
          <div className="bg-white border border-zana-grey-100 py-4 px-3 flex flex-col gap-4">
            <div className="flex justify-between mb-2 flex-wrap gap-3">
              <div className="flex gap-2.5 items-center">
                <img src={x.companyLogo} className="h-10 w-10 object-cover" />
                <div>
                  <h5 className="font-semibold">{x?.title}</h5>
                  <p className="text-sm text-gray-500">{x?.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MatchPercentage value={x.match as number} key={i} />
                <StatusTag
                  value={toSentenceCase(x.status as string)}
                  status={x.status === JobStatus?.AutoApplied ? "success" : "pending"}
                  icon={
                    <img
                      src={x.status === JobStatus?.AutoApplied ? appliedIcon : needsReviewIcon}
                      alt="Job status"
                      className="w-4 h-4"
                    />
                  }
                />
              </div>
            </div>
            <JobHighlights job={x} />
            <p className="text-sm">{truncateText(x.description, 65)}</p>
            <div className="flex items-center gap-2 flex-wrap">
              {x.keywords?.map((y, i) => (
                <div key={i} className="bg-zana-grey-100 text-dark-400 px-2.5 py-1 text-xs rounded">
                  {y}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-3">
            <Button
              title="Save"
              icon={<img src={bookmarkIcon} alt="save" className="w-5" />}
              iconPosition="left"
              className="text-dark-400"
              variant="text"
            />
            <Button
              title="View details"
              onClick={() => {
                navigate(routes.app.JobDetails.replace("%id%", x?.uid));
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Jobs;

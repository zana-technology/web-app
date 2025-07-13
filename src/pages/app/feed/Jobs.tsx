import { appliedIcon, bookmarkIcon, bullseyeIcon, needsReviewIcon } from "@/assets";
import { Button, StatusTag } from "@/components";
import { toSentenceCase, truncateText } from "@/libs";
import { JobData, JobStatus } from "@/types";
import JobHighlights from "./JobHighlights";

const Jobs = ({ jobs }: { jobs: JobData[] }) => {
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
              className="bg-transparent text-dark-400 hover:bg-transparent"
            />
            <Button
              title="View details"
              //   icon={button.icon}
              //   iconPosition="left"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Jobs;

const MatchPercentage = ({ value }: { value: number }) => {
  return (
    <div className="flex items-center text-xs text-util-brand-500">
      <img src={bullseyeIcon} alt="match" className="w-4 h-4 mr-0.5" />
      <p>{value}% match</p>
    </div>
  );
};

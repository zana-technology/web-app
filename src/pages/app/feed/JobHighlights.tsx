import { globe2Icon, locationIcon, salaryIcon } from "@/assets";
import { constant, currencyFormatter } from "@/libs";
import { JobData } from "@/types";
import moment from "moment";

const JobHighlights = ({ job }: { job: JobData }) => {
  return (
    <div className="flex items-center text-util-grey-500 text-sm gap-2 flex-wrap">
      <div className="flex gap-1 items-center">
        <img src={locationIcon} alt="location" className="w-4 h-4" />
        <p>{job?.location}</p>
      </div>
      <div className="w-1 h-1 rounded-full bg-util-grey-500"></div>
      <div className="flex gap-1 items-center">
        <img src={globe2Icon} alt="location" className="w-4 h-4" />
        <p>{job?.mode}</p>
      </div>
      <div className="w-1 h-1 rounded-full bg-util-grey-500"></div>
      <div className="flex gap-1 items-center">
        <img src={salaryIcon} alt="location" className="w-4 h-4" />
        {job?.salary_range?.length > 0 && (
          <p>
            {currencyFormatter({
              amount: job?.salary_range?.[0] as number,
              currency: job?.salary_currency,
              compact: true,
            })}{" "}
            -{" "}
            {currencyFormatter({
              amount: job?.salary_range?.[1] as number,
              currency: job?.salary_currency,
              compact: true,
            })}
          </p>
        )}
      </div>
      <div className="w-1 h-1 rounded-full bg-util-grey-500"></div>
      <div className="flex gap-1 items-center">
        <img src={salaryIcon} alt="location" className="w-4 h-4" />
        <p>{job?.date_posted ? moment(job?.date_posted).fromNow() : constant.notAdded}</p>
      </div>
    </div>
  );
};

export default JobHighlights;

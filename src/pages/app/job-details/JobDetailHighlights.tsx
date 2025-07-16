import { bankNoteIcon, eyeIcon, globeBlueIcon, locationPinkIcon, passportIcon } from "@/assets";
import { currencyFormatter } from "@/libs";
import { JobData } from "@/types";

const JobDetailHighlights = ({ job }: { job: JobData }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center text-sm gap-8 flex-wrap w-full justify-between py-6 border-y border-dashed border-zana-grey-300">
      <div className="flex flex-col">
        <img src={locationPinkIcon} alt="location" className="w-4 h-4 mb-2" />
        <p className="font-medium">{job?.location}</p>
        <p className="text-util-grey-500">Company Location</p>
      </div>

      <BorderRight />

      <div className="flex flex-col">
        <img src={globeBlueIcon} alt="location" className="w-4 h-4 mb-2" />
        <p className="font-medium">{job?.mode}</p>
        <p className="text-util-grey-500">Job Type</p>
      </div>

      <BorderRight />

      <div className="flex flex-col">
        <img src={bankNoteIcon} alt="salary" className="w-4 h-4 mb-2" />
        {job?.salary_range?.length > 0 && (
          <p className="font-medium">
            {currencyFormatter({
              amount: job?.salary_range?.[0] as number,
              currency: job?.salary_currency,
              compact: true,
            })}{" "}
            -{" "}
            {currencyFormatter({
              amount: job?.salary_range?.[1] as number,
              currency: job.salary_currency,
              compact: true,
            })}
          </p>
        )}
        <p className="text-util-grey-500">Salary Range</p>
      </div>

      <BorderRight />

      <div className="flex flex-col">
        <img src={passportIcon} alt="applicants" className="w-4 h-4 mb-2" />
        <p className="font-medium">{job?.applicants ?? 0}</p>
        <p className="text-util-grey-500">Applicants</p>
      </div>

      <BorderRight />

      <div className="flex flex-col">
        <img src={eyeIcon} alt="applicants" className="w-4 h-4 mb-2" />
        <p className="font-medium">{job?.views ?? 0}</p>
        <p className="text-util-grey-500">Views</p>
      </div>
    </div>
  );
};

const BorderRight = () => {
  return (
    <div className="w-1 border-r border-dashed border-r-zana-grey-300 h-12 hidden sm:block"></div>
  );
};

export default JobDetailHighlights;

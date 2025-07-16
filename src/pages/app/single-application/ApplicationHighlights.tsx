import { bankNoteIcon, calendarIcon, globeBlueIcon, locationPinkIcon } from "@/assets";
import { StatusTag } from "@/components";
import { capitalizeFirstLetter, currencyFormatter, toSentenceCase } from "@/libs";
import { ApplicationData, JobMode } from "@/types";
import moment from "moment";

const ApplicationHighlights = ({ application }: { application: ApplicationData }) => {
  const highlights = [
    { label: "Company Location", value: application?.location, icon: locationPinkIcon },
    {
      label: "Salary Range",
      value: `${currencyFormatter({
        amount: application?.salary_range?.[0] as number,
        currency: application?.salary_currency,
        compact: true,
      })}
      -
      ${currencyFormatter({
        amount: application?.salary_range?.[1] as number,
        currency: application.salary_currency,
        compact: true,
      })}`,
      icon: bankNoteIcon,
    },
    {
      label: "Job Type",
      value: application?.is_remote ? JobMode.Remote : JobMode.Onsite,
      icon: globeBlueIcon,
    },
    {
      label: "Date Applied",
      value: moment(application?.applied_at).format("MMMM D, YYYY"),
      icon: calendarIcon,
    },
  ];
  return (
    <div className="w-full border border-zana-grey-300 px-4 md:px-5 py-4 rounded-xl md:rounded-2xl mb-16">
      <div className="flex justify-between gap-3 flex-wrap mb-6 items-center">
        <div className="flex gap-3 items-center">
          {application?.companyLogo && (
            <img src={application.companyLogo} className="h-12 w-12 object-cover" />
          )}
          <div>
            <h4 className="font-semibold text-xl">{application?.job_role}</h4>
            <p className="text-sm text-gray-500">{application?.company}</p>
          </div>
        </div>
        <StatusTag
          value={capitalizeFirstLetter(toSentenceCase(application?.status))}
          status={capitalizeFirstLetter(toSentenceCase(application?.status))}
        />
      </div>

      <div className="w-full flex gap-6 lg:justify-between flex-wrap">
        {highlights?.map((x, i) => (
          <div
            key={i}
            className="text-sm border border-zana-grey-300 p-2.5 rounded-lg flex items-center gap-2"
          >
            <img src={x.icon} alt={x.label} className="w-4 h-4" />
            <p>{x.label}</p>
            <div className="w-1 border-r border-dashed border-r-zana-grey-300 h-3 block"></div>
            <p>{x.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationHighlights;

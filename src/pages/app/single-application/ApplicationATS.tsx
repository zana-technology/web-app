import { checkedIcon, infoCircleIcon } from "@/assets";
import { JobDetailsShell } from "@/components";
import { ApplicationData } from "@/types";
import { BsDashLg } from "react-icons/bs";

const ApplicationATS = ({ application }: { application: ApplicationData }) => {
  function getPinColor(percent: number): { textColor: string; pinColor: string } {
    if (percent > 0 && percent < 25) {
      return { textColor: "#F04438", pinColor: "#FEF3F2" };
    }
    if (percent >= 25 && percent < 50) {
      return { textColor: "#FB6514", pinColor: "#FFF6ED" };
    }
    if (percent >= 50 && percent < 75) {
      return { textColor: "#F79009", pinColor: "#FFFAEB" };
    }
    if (percent >= 75 && percent <= 100) {
      return { textColor: "#12B76A", pinColor: "#ECFDF3" };
    }

    return { textColor: "#181D27", pinColor: "#ffffff" };
  }

  const color = getPinColor(application.ats_score ?? 0);

  return (
    <JobDetailsShell title="ATS Compatibility Score">
      <div className="w-full flex flex-col items-center text-sm">
        <h3 className="text-3xl font-semibold">{application.ats_score}%</h3>
        <p>Your resume scored {application.ats_score}% compability with this job posting</p>
        <div className="relative w-full max-w-[662px] h-4 mt-4">
          <div className="w-full rounded-lg h-4 grid grid-cols-4">
            <div className="bg-[#DE3639] w-full h-full rounded-l-lg border-r-2 border-white"></div>
            <div className="bg-[#F29927] w-full h-full border-r-2 border-white"></div>
            <div className="bg-[#FFE620] w-full h-full border-r-2 border-white"></div>
            <div className="bg-[#68CE66] w-full h-full rounded-r-lg"></div>
          </div>
          <div
            className="pin absolute -top-4"
            style={{
              left: `calc(${application.ats_score}% - 5px)`,
              ["--pin-center-color" as any]: color.pinColor,
            }}
          />{" "}
          <p
            className="absolute -top-4 text-[8px]"
            style={{
              left: `calc(${application.ats_score}%)`,
              color: color.textColor,
            }}
          >
            {application.ats_score}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-10 mt-16">
        <div>
          <div className="flex items-center font-semibold gap-1">
            <img src={checkedIcon} className="w-5 h-5" alt="star" />
            <p>Strengths</p>
          </div>
          <div className="flex flex-col gap-3 txt-sm mt-3">
            {application?.ats_stats?.strengths?.map((x, i) => (
              <div className="flex items-center gap-2" key={i}>
                <BsDashLg className="text-util-success-500" />
                <p>{x}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center font-semibold gap-1">
            <img src={infoCircleIcon} className="w-5 h-5" alt="star" />
            <p>Improvements</p>
          </div>
          <div className="flex flex-col gap-3 txt-sm mt-3">
            {application?.ats_stats?.improvements?.map((x, i) => (
              <div className="flex items-center gap-2" key={i}>
                <BsDashLg className="text-util-warning-500" />
                <p>{x}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </JobDetailsShell>
  );
};

export default ApplicationATS;

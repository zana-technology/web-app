import {
  BriefcaseIcon,
  MailUnreadIcon,
  PresentationIcon,
  TargetIcon,
  TrophyIcon,
  UsersIcon,
} from "@/assets";
import { useWindowWidth } from "@/hooks";
import { twMerge } from "tailwind-merge";

const AnalyticsMetrics = () => {
  const metrics = [
    {
      icon: <BriefcaseIcon className="text-[#9E77ED]" />,
      title: "Total Applications",
      amount: 47,
    },
    {
      icon: <MailUnreadIcon className="text-[#17B26A]" />,
      title: "Response Rate",
      amount: 34,
      type: "percentage",
    },
    {
      icon: <UsersIcon className="text-[#F79009]" />,
      title: "Interview Rate",
      amount: 19,
      type: "percentage",
    },
    {
      icon: <TrophyIcon className="text-[#53B1FD]" />,
      title: "Offer Rate",
      amount: 6,
      type: "percentage",
    },
    {
      icon: <PresentationIcon className="text-[#D444F1]" />,
      title: "Average ATS Score",
      amount: 81,
      type: "percentage",
    },
    {
      icon: <TargetIcon className="text-[#F04438]" />,
      title: "Active Applications",
      amount: 81,
      type: "percentage",
    },
  ];

  const window = useWindowWidth();

  return (
    <div className="w-full border border-zana-grey-300 p-5 rounded-lg grid xs:grid-cols-3 lg:grid-cols-6 gap-5">
      {metrics?.map((x, i) => (
        <div
          key={i}
          className={twMerge(
            i > 0 ? "border-l border-dashed border-zana-grey-100 pl-5" : "",
            window < 1024 && i === 3 ? "border-0 pl-0" : "",
            window < 480 && i > 0 ? "border-l-0 border-t pl-0 pt-5" : ""
          )}
        >
          {x.icon}
          <p className="mt-1 mb-3 text-util-grey-500 text-sm">{x.title}</p>

          <h3 className="text-2xl font-medium">
            {x.amount}
            {x?.type ? "%" : ""}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsMetrics;

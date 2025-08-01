import { JobDetailsShell } from "@/components";
import { twMerge } from "tailwind-merge";

const AtsDistribution = () => {
  const distribution = [
    {
      score: "<60%",
      amount: 4,
      percentage: 8,
      color: "#F04438",
    },
    {
      score: "60 - 69%",
      amount: 8,
      percentage: 17,
      color: "#F38744",
    },
    {
      score: "70 - 79%",
      amount: 15,
      percentage: 32,
      color: "#FAC515",
    },
    {
      score: "80 - 89%",
      amount: 12,
      percentage: 26,
      color: "#2E90FA",
    },
    {
      score: "90 - 100%",
      amount: 8,
      percentage: 17,
      color: "#16B364",
    },
  ];
  return (
    <JobDetailsShell title="ATS Distribution Score" hideTitleBorder>
      <div className="w-full flex">
        {distribution?.map((x, i) => (
          <div key={i} style={{ width: `${x.percentage}%` }}>
            <div
              className={twMerge(
                "h-2",
                i === 0 ? "rounded-l-lg" : "",
                i === 4 ? "rounded-r-lg" : "",
                i > 0 ? "border-l-2 border-white" : ""
              )}
              style={{ backgroundColor: x.color }}
            ></div>
            <div className="text-sm pl-2 border-l border-dashed border-zana-grey-300 mt-1 hidden lg:block">
              <div className="flex items-center gap-2 mb-12">
                <div className="w-2.5 h-2.5" style={{ backgroundColor: x.color }}></div>
                <p>{x.score}</p>
              </div>
              <div className="flex items-center gap-1">
                <p className="font-semibold">{x.amount}</p>

                <p className="text-util-grey-500">({x.percentage}%)</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="lg:hidden grid grid-cols-2 mt-6 gap-4">
        {distribution?.map((x, i) => (
          <div className="text-sm mt-1" key={i}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2.5 h-2.5" style={{ backgroundColor: x.color }}></div>
              <p>{x.score}</p>
            </div>
            <div className="flex items-center gap-1 pl-[18px]">
              <p>{x.amount}</p>

              <p className="font-semibold">({x.percentage}%)</p>
            </div>
          </div>
        ))}
      </div>
    </JobDetailsShell>
  );
};

export default AtsDistribution;

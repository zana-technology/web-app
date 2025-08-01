import { JobDetailsShell, ProgressBar } from "@/components";

const PerformanceByLocation = () => {
  const performance = [
    { location: "San Francisco, CA", applications: 19, responses: 8 },
    { location: "New York, NY", applications: 12, responses: 4 },
    { location: "Seattle, WA", applications: 8, responses: 2 },
    { location: "Austin, TX", applications: 10, responses: 3 },
    { location: "Remote", applications: 3, responses: 1 },
  ];

  const getPercentage = (partial: number, total: number): number => {
    if (total === 0) return 0;
    return Math.ceil((partial / total) * 100);
  };

  return (
    <JobDetailsShell title="Performance by Location" hideTitleBorder>
      <div className="flex flex-col gap-4">
        {performance?.map((x, i) => {
          const percentage = getPercentage(x.responses, x.applications);
          return (
            <div key={i} className="w-full text-sm">
              <div className="flex gap-3 justify-between mb-2">
                <div>
                  <p className="font-medium">{x.location}</p>
                  <p className="text-zana-grey-400">
                    {x.responses}/{x.applications} responses
                  </p>
                </div>
                <p
                  className={
                    percentage > 40
                      ? "text-util-green-500"
                      : percentage >= 30
                        ? "text-util-yellow-500"
                        : "text-util-error-500"
                  }
                >
                  {percentage}%
                </p>
              </div>

              <ProgressBar
                percentagWidth={percentage}
                barClassName={
                  percentage > 40
                    ? "bg-util-green-500"
                    : percentage >= 30
                      ? "bg-util-yellow-500"
                      : "bg-util-error-500"
                }
              />
            </div>
          );
        })}
      </div>
    </JobDetailsShell>
  );
};

export default PerformanceByLocation;

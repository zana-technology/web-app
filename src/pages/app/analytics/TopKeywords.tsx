import { JobDetailsShell } from "@/components";
import { twMerge } from "tailwind-merge";

const TopKeywords = () => {
  const keywords = [
    {
      key: "Python",
      amount: 32,
    },
    {
      key: "Agile",
      amount: 32,
    },
    {
      key: "Machine learning",
      amount: 32,
    },
    {
      key: "Tailwind",
      amount: 32,
    },
    {
      key: "AWS",
      amount: 32,
    },
    {
      key: "Node. JS",
      amount: 32,
    },
    {
      key: "Leadership",
      amount: 32,
    },
    {
      key: "Administration",
      amount: 32,
    },

    //
  ];
  return (
    <JobDetailsShell title="Top Job Keywords" hideTitleBorder>
      <div className="grid grid-cols-2">
        {keywords?.map((x, i) => (
          <div
            key={i}
            className={twMerge(
              "text-sm mb-5 border-zana-grey-300 border-dashed",
              i > 1 ? "border-t pt-5" : ""
            )}
          >
            <div className={i % 2 === 1 ? "border-l pl-10 border-zana-grey-300 border-dashed" : ""}>
              <p className="mb-0.5 font-medium">{x.key}</p>
              <p className="text-zana-grey-400">Used {x.amount} times</p>
            </div>
          </div>
        ))}
        {keywords?.length % 2 === 1 ? (
          <div className="border-t pt-5 border-zana-grey-300 border-dashed"></div>
        ) : (
          ""
        )}
      </div>
    </JobDetailsShell>
  );
};

export default TopKeywords;

import { twMerge } from "tailwind-merge";

export const ProgressBar = ({
  percentagWidth,
  barClassName,
}: {
  percentagWidth: number;
  barClassName?: string;
}) => {
  return (
    <div className="h-2 rounded w-full bg-diagonal-stripes">
      <div
        style={{ width: `${percentagWidth ?? 0}%` }}
        className={twMerge(
          "h-2 bg-zana-primary-normal",
          percentagWidth < 100 ? "rounded-l" : "rounded",
          barClassName
        )}
      ></div>
    </div>
  );
};

export default ProgressBar;

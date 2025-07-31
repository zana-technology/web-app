import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const JobDetailsShell = ({
  title,
  children,
  className,
  hideTitleBorder,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  hideTitleBorder?: boolean;
}) => {
  return (
    <div className={twMerge("w-full p-3 border border-zana-grey-300 rounded-xl", className)}>
      <h4
        className={twMerge(
          "pb-4 w-full  border-dashed font-semibold mb-4",
          hideTitleBorder ? "" : "border-b"
        )}
      >
        {title}
      </h4>
      {children}
    </div>
  );
};

export default JobDetailsShell;

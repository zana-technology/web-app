import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const JobDetailsShell = ({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={twMerge("w-full p-3 border border-zana-grey-300 rounded-xl", className)}>
      <h4 className="pb-4 w-full border-b border-dashed font-semibold">{title}</h4>
      {children}
    </div>
  );
};

export default JobDetailsShell;

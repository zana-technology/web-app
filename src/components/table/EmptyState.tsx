import { emptyStateIcon } from "@/assets";
import { twMerge } from "tailwind-merge";

export const EmptyState = ({
  text = "No data found",
  subText,
  className,
}: {
  text?: string;
  subText?: string;
  className?: string;
}) => {
  return (
    <div className={twMerge("flex flex-col items-center w-full text-center p-5", className)}>
      <img src={emptyStateIcon} alt="empty" className="w-[52px] mb-6" />
      <h3 className="text-xl font-bold max-w-[768] mb-1">{text}</h3>
      {subText && <p className="text-sm">{subText}</p>}
    </div>
  );
};

export default EmptyState;

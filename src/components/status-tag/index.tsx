import { capitalizeFirstLetter, generateStatusColor } from "@/libs";
import { ReactNode } from "react";

export const StatusTag = ({
  status,
  value,
  className,
  icon,
}: {
  status: string;
  value: string;
  className?: string;
  icon?: ReactNode;
}) => {
  return (
    <div
      className={`w-fit px-2 py-0.5 flex justify-center items-center rounded-full text-xs font-medium whitespace-nowrap border gap-0.5 ${generateStatusColor(
        status
      )} ${className ? className : ""}`}
    >
      {icon ? icon : ""} <p>{capitalizeFirstLetter(value)}</p>
    </div>
  );
};

export default StatusTag;

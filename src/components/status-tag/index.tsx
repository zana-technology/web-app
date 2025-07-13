import { generateStatusColor } from '@retailyft/common';

export const StatusTag = ({
  status,
  value,
  className,
}: {
  status: string;
  value: string;
  className?: string;
}) => {
  return (
    <div
      className={`min-w-24 w-fit px-3 h-8 flex justify-center items-center rounded-full py-2 font-semibold text-[12px] ${generateStatusColor(
        status,
      )} ${className ? className : ''}`}
    >
      {value?.toUpperCase()}
    </div>
  );
};

export default StatusTag;

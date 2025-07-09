import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const OnboardingHash = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={twMerge(
        "w-full flex flex-col items-center py-4 sm:py-14 px-4 xs:px-20 border border-zana-grey-300 mt-4 sm:mt-14 relative",
        className
      )}
    >
      {/* Horizontal lines */}
      <div className="absolute top-0 -left-[10%] xs:-left-[20%] w-[120%] xs:w-[140%] h-[1px] bg-gradient-to-r from-zana-grey-300/10 via-zana-grey-300 to-zana-grey-300/10" />
      <div className="absolute bottom-0 -left-[10%] xs:-left-[20%] w-[120%] xs:w-[140%] h-[1px] bg-gradient-to-r from-zana-grey-300/10 via-zana-grey-300 to-zana-grey-300/10" />

      {/* Vertical lines */}
      <div className="absolute left-0 -top-[10%] xs:-top-[20%] h-[120%] xs:h-[140%] w-[1px] bg-gradient-to-b from-zana-grey-300/10 via-zana-grey-300 to-zana-grey-300/10" />
      <div className="absolute right-0 xs:-top-[20%] h-[120%] xs:h-[140%] w-[1px] bg-gradient-to-b from-zana-grey-300/10 via-zana-grey-300 to-zana-grey-300/10" />

      {children}
    </div>
  );
};

export default OnboardingHash;

import { twMerge } from "tailwind-merge";

interface AuthHeaderProps {
  title: string;
  subTitle: string;
  className?: string;
}

export const AuthHeader = ({ title, subTitle, className }: AuthHeaderProps) => {
  return (
    <div className={twMerge("mb-12 flex flex-col items-center", className)}>
      <h4 className="text-xl font-semibold mb-1 text-center">{title}</h4>
      <p className="text-dark-400 text-center">{subTitle}</p>
    </div>
  );
};

export default AuthHeader;

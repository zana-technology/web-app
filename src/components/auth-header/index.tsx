import { twMerge } from "tailwind-merge";

interface AuthHeaderProps {
  title: string;
  subTitle: string;
  className?: string;
  action?: {
    title: string;
    onClick: () => void;
  };
}

export const AuthHeader = ({
  title,
  subTitle,
  className,
  action,
}: AuthHeaderProps) => {
  return (
    <div className={twMerge("mb-12 flex flex-col items-center", className)}>
      <h4 className="text-xl font-semibold mb-1 text-center">{title}</h4>
      <p className="text-dark-400 text-center">
        {subTitle}{" "}
        {action?.title ? (
          <span
            className="text-blue-500 hover:text-blue-600 cursor-pointer"
            onClick={action?.onClick}
          >
            {action?.title}
          </span>
        ) : (
          ""
        )}
      </p>
    </div>
  );
};

export default AuthHeader;

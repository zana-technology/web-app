import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PageTitleProps {
  variant?: "default" | "small";
  icon?: ReactNode;
  subtitle?: string;
  title: string;
  className?: string;
}

export const PageTitle = ({
  variant = "default",
  title,
  subtitle,
  icon,
  className,
}: PageTitleProps) => {
  return (
    <div className={twMerge("flex gap-2 items-center", className)}>
      {icon ? icon : ""}
      <div className="flex-1">
        <h4
          className={twMerge(
            "font-semibold text-2xl",
            variant === "small" ? "text-lg" : ""
          )}
        >
          {title}
        </h4>
        {subtitle ? (
          <p className="text-sm mt-1 text-dark-400">{subtitle}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PageTitle;

import { ReactNode } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import PulseLoader from "react-spinners/PulseLoader";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "outlined" | "text";
  icon?: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  iconPosition?: "left" | "right";
  showArrow?: boolean;
}

export const Button = ({
  title,
  type = "button",
  variant = "default",
  icon,
  onClick,
  className,
  disabled = false,
  loading = false,
  fullWidth = false,
  iconPosition = "right",
  showArrow = false,
}: ButtonProps) => {
  let variantClass = "";
  let loadingColor = "white";

  switch (variant) {
    case "default":
      variantClass = "text-white bg-zana-primary-normal hover:bg-zana-primary-normalHover";
      loadingColor = "white";
      break;
    case "outlined":
      variantClass =
        "border border-zana-grey-200 text-dark-700 hover:border-dark-700 hover:text-dark-900 hover:bg-zana-grey-200";
      loadingColor = "#414651";
      break;
    case "text":
      variantClass = "text-zana-primary-normal hover:text-zana-primary-normalHover";
      loadingColor = "#255A5A";
      break;
  }

  const mergedClassName = twMerge(
    `h-10 px-3 py-2 rounded-md cursor-pointer w-fit flex justify-center items-center gap-1.5  whitespace-nowrap
     ${variantClass} ${fullWidth ? "w-full" : ""} ${
       disabled ? "bg-zana-grey-100 text-zana-grey-400 hover:bg-zana-grey-100" : ""
     }`,
    className
  );

  const showIconLeft = iconPosition === "left";
  const showIconRight = iconPosition === "right";

  return (
    <button
      type={type}
      onClick={onClick}
      className={mergedClassName}
      disabled={disabled || loading}
    >
      {loading ? (
        <PulseLoader color={loadingColor} loading={loading} size={15} />
      ) : (
        <>
          {showIconLeft && icon && <span>{icon}</span>}
          {showIconLeft && showArrow && (
            <span>
              <LuChevronLeft size={20} />
            </span>
          )}
          <span>{title}</span>
          {showIconRight && icon ? <span>{icon}</span> : ""}
          {showIconRight && showArrow ? (
            <span>
              <LuChevronRight size={20} />
            </span>
          ) : (
            ""
          )}
        </>
      )}
    </button>
  );
};

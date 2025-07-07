import { twMerge } from "tailwind-merge";

interface SelectButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  value: boolean;
}

export const SelectButton = ({
  label,
  onClick,
  disabled,
  className,
  value,
}: SelectButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(
        `h-11 border border-zana-grey-300 rounded-xl flex items-center justify-center p-3 hover:bg-zana-primary-light`,
        className,
        value
          ? "text-zana-primary-normal border-zana-primary-normal bg-zana-primary-light"
          : ""
      )}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default SelectButton;

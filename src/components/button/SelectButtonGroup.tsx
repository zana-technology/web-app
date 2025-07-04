import { capitalizeFirstLetter } from "@/libs";
import { Option } from "@/types";
import { twMerge } from "tailwind-merge";
import SelectButton from "./SelectButton";

interface SelectButtonGroupProps {
  options: Option[];
  name: string;
  onChange: (option: string[] | string) => void;
  value: string[] | string;
  multiple?: boolean;
  label: string;
  errorMessage?: string;
  touched?: boolean;
  className?: string;
  required?: boolean;
}

export const SelectButtonGroup = ({
  options,
  name,
  onChange,
  value,
  label,
  errorMessage,
  touched,
  className,
  required,
  multiple,
}: SelectButtonGroupProps) => {
  return (
    <div>
      {label ? (
        <label htmlFor={name} className="text-sm text-dark-700 ">
          {capitalizeFirstLetter(label)} {required && "*"}
        </label>
      ) : (
        ""
      )}
      <div className={twMerge("grid grid-cols-2 gap-6 mt-1.5", className)}>
        {options.map((x, i) => (
          <SelectButton
            key={i}
            label={x.label}
            onClick={() => {
              if (multiple) {
                const selected = value as string[];
                const updated = selected.includes(x.value)
                  ? selected.filter((v) => v !== x.value)
                  : [...selected, x.value];
                onChange(updated);
              } else {
                onChange(x.value);
              }
            }}
            value={
              multiple
                ? (value as string[]).includes(x.value)
                : value === x.value
            }
          />
        ))}
      </div>
      {touched && errorMessage ? (
        <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
      ) : null}
    </div>
  );
};

export default SelectButtonGroup;

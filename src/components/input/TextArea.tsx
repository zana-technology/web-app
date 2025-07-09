import { capitalizeFirstLetter } from "@/libs";
import { ChangeEventHandler, FocusEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface TextAreaProps {
  label: string;
  value: string;
  name: string;
  errorMessage?: string;
  disabled?: boolean;
  touched?: boolean;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  required?: boolean;
  className?: string;
  placeholder?: string;
  note?: string;
}

export const TextArea = ({
  label,
  value,
  name,
  required = false,
  onChange,
  onBlur,
  errorMessage,
  touched,
  disabled = false,
  className,
  placeholder,
  note,
}: TextAreaProps) => {
  return (
    <div className={`flex flex-col relative ${className ? className : ""}`}>
      {label ? (
        <label htmlFor={name} className="text-sm text-dark-700 mb-1.5">
          {capitalizeFirstLetter(label)}
        </label>
      ) : (
        ""
      )}
      <textarea
        id={name}
        name={name}
        placeholder={placeholder ? placeholder : `Enter ${label}`}
        required={required}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={twMerge(
          `px-3 py-2 border outline-none focus:border-zana-grey-200 rounded-md focus-visible:border-dark-700 text-inherit min-h-30 h-auto max-h-[400px] overflow-y-auto ${
            touched && errorMessage ? "border-red-500" : "border-zana-grey-200 "
          }`
        )}
      />
      {note ? <p className="text-sm  mt-1">{note}</p> : null}

      {touched && errorMessage ? <p className="text-xs text-red-500 mt-1">{errorMessage}</p> : null}
    </div>
  );
};

export default TextArea;

import { capitalizeFirstLetter } from "@/libs";
import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export interface QuillInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  name: string;
  errorMessage?: string;
  disabled?: boolean;
  touched?: boolean;
  onChange: (value: string) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  note?: string;
}

export const QuillInput = ({
  label,
  placeholder,
  value,
  name,
  required = false,
  onChange,
  // onBlur,
  errorMessage,
  touched,
  className,
  note,
}: QuillInputProps) => {
  const handleQuillChange = (value: string) => {
    onChange(value);
  };

  return (
    <div className={`flex flex-col relative ${className ? className : ""}`}>
      {label ? (
        <label htmlFor={name} className="text-sm text-dark-700 mb-1.5">
          {capitalizeFirstLetter(label)} {required && "*"}
        </label>
      ) : (
        ""
      )}
      <ReactQuill
        value={value}
        onChange={handleQuillChange}
        placeholder={`${placeholder || `Enter ${label}`}`}
        modules={{ toolbar: false }}
      />

      {note ? <p className="text-sm  mt-1">{note}</p> : null}
      {touched && errorMessage ? <p className="text-xs text-red-500 mt-1">{errorMessage}</p> : null}
    </div>
  );
};

export default QuillInput;

"use client";

import { capitalizeFirstLetter } from "@/libs";
import { FocusEventHandler, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoInformationCircleSharp } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

export interface DateInputProps {
  label?: string;
  placeholder?: string;
  value: string | Date;
  name: string;
  errorMessage?: string;
  disabled?: boolean;
  touched?: boolean;
  onChange?: (
    date: Date | Date[] | null,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
  onBlur?: FocusEventHandler<HTMLElement>;
  required?: boolean;
  className?: string;
  inputClass?: string;
  showTimeSelect?: boolean;
  filterDate?: (date: Date) => boolean;
  excludeTimes?: Date[];
  excludeDates?: Date[];
  excludeWeekends?: boolean;
  excludePastDays?: boolean;
  excludeFutureDays?: boolean;
  timeIntervals?: number;
  filterTime?: (time: Date) => boolean;
  minDate?: Date;
  note?: string;
  withPortal?: boolean;
}

export const DateInput = ({
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
  inputClass,
  showTimeSelect,
  filterDate,
  excludeTimes,
  excludeWeekends,
  excludePastDays,
  excludeFutureDays,
  excludeDates,
  timeIntervals,
  filterTime,
  minDate,
  note,
  withPortal = false,
}: DateInputProps) => {
  const excludeWeekendsAction = (date: Date): boolean => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const pastDays = (date: Date): boolean => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return date >= currentDate;
  };

  const futureDays = (date: Date): boolean => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return date <= currentDate;
  };

  const excludeWeekendsPastDays = (date: Date): boolean => {
    const day = date.getDay();
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const isWeekend = day === 0 || day === 6;
    const isPastDay = date < currentDate;

    return !isWeekend && !isPastDay;
  };

  const getDateValue = (): Date | null => {
    if (!value) return null;

    if (typeof value === "string") {
      // Handle different string formats
      const date = new Date(value);
      return isNaN(date.getTime()) ? null : date;
    }

    if (value instanceof Date) {
      return isNaN(value.getTime()) ? null : value;
    }

    return null;
  };

  const dateValue = getDateValue();

  // Handle manual text input with debouncing to avoid conflicts
  const [isTyping, setIsTyping] = useState(false);

  const handleRawChange = (value: string) => {
    if (!onChange || !value) return;

    setIsTyping(true);

    // Debounce the parsing to avoid conflicts with picker
    const timeoutId = setTimeout(() => {
      const parseDate = (dateStr: string): Date | null => {
        // Add safety check for undefined/null values
        if (!dateStr || typeof dateStr !== "string") return null;

        const trimmed = dateStr.trim();
        if (!trimmed) return null;

        // Handle dd/MM/yy format (convert to dd/MM/yyyy)
        const shortYearPattern = /^(\d{1,2})\/(\d{1,2})\/(\d{2})$/;
        const shortYearMatch = trimmed.match(shortYearPattern);

        if (shortYearMatch) {
          const [, day, month, year] = shortYearMatch;
          const fullYear = parseInt(year) < 50 ? `20${year}` : `19${year}`;
          const date = new Date(parseInt(fullYear), parseInt(month) - 1, parseInt(day));
          return isNaN(date.getTime()) ? null : date;
        }

        // Handle dd/MM/yyyy format
        const fullYearPattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
        const fullYearMatch = trimmed.match(fullYearPattern);

        if (fullYearMatch) {
          const [, day, month, year] = fullYearMatch;
          const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          return isNaN(date.getTime()) ? null : date;
        }

        return null;
      };

      const parsedDate = parseDate(value);
      if (parsedDate) {
        onChange(parsedDate);
      }
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  // Wrapper for onChange to handle picker selections
  const handleDateChange = (
    date: Date | Date[] | null,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => {
    if (!isTyping && onChange) {
      onChange(date, event);
    }
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

      <DatePicker
        dateFormat={showTimeSelect ? "dd/MM/yyyy h:mm aa" : "dd/MM/yyyy"}
        showYearDropdown
        scrollableYearDropdown
        placeholderText="dd/mm/yyyy"
        calendarClassName={"calendar"}
        onBlur={onBlur}
        disabled={disabled}
        onChange={handleDateChange}
        onChangeRaw={(e) =>
          handleRawChange(
            ((e as React.KeyboardEvent<HTMLElement>).target as HTMLInputElement).value
          )
        }
        selected={dateValue} // Use converted date value
        // selected={value as Date}
        id={name}
        name={name}
        // error={error}
        // fontSize={fontSize}
        // height={height}
        showTimeSelect={showTimeSelect}
        showTimeInput={showTimeSelect}
        excludeTimes={excludeTimes}
        excludeDates={excludeDates}
        filterDate={
          excludeWeekends && excludePastDays
            ? excludeWeekendsPastDays
            : excludeWeekends
              ? excludeWeekendsAction
              : excludePastDays
                ? pastDays
                : excludeFutureDays
                  ? futureDays
                  : filterDate
        }
        filterTime={filterTime}
        timeIntervals={timeIntervals}
        minDate={minDate}
        wrapperClassName={"w-full"}
        customInput={
          <input
            className={twMerge(
              `h-10 px-3 py-2 border outline-none focus:border-zana-grey-200 rounded-md focus-visible:border-dark-700 text-inherit appearance-none w-full 
          [&::-webkit-outer-spin-button]:appearance-none 
          [&::-webkit-inner-spin-button]:appearance-none 
          [&::-moz-appearance]:textfield`,
              touched && errorMessage ? "border-red-500" : "border-zana-grey-200",
              inputClass
            )}
          />
        }
        withPortal={withPortal}
        // autoComplete="off"
      />

      {note ? (
        <p className="text-xs mt-1 flex gap-2">
          <IoInformationCircleSharp /> <span>{note}</span>
        </p>
      ) : null}
      {touched && errorMessage ? <p className="text-xs text-red-500 mt-1">{errorMessage}</p> : null}
    </div>
  );
};

export default DateInput;

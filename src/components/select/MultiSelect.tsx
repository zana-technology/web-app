import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Portal from "../portal";
import { Option } from "@/types";
import { usePositionedElement } from "@/hooks";
import { capitalizeFirstLetter } from "@/libs";
import { twMerge } from "tailwind-merge";
import { Checkbox } from "../checkbox";

export interface MultiSelectProps<T = unknown> {
  label?: string;
  values: Option<T>[];
  name: string;
  errorMessage?: string;
  disabled?: boolean;
  touched?: boolean;
  onChange: (options: Option<T>[]) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  options: Option<T>[];
  className?: string;
  placeholder?: string;
  note?: string;
  noOptionsText?: string;
  max?: number;
}

export const MultiSelect = ({
  label,
  values = [],
  name,
  required = false,
  onChange,
  onBlur,
  errorMessage,
  touched,
  disabled,
  options,
  className,
  placeholder,
  note,
  noOptionsText = "No results found",
  max,
}: MultiSelectProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const triggerId = name;

  const { elementRef, position } = usePositionedElement({
    triggerId,
    isOpen,
    onClose: () => setIsOpen(false),
  });

  useEffect(() => {
    if (values?.length > 0) {
      const matchedOptions = options.filter((item) =>
        values.some((sel) => sel.value === item.value)
      );

      setSelectedOptions(matchedOptions);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.[0]?.value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const availableOptions = options?.filter((x) =>
      x?.label?.toLowerCase().includes(value.toLowerCase())
    );

    if (value) {
      return setFilteredOptions([...availableOptions]);
    }

    setFilteredOptions([...options]);
  };

  const handleCheckboxChange = (option: Option) => {
    let updatedSelection: Option[];

    const isSelected = selectedOptions.some((item) => item.value === option.value);

    if (isSelected) {
      updatedSelection = selectedOptions.filter((item) => item.value !== option.value);
    } else {
      if (max && selectedOptions?.length === max) {
        setQuery("");
        return;
      }
      updatedSelection = [...selectedOptions, option];
    }

    setQuery("");
    setSelectedOptions(updatedSelection);
    onChange(updatedSelection);
  };

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFilteredOptions(options || []);
      setQuery("");
    }
  };

  // Clear all selections
  // const handleClearAll = () => {
  //   setSelectedOptions([]);
  //   onChange([]);
  // };

  // const handleRemove = (item: Option) => {
  //   const updatedSelection = selectedOptions.filter(
  //     (x) => x.value !== item.value
  //   );

  //   setSelectedOptions([...updatedSelection]);
  //   onChange(updatedSelection);
  // };

  const labelString = selectedOptions.map((o) => o.label).join(", ");

  return (
    <div className={`flex flex-col relative ${className ? className : ""}`}>
      {label ? (
        <label htmlFor={name} className="text-sm text-dark-700 mb-1.5">
          {capitalizeFirstLetter(label)} {required && "*"}
        </label>
      ) : (
        ""
      )}

      <div
        className={twMerge(
          "relative flex items-center flex-wrap min:h-10 h-fit max-h-32 overflow-y-scroll px-3  border outline-none focus:border-zana-grey-200 rounded-md focus-visible:border-dark-700 text-inherit w-full",
          touched && errorMessage ? "border-red-500" : "border-zana-grey-200 "
        )}
        id={triggerId}
      >
        <p className={labelString ? "pt-2" : ""}>{labelString}</p>
        <input
          type="text"
          name={name}
          placeholder={`${labelString ? "" : placeholder || `Select ${label}`}`}
          value={query}
          onChange={handleInputChange}
          onClick={handleDropdownToggle}
          onBlur={onBlur}
          disabled={disabled}
          className={twMerge(`h-10 outline-none  text-inherit w-full`)}
        />
        <div
          onClick={handleDropdownToggle}
          className={`absolute right-3  ${
            isOpen ? "rotate-180 transition-transform" : "rotate-0 transition-transform"
          }`}
        >
          <IoIosArrowDown size={24} />
        </div>
      </div>
      <Portal isOpen={isOpen}>
        <div
          style={{
            top: `${position.top}px`,
            width: `${position.width}px`,
            right: `${position.right}px`,
          }}
          ref={elementRef}
          className="border border-zana-grey-300 fixed w-full bg-white rounded-md mt-2.5 z-[1001] min-h-[100px] h-fit max-h-[256px] overflow-y-scroll shadow-md"
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
        >
          {filteredOptions?.length > 0 ? (
            <>
              {filteredOptions.map((option) => (
                <div key={option.value} className="px-3 py-2 cursor-pointer hover:bg-jGreen-300">
                  <Checkbox
                    id={`${name}-${option.value}`}
                    name={`${name}-${option.value}`}
                    title={option.label}
                    checked={selectedOptions.some((item) => item.value === option.value)}
                    onChange={() => handleCheckboxChange(option)}
                  />
                </div>
              ))}
            </>
          ) : (
            <p className="p-5">{noOptionsText}</p>
          )}
        </div>
      </Portal>
      {note ? <p className="text-sm  mt-1">{note}</p> : null}
      {touched && errorMessage ? <p className="text-sm text-red-500 mt-1">{errorMessage}</p> : null}
    </div>
  );
};

export default MultiSelect;

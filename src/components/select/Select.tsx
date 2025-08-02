import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BarLoader, MoonLoader } from "react-spinners";
import Portal from "../portal";
import { Option } from "@/types";
import { usePositionedElement } from "@/hooks";
import { capitalizeFirstLetter } from "@/libs";
import { twMerge } from "tailwind-merge";
import { GoCheck } from "react-icons/go";

export interface SelectProps<T = unknown> {
  label: string;
  value: string;
  name: string;
  errorMessage?: string;
  disabled?: boolean;
  touched?: boolean;
  onChange: (option: Option<T>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  options: Option<T>[];
  className?: string;
  //For Async behaviour
  isLoading?: boolean;
  onInputChange?: (query: string) => void;
  onDropdownScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  loadingMore?: boolean;
  noOptionsText?: string;
  placeholder?: string;
  note?: string;
}

export const Select = <T,>({
  label,
  value,
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
  //Async
  isLoading = false,
  onInputChange,
  onDropdownScroll,
  loadingMore = false,
  noOptionsText = "No results found",
}: SelectProps<T>) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<Option<T>[]>(options);
  const ignoreBlurRef = useRef(false);
  const mouseDownOnOptionRef = useRef(false);

  const triggerId = name;

  const { elementRef, position, isPositioned } = usePositionedElement({
    triggerId,
    isOpen,
    onClose: () => setIsOpen(false),
  });

  // Sync query with selected value
  useEffect(() => {
    if (options?.length > 0 && value) {
      const currentValue = options?.find((x) => x.value === value)?.label || "";
      setQuery(currentValue);
    }
  }, [options, value]);

  const queryRef = useRef(query);

  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  // Update filtered options when options change (for async loading)
  useEffect(() => {
    if (options) {
      if (onInputChange) {
        setFilteredOptions(options);
      } else if (query) {
        setFilteredOptions(
          options.filter((opt) => opt?.label?.toLowerCase().includes(query.toLowerCase()))
        );
      } else {
        setFilteredOptions(options);
      }
    }
  }, [options, query, onInputChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    ignoreBlurRef.current = false;

    // If external input change handler provided, use it
    if (onInputChange) {
      onInputChange(value);
    } else {
      // Otherwise do local filtering
      if (value) {
        setFilteredOptions(
          options.filter((opt) => opt?.label?.toLowerCase().includes(value.toLowerCase()))
        );
      } else {
        setFilteredOptions(options);
      }
    }
  };

  const handleSelect = (option: Option<T>) => {
    onChange(option);
    setQuery(option.label);
    setIsOpen(false);
    ignoreBlurRef.current = true;
  };

  const handleDropdownToggle = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsOpen(!isOpen);
    if (!isOpen) {
      // When opening dropdown, show initial options
      if (!onInputChange) {
        setFilteredOptions(options);
      }
    }
  };

  const hasQueryHandler = () => {
    //FOR INPUT BLUR AND AUTOFILL
    const exactMatch = options.find((opt) => opt.label.toLowerCase() === query.toLowerCase());

    if (exactMatch) {
      handleSelect(exactMatch);
    } else {
      const partialMatches = options.filter((opt) =>
        opt.label.toLowerCase().includes(query.toLowerCase())
      );

      if (partialMatches.length === 1) {
        handleSelect(partialMatches[0]);
      } else {
        const currentOption = options.find((opt) => opt.value === value);
        if (currentOption) {
          setQuery(currentOption.label);
        } else {
          setQuery("");
        }
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Delay blur handling to allow click events to process first
    setTimeout(() => {
      if (ignoreBlurRef.current || mouseDownOnOptionRef.current) {
        mouseDownOnOptionRef.current = false;
        if (onBlur) {
          onBlur(e);
        }
        return;
      }

      if (query) {
        hasQueryHandler();
      }

      if (!query && value) {
        const currentOption = options.find((opt) => opt.value === value);
        if (currentOption) {
          setQuery(currentOption.label);
        }
      }

      if (onBlur) {
        onBlur(e);
      }
    }, 100);
  };

  // Handle scroll to stop propagation and for infinite scrolling
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (onDropdownScroll) {
      onDropdownScroll(e);
    }
  };

  return (
    <div className={`flex flex-col relative ${className ? className : ""}`}>
      <label htmlFor={name} className="text-sm text-dark-700 mb-1.5">
        {capitalizeFirstLetter(label)} {required && "*"}
      </label>

      <div className="relative flex items-center" id={triggerId}>
        <input
          type="text"
          name={name}
          placeholder={`${placeholder || `Select ${label}`}`}
          required={required}
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            if (!isOpen) {
              handleDropdownToggle();
            }
          }}
          onBlur={handleBlur}
          disabled={disabled}
          className={twMerge(
            `h-10 px-3 py-2 border outline-none focus:border-zana-grey-200 rounded-md focus-visible:border-dark-700 text-inherit w-full`,
            touched && errorMessage ? "border-red-500" : "border-zana-grey-200 "
          )}
        />
        <div
          onMouseDown={(e) => {
            e.preventDefault(); // Prevent input blur
            handleDropdownToggle(e);
          }}
          className={`absolute right-3 cursor-pointer ${
            isOpen ? "rotate-180 transition-transform" : "rotate-0 transition-transform"
          }`}
        >
          <IoIosArrowDown size={24} />
        </div>
        {isLoading && (
          <div className="absolute right-10">
            {" "}
            <MoonLoader color="#414651" loading={isLoading} size={20} />
          </div>
        )}
      </div>
      <Portal isOpen={isOpen} isPositioned={isPositioned}>
        <div
          style={{
            top: `${position.top}px`,
            width: `${position.width}px`,
            right: `${position.right}px`,
          }}
          ref={elementRef}
          className="border border-zana-grey-300 fixed w-full bg-white rounded-md mt-2.5 z-[1001] min-h-[100px] h-fit max-h-[256px] overflow-y-scroll shadow-md"
          onScroll={handleScroll}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
        >
          {filteredOptions?.length > 0 ? (
            <>
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    mouseDownOnOptionRef.current = true;
                    handleSelect(option);
                  }}
                  className="px-3 py-2 cursor-pointer hover:bg-zana-grey-500 relative flex items-center list-none"
                >
                  {option.label}
                  {option.value === value ? (
                    <span className="size={30} text-green-500 absolute right-4">
                      <GoCheck />
                    </span>
                  ) : (
                    ""
                  )}
                </li>
              ))}

              {/* Loading more indicator at bottom of list */}
              {loadingMore && (
                <div className="flex justify-center items-center py-3 w-full">
                  <BarLoader color="#23653A" loading={loadingMore} />
                </div>
              )}
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

export default Select;

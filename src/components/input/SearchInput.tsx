import { useAsyncDebounce } from "@/hooks";
import { Dispatch, SetStateAction, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

interface SearchInputProps {
  name?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

export const SearchInput = ({
  name = "search",
  placeholder = "Search ...",
  disabled = false,
  setSearchQuery,
  className,
}: SearchInputProps) => {
  const [value, setValue] = useState("");
  const onChange = useAsyncDebounce((value) => {
    setSearchQuery(value);
  }, 2000);
  return (
    <div className={`relative flex items-center w-full ${className ? className : ""}`}>
      <input
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          const value = e.target.value;
          setValue(value);
          onChange(value);
        }}
        disabled={disabled}
        className={`h-10 pl-10 pr-3 py-2 border outline-none focus:border-zana-grey-200 rounded-md focus-visible:border-dark-700 text-inherit appearance-none w-full flex items-center`}
      />
      <IoSearchSharp size={24} className="text-gray-500 absolute left-3" />
    </div>
  );
};

export default SearchInput;

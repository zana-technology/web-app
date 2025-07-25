import { capitalizeFirstLetter } from "@/libs";
import { useState } from "react";
import { BsCheck } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";

export interface TagInputProps {
  label?: string;
  placeholder?: string;
  name: string;
  errorMessage?: string;
  disabled?: boolean;
  touched?: boolean;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  inputClass?: string;
  tags: string[];
  setTags: (tags: string[]) => void;
  suggestionData?: string[];
  note?: string;
}

export const Taginput = ({
  label,
  placeholder,
  name,
  required = false,
  onBlur,
  errorMessage,
  touched,
  disabled = false,
  tags,
  setTags,
  suggestionData,
  note,
}: TagInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [clickedSuggestion, setClickedSuggestion] = useState(false);
  const [filteredData, setFilteredData] = useState<string[]>([]);

  const filterData = (text: string) => {
    if (suggestionData && suggestionData?.length > 0) {
      return suggestionData.filter(
        (item) => item?.toLowerCase()?.includes(text)
        //   handleFilter(item, text?.toLowerCase())
      );
    }
  };

  //Add tags
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key, currentTarget } = event;
    const value = currentTarget.value;

    if (key === "Enter") {
      event.preventDefault();
      if (value !== "") {
        const multiTags = inputValue.split(",");

        if (inputValue.includes(",")) {
          const newTags = multiTags.filter((item) => !tags.includes(item.trim()));
          setTags([...tags, ...newTags.map((tag) => tag.trim())]);
        } else if (!tags.includes(inputValue.trim())) {
          setTags([...tags, inputValue.trim()]);
        }

        setInputValue("");
      }
    } else if (key === "Backspace" && tags.length && value.length === 0) {
      event.preventDefault();
      const tagsCopy = [...tags];
      tagsCopy.pop();
      setTags(tagsCopy);
    }
  };

  const handleAddTagClick = () => {
    if (inputValue.trim()) {
      const multiTags = inputValue.split(",");
      const newTags = multiTags.filter((item) => !tags.includes(item.trim()));
      setTags([...tags, ...newTags.map((tag) => tag.trim())]);
      setInputValue("");
    }
  };

  //Remove tags
  const removeTags = (index: number) => {
    setTags([...tags.filter((tag) => tags.indexOf(tag) !== index)]);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    setInputValue(text);
    if (text && text.length > 0 && suggestionData && suggestionData?.length > 0) {
      setFilteredData(filterData(text) as string[]);
    } else {
      setFilteredData([]);
    }
    setMenuVisible(true);

    if (inputValue === "") {
      setMenuVisible(false);
    }
  };

  const onBlurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onBlur) onBlur(event);
    if (event.target.value !== "" && !clickedSuggestion) {
      const multiTags = inputValue.split(",");

      if (inputValue.includes(",")) {
        setTags(tags.concat(multiTags.filter((item) => tags.indexOf(item) < 0)));
      } else if (!tags.includes(inputValue)) {
        setTags([...tags, inputValue]);
      }

      setInputValue("");
    }
  };

  const suggestionClickHandler = (e: React.MouseEvent<HTMLDivElement>, item: string) => {
    e.preventDefault();
    e.stopPropagation();
    setClickedSuggestion(true);
    if (!tags.includes(item)) {
      // arr.push(str);
      setTags([...tags, item]);
    }
    setInputValue("");
    setMenuVisible(false);
    setTimeout(() => {
      setClickedSuggestion(false);
    }, 10);
  };
  return (
    <div>
      {label ? (
        <label htmlFor={name} className="text-sm text-dark-700 mb-1.5">
          {capitalizeFirstLetter(label)} {required && "*"}
        </label>
      ) : (
        ""
      )}
      <div className="flex flex-wrap gap-4">
        <div className="w-full flex flex-wrap gap-3 mb-2">
          {tags.map((tag, index) => (
            <div
              className="h-10 flex items-center text-sm bg-zana-primary-light text-zana-primary-normal px-3 py-2 rounded-full cursor-pointer gap-4"
              key={index}
            >
              <span>{tag}</span>
              <i onClick={() => removeTags(index)}>
                <MdClose className="hover:text-red-500" />
              </i>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <input
              type="text"
              id={name}
              name={name}
              placeholder={`${placeholder || `Enter ${label}`}`}
              required={required}
              value={inputValue}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              disabled={disabled}
              className={twMerge(
                `outline-none h-10 w-30 px-3 py-2 rounded-full text-sm text-inherit appearance-none border border-zana-primary-normal
          [&::-webkit-outer-spin-button]:appearance-none 
          [&::-webkit-inner-spin-button]:appearance-none 
          [&::-moz-appearance]:textfield`
              )}
              onKeyDown={handleKeyDown}
              onFocus={() => setClickedSuggestion(false)}
            />
            <BsCheck size={30} className="text-zana-primary-normal" onClick={handleAddTagClick} />
            {menuVisible && filteredData && suggestionData && suggestionData?.length > 0 ? (
              <div>
                <p className="mb-1 text-sm">Suggestions</p>
                <div className="flex gap-1 flex-wrap">
                  {filteredData.map((item, i) => (
                    <div
                      key={i}
                      onMouseDown={(e) => suggestionClickHandler(e, item)}
                      className="p-1 text-sm cursor-pointer bg-dark-700 text-white rounded"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {note ? <p className="text-sm  mt-1">{note}</p> : null}
        {touched && errorMessage ? (
          <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
        ) : null}
      </div>
    </div>
  );
};

export default Taginput;

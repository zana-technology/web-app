import { Option } from "@/types";
import Checkbox from "./Checkbox";

interface CheckboxGroupProps {
  options: Option[];
  name: string;
  onChange: (option: string[]) => void;
  value: string[];
  label: string;
  errorMessage?: string;
  disabled?: boolean;
  touched?: boolean;
}

export const CheckboxGroup = ({
  options,
  name,
  onChange,
  value,
  label,
  errorMessage,
  touched,
}: CheckboxGroupProps) => {
  const handleSelect = (option: string[]) => {
    onChange(option);
  };

  return (
    <div>
      <p className="text-xs mb-2 pl-4 text-zana-primary-normal">{label}</p>
      <div className="flex gap-3 flex-wrap items-center p-5 bg-zana-grey-200 rounded-lg border border-dashed border-zana-grey-300">
        {options?.map((x, i) => (
          <Checkbox
            name={name}
            title={x?.label}
            id={`${name}-${i}`}
            onChange={(e) => {
              const isChecked = e.target.checked;
              const checkedOptions = isChecked
                ? [...value, x.value]
                : value.filter((f) => f !== x.value);
              handleSelect(checkedOptions);
            }}
            key={i}
            checked={value.includes(x.value)}
          />
        ))}
      </div>
      {touched && errorMessage ? (
        <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
      ) : null}
    </div>
  );
};

export default CheckboxGroup;

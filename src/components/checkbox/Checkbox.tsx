import { BsCheck } from "react-icons/bs";

interface CheckboxProps {
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  id: string;
  name: string;
  className?: string;
  checked: boolean;
}
export const Checkbox = ({ title, checked, onChange, id, name, className }: CheckboxProps) => {
  return (
    <label
      htmlFor={id}
      className={`flex min-w-full gap-2 items-center relative cursor-pointer ${
        className ? className : ""
      }`}
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />
      <span
        className={`w-6 h-6 border border-zana-grey-200 bg-white rounded relative flex items-center justify-center text-sm cursor-pointer transition-colors duration-200 ease-in-out peer-checked:bg-zana-primary-normal peer-checked:text-white  peer-checked:border-zana-prbg-zana-primary-normal `}
      >
        {checked && <BsCheck size={20} />}
      </span>

      <p className="flex-1">{title}</p>
    </label>
  );
};

export default Checkbox;

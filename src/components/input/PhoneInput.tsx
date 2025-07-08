import { capitalizeFirstLetter } from '@/libs';
import { FocusEvent } from 'react';
import PhoneInputMain, { Country } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { twMerge } from 'tailwind-merge';

type Tagged<A, T> = A & { __tag: T };
type E164Number = Tagged<string, 'E164Number'>;

export interface PhoneInputProps {
  label: string;
  value: string;
  name: string;
  errorMessage?: string;
  disabled?: boolean;
  touched?: boolean;
  onChange: (value?: E164Number | undefined) => void;
  onBlur?: (event: FocusEvent<HTMLElement, Element>) => void;
  required?: boolean;
  defaultCountry?: Country;
  onCountryChange?: (country?: Country) => void;
  note?: string;
}

export const PhoneInput = ({
  label,
  value,
  name,
  required = false,
  onChange,
  onBlur,
  errorMessage,
  defaultCountry = 'NG',
  onCountryChange,
  touched,
  note,
}: PhoneInputProps) => {
  return (
    <div className="flex flex-col relative">
      {label ? (
        <label htmlFor={name} className="text-sm text-dark-700 mb-1.5">
          {capitalizeFirstLetter(label)} {required && '*'}
        </label>
      ) : (
        ''
      )}
      <PhoneInputMain
        placeholder={`Enter ${capitalizeFirstLetter(label)}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        id={name}
        defaultCountry={defaultCountry}
        onCountryChange={onCountryChange}
        className={twMerge(
          'h-10 px-3 py-2 border outline-none focus:border-zana-grey-200 rounded-md focus-visible:border-dark-700 text-inherit appearance-none w-full',
          touched && errorMessage ? 'border-red-500' : 'border-zana-grey-200'
        )}
        required={required}
      />
      {note ? <p className="text-sm  mt-1">{note}</p> : null}
      {touched && errorMessage ? <p className="text-xs text-red-500 mt-1">{errorMessage}</p> : null}
    </div>
  );
};

export default PhoneInput;

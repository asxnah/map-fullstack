import { InputHTMLAttributes } from 'react';
import PhoneInput from 'react-phone-input-2';

export interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'placeholder' | 'id'
  > {
  label: string;
  id: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'tel' | 'email';
  required?: boolean;
  onTelChange?: (value: string) => void;
  telValue?: string;
}

export const Input = ({
  label,
  id,
  placeholder,
  onTelChange,
  telValue,
  type = 'text',
  required = false,
  name = id,
  ...rest
}: InputProps) => {
  return (
    <div className='grid gap-1 py-2 px-3 bg-[#f8f9fa] dark:bg-[#495057] rounded-xl'>
      <label
        htmlFor={id}
        className={`text-sm dark:text-[#f8f9fa] ${required ? 'relative after:content-["*"] after:ml-1 after:text-[#e5383b]' : ''}`}
      >
        {label}
      </label>

      {
        type === 'tel' ? (
          <PhoneInput
            placeholder={placeholder}
            inputClass='text-base dark:text-[#f8f9fa] dark:placeholder:text-[#adb5bd] focus-visible:outline-none'
            value={telValue}
            onChange={onTelChange}
            specialLabel=''
            country={'ru'}
            onlyCountries={['ru']}
            disableInitialCountryGuess={true}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            className='text-base dark:text-[#f8f9fa] dark:placeholder:text-[#adb5bd] focus-visible:outline-none'
            {...rest}
          />
        )
      }
    </div >
  );
};

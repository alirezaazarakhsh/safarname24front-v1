import { twMerge } from 'tailwind-merge';
import { convertToEnglishDigits } from '@/utils';
import { get, useFormContext, FieldError } from 'react-hook-form';

type Props = {
  name: string;
  type?: string;
  isPhone?: boolean;
  className?: string;
  placeholder?: string;
  isNationalId?: boolean;
};

// ------------------------------

export function Input({
  name,
  type = 'text',
  className,
  isNationalId,
  placeholder,
  isPhone = false,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name) as FieldError | undefined;

  const { onChange, ...rest } = register(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (isPhone || isNationalId) {
      value = convertToEnglishDigits(value).replace(/[^\d]/g, '');
      if (isPhone && value.length > 11) value = value.slice(0, 11);
      if (isNationalId && value.length > 10) value = value.slice(0, 10);
    }

    onChange({ target: { name, value } });
  };

  const handleBeforeInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (isPhone || isNationalId) {
      const inputEvent = e as unknown as InputEvent;
      if (inputEvent.data && /[^\d۰-۹]/.test(inputEvent.data)) {
        e.preventDefault();
      }
    }
  };

  return (
    <div className="w-full">
      <input
        {...rest}
        type={type}
        autoComplete='off'
        onChange={handleChange}
        placeholder={placeholder}
        onBeforeInput={handleBeforeInput}
        maxLength={isPhone ? 11 : isNationalId ? 10 : undefined}
        className={twMerge(
          'bg-zinc-100/50 w-full h-10 text-zinc-600 text-[0.8rem] font-semibold px-4 border outline-none rounded-lg transition-all placeholder:font-medium',
          error ? 'border-cs-red' : '',
          className,
        )}
      />

      {error?.message && (
        <p className="text-cs-red text-xs font-medium mt-1.5">
          {error.message}
        </p>
      )}
    </div>
  );
}

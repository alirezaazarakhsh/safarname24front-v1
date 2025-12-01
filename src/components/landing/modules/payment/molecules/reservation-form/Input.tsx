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
        autoComplete="off"
        onChange={handleChange}
        placeholder={placeholder}
        onBeforeInput={handleBeforeInput}
        maxLength={isPhone ? 11 : isNationalId ? 10 : undefined}
        className={twMerge(
          'h-10 w-full rounded-lg border bg-zinc-100/50 px-3.5 text-[0.8rem] font-semibold text-zinc-600 outline-none transition-all placeholder:font-medium',
          error ? 'border-cs-red' : '',
          className,
        )}
      />

      {error?.message && (
        <p className="mt-1.5 text-xs font-medium text-cs-red">
          {error.message}
        </p>
      )}
    </div>
  );
}

// Importing part
import { NormalInputComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';

// Creating and exporting NormalInput component as default
export default function NormalInput({
  error,
  className,
  wholeClassName,
  required,
  placeholder,
  noErrorText = false,
  ...props
}: NormalInputComponentPropsType): ReactNode {
  // Returning JSX
  return (
    <div className={cn('w-full', wholeClassName)}>
      <input
        required={required}
        placeholder={required ? `* ${placeholder}` : placeholder}
        data-errored={error ? true : false}
        className={cn(
          'px-4 py-4 h-[50px] w-full block bg-white placeholder:text-black/50 text-black/50 focus:text-black border-2 border-black/10 lg:rounded-lg rounded-[8px] lg:text-cs65 text-[10px] lg:placeholder:text-cs65 placeholder:text-[10px] lg:font-medium font-semibold lg:placeholder:font-medium placeholder:font-semibold  transition-all duration-500 focus:border-black focus:placeholder:text-black data-[errored="true"]:border-cs-red data-[errored="true"]:focus:border-cs-red data-[errored="true"]:text-cs-red disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
      {error && !noErrorText && (
        <p className="text-cs07 font-medium text-cs-red block text-right mt-2">
          {error}
        </p>
      )}
    </div>
  );
}

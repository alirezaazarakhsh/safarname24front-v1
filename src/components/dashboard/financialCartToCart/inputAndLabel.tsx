// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { Label } from '@/components/ui/label';
import { InputAndLabelPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';

// Creating and exporting InputAndLabel component as default
export default function InputAndLabel({
  error,
  placeholder,
  validation,
  label,
  className,
  id,
  ...props
}: InputAndLabelPropsType): ReactNode {
  // Returning JSX
  return (
    <div>
      <Label
        className="text-xs font-bold mb-3 block truncate text-right w-full"
        htmlFor={id}
      >
        {label}
      </Label>
      {validation ? (
        <div className="flex items-center justify-between gap-3 border border-black/10 rounded-lg overflow-hidden p-3 h-[50px]">
          <input
            id={id}
            placeholder={placeholder}
            data-errored={error !== undefined}
            className={cn(
              'w-full block outline-0 border-0 bg-white text-xs font-normal text-black placeholder:text-xs placeholder:text-black/50',
              className,
            )}
            {...props}
          />
          <div className="bg-gray-100 rounded-md px-5 py-1.5 flex items-center justify-center shrink-0">
            <span className="text-xs font-normal text-black/50">
              {validation}
            </span>
          </div>
        </div>
      ) : (
        <input
          id={id}
          placeholder={placeholder}
          data-errored={error !== undefined}
          className={cn(
            'w-full block outline-0 bg-white text-xs font-normal text-black placeholder:text-xs placeholder:text-black/50 border border-black/10 rounded-lg overflow-hidden p-3 h-[50px]',
            className,
          )}
          {...props}
        />
      )}
    </div>
  );
}

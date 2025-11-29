// Forcing next.js to render this component as client side component
'use client';

// Importing part
import DatePicker from '@/components/dashboard/ui/datePicker';
import { Button } from '@/components/ui/button';
import { ReactNode, useState } from 'react';
import { cn } from '@/utils/utils';
import { Label } from '@/components/ui/label';
import { DatePickerInputComponentPropsType } from '@/types/dashboard/component';

// Creating and exporting DatePickerInput component as default
export default function DatePickerInput({
  onChange,
  label,
  error,
  className,
  placeholder,
  value,
  disabled = false
}: DatePickerInputComponentPropsType): ReactNode {
  // Defining states of component
  const [isDatePickerOpened, setDatePickerOpened] = useState<boolean>(false);

  // Defining variables
  const valueIsEmpty = value === undefined || value === "" || value.startsWith(" ");

  // Returning JSX
  return (
    <div className="w-full">
      <Label className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
        {label}
      </Label>
      <Button
        data-errored={error !== undefined}
        onClick={() => !disabled && setDatePickerOpened(true)}
        type="button"
        disabled={disabled}
        className={cn(
          'gap-3 border border-black/10 data-[errored=true]:border-cs-red rounded-lg overflow-hidden p-3 h-[50px] group transition-all duration-500 w-full block bg-white hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed',
          className,
        )}
      >
        <span
          className={cn(
            'w-full block outline-0 border-0 bg-white text-xs text-right truncate',
            !valueIsEmpty
              ? 'text-black'
              : 'text-black/50',
          )}
        >
          {!valueIsEmpty
            ? value
            : placeholder}
        </span>
      </Button>
      {
        !disabled && (
          <DatePicker
            isOpened={isDatePickerOpened}
            closeFn={() => setDatePickerOpened(false)}
            disableFuture
            onSubmit={(date) => onChange?.(date)}
          />
        )
      }
    </div>
  );
}

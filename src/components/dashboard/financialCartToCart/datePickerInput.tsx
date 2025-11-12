// Forcing next.js to render this component as client side component
'use client';

// Importing part
import moment from 'jalali-moment';
import DatePicker from '@/components/dashboard/ui/datePicker';
import { Button } from '@/components/ui/button';
import { ReactNode, useEffect, useState } from 'react';
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
}: DatePickerInputComponentPropsType): ReactNode {
  // Defining states of component
  const [isDatePickerOpened, setDatePickerOpened] = useState<boolean>(false);
  const [dateInputValueState, setDateInputValueState] = useState<
    moment.Moment | undefined
  >(undefined);

  // Attaching onChange prop to component
  useEffect(() => {
    if (onChange && dateInputValueState) {
      onChange(dateInputValueState);
    }
  }, [dateInputValueState, onChange]);

  // Returning JSX
  return (
    <div className="w-full">
      <Label className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
        {label}
      </Label>
      <Button
        data-errored={error !== undefined}
        onClick={() => setDatePickerOpened(true)}
        type="button"
        className={cn(
          'gap-3 border border-black/10 rounded-lg overflow-hidden p-3 h-[50px] group transition-all duration-500 w-full block bg-white hover:bg-white',
          className,
        )}
      >
        <span
          className={cn(
            'w-full block outline-0 border-0 bg-white text-xs text-right truncate',
            dateInputValueState
              ? 'text-black'
              : 'group-data-[errored="false"]:text-black/50 group-data-[errored="true"]:text-cs-red',
          )}
        >
          {dateInputValueState
            ? dateInputValueState.clone().locale('fa').format('jYYYY/jMM/jDD')
            : placeholder}
        </span>
      </Button>
      <DatePicker
        isOpened={isDatePickerOpened}
        closeFn={() => setDatePickerOpened(false)}
        onSubmit={(date) => setDateInputValueState(date)}
      />
    </div>
  );
}

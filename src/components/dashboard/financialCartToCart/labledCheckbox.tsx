// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { Label } from '@/components/ui/label';
import { LabledCheckboxComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { Checkbox } from '@radix-ui/react-checkbox';
import { ReactNode, useEffect, useState } from 'react';

// Creating and exporting LabledCheckbox component as default
export default function LabledCheckbox({
  label,
  onChange,
  className,
  disabled = false,
}: LabledCheckboxComponentPropsType): ReactNode {
  // Defining states of component
  const [checkedState, setCheckedState] = useState<boolean>(false);

  // Using useEffect to append onChange state to component
  useEffect(() => onChange(checkedState), [checkedState, onChange]);

  // Returning JSX
  return (
    <div className={cn('flex items-center justify-start gap-3', className)}>
      <div className="relative lg:w-[25px] lg:h-[25px] w-[20px] h-[20px] shrink-0 aspect-square pointer-events-none text-blue-600">
        <Checkbox
          disabled={disabled}
          checked={checkedState}
          data-checked={checkedState}
          onClick={() => setCheckedState((prev) => !prev)}
          className={
            'shrink-0 lg:w-[25px] lg:h-[25px] w-[20px] h-[20px] rounded-md bg-gray-100 cursor-pointer'
          }
        />
        <IconsaxIcons
          name="TickSquare"
          variant={'Outline'}
          color="currentColor"
          data-checked={checkedState}
          className="w-[13px] h-[13px] aspect-square absolute transition-all duration-500 top-[50%] left-[50%] block -translate-y-[50%] -translate-x-[50%] data-[checked='false']:opacity-0 data-[checked='true']:opacity-100 pointer-events-none"
        />
      </div>
      <Label
        className="block text-right font-semibold text-black truncate cursor-pointer text-xs"
        onClick={() => setCheckedState((prev) => !prev)}
      >
        {label}
      </Label>
    </div>
  );
}

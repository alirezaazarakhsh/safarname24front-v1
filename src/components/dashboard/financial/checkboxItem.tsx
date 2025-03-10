// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { Checkbox } from '@radix-ui/react-checkbox';
import { CheckboxItemComponentPropsType } from '@/types/dashboard/component';
import { ReactNode, useRef } from 'react';
import { cn } from '@/utils/utils';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

// Creating and exporting CheckboxItem component as default
export default function CheckboxItem({
  title,
  disabled = false,
  onClick,
  checked,
}: CheckboxItemComponentPropsType): ReactNode {
  // Defining refrences
  const checkboxRef = useRef<HTMLButtonElement | null>(null);

  // Returning JSX
  return (
    <div
      tabIndex={!disabled ? 0 : -1}
      data-disabled={disabled}
      className="bg-white rounded-lg border px-3 py-4 flex items-center justify-between gap-3 cursor-pointer"
      onClick={() => {
        if (!disabled) {
          const checkboxElement = checkboxRef.current;
          if (checkboxElement) checkboxElement.click();
        }
      }}
    >
      <div className="flex items-center justify-between gap-2 overflow-hidden">
        <div className="relative w-[30px] h-[30px] shrink-0 aspect-square text-gray-500 pointer-events-none">
          <Checkbox
            ref={checkboxRef}
            disabled={disabled}
            checked={checked}
            onClick={onClick}
            className="shrink-0 bg-gray-100 h-[30px] w-[30px] rounded-md"
          />
          <IconsaxIcons
            name="TickSquare"
            variant="Bold"
            color="currentColor"
            data-checked={checked}
            className="w-[15px] h-[15px] aspect-square absolute transition-all duration-500 top-[50%] left-[50%] block -translate-y-[50%] -translate-x-[50%] data-[checked='false']:opacity-0 data-[checked='true']:opacity-100 pointer-events-none"
          />
        </div>
        <span className="text-cs06 font-normal truncate block text-right text-black">
          {title}
        </span>
      </div>
      <div
        className={cn(
          'px-4 flex items-center justify-center rounded-md h-[30px] transition-all duration-500',
          disabled || !checked
            ? 'bg-gray-100 text-black'
            : 'bg-blue-50 text-blue-600',
        )}
      >
        <span className="text-cs65 font-medium text-current">
          {disabled ? 'قفل میباشد' : checked ? 'انتخاب شد' : 'انتخواب نشده'}
        </span>
      </div>
    </div>
  );
}

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
  disabledReason,
  isCardSelection = false,
  className,
}: CheckboxItemComponentPropsType): ReactNode {
  // Defining refrences
  const checkboxRef = useRef<HTMLButtonElement | null>(null);

  // Returning JSX
  return (
    <div
      tabIndex={!disabled ? 0 : -1}
      data-disabled={disabled}
      className={cn(
        'bg-white group lg:h-auto h-[64px] lg:rounded-[10px] rounded-[12px] border lg:px-3 lg:py-4 px-[12px] py-[12px] flex items-center justify-between gap-3 cursor-pointer w-full',
        className,
      )}
      onClick={() => {
        if (!disabled) {
          const checkboxElement = checkboxRef.current;
          if (checkboxElement) checkboxElement.click();
        }
      }}
    >
      <div className="flex items-center justify-between gap-2 ">
        <div
          className={cn(
            'relative lg:w-[30px] lg:h-[30px] w-[25px] h-[25px] shrink-0 aspect-square pointer-events-none',
            isCardSelection ? 'text-blue-600' : 'text-gray-500',
          )}
        >
          {disabled && isCardSelection && disabledReason && (
            <div className="p-2 lg:rounded-md rounded-[6px] bg-[#FFE9EB] text-cs-red absolute bottom-[calc(75%+20px)] lg:right-[-15px] right-[-10px] lg:w-[200px] w-[218px] transition-all duration-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
              <p className="text-right text-current lg:font-light font-medium lg:text-[9px] text-[8px]">
                {disabledReason}
              </p>
              <div className="absolute top-full -translate-y-[50%] right-[20px] w-[15px] h-[15px] bg-[#FFE9EB] rotate-45" />
            </div>
          )}
          <Checkbox
            ref={checkboxRef}
            disabled={disabled}
            checked={checked}
            onClick={onClick}
            data-checked={checked}
            className={cn(
              'shrink-0 lg:w-[30px] lg:h-[30px] w-[25px] h-[25px] rounded-md',
              isCardSelection
                ? 'transition-all duration-500 data-[checked="true"]:bg-blue-100 data-[checked="false"]:bg-gray-100 disabled:bg-gray-100 '
                : 'bg-gray-100',
            )}
          />
          <IconsaxIcons
            name={disabled ? 'InfoCircle' : 'TickSquare'}
            variant={isCardSelection ? 'Outline' : 'Bold'}
            color={!disabled ? 'currentColor' : 'black'}
            data-checked={checked}
            className={cn(
              'w-[15px] h-[15px] aspect-square absolute transition-all duration-500 top-[50%] left-[50%] block -translate-y-[50%] -translate-x-[50%] pointer-events-none',
              !disabled &&
                "data-[checked='false']:opacity-0 data-[checked='true']:opacity-100",
            )}
          />
        </div>
        <span className="text-[12px] font-semibold truncate block text-right text-black">
          {title}
        </span>
      </div>
      <div
        className={cn(
          'px-4 flex items-center justify-center rounded-md lg:h-[30px] h-[34px] transition-all duration-500 w-[95px] shrink-0',
          disabled || !checked
            ? 'bg-gray-100 text-black'
            : 'bg-blue-50 text-blue-600',
        )}
      >
        <span className="text-[11px] font-semibold text-current text-center truncate block">
          {disabled
            ? isCardSelection
              ? 'غیر قعال'
              : 'قفل میباشد'
            : checked
              ? 'انتخاب شد'
              : 'انتخاب نشده'}
        </span>
      </div>
    </div>
  );
}

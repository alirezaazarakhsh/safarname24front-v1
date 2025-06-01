// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { IconInputComponentPropsType } from '@/types/dashboard/component';
import { ReactNode, useState } from 'react';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { cn } from '@/utils/utils';

// Creating and exporting IconInput component as default
export default function IconInput({
  icon,
  wholeClassName,
  onFocus,
  onBlur,
  className,
  autoFocus,
  ...props
}: IconInputComponentPropsType): ReactNode {
  // Defining states of component
  const [isFocused, setFocused] = useState<boolean>(autoFocus || false);

  // Returning JSX
  return (
    <div
      data-focused={isFocused}
      className={cn(
        'bg-white lg:rounded-md rounded-[7px] flex items-center justify-between text-black lg:w-[200px] w-auto col-span-3 text-[#2b2b2b]',
        wholeClassName,
      )}
    >
      <div className="lg:h-8 h-[45px] aspect-square flex items-center justify-center">
        <IconsaxIcons
          name={icon}
          className="w-[18px] h-[18px] text-current shrink-0 aspect-square"
          color="currentColor"
        />
      </div>
      <input
        className={cn(
          'lg:h-8 h-10 lg:px-2 lg:py-2 px-[10px] py-[10px]  w-full block placeholder:text-[12px] text-[12px] placeholder:font-bold font-bold text-current placeholder:text-current outline-0 bg-transparent',
          className,
        )}
        autoFocus={autoFocus}
        onBlur={(e) => {
          setFocused(false);

          if (onBlur) onBlur(e);
        }}
        onFocus={(e) => {
          setFocused(true);

          if (onFocus) onFocus(e);
        }}
        {...props}
      />
    </div>
  );
}

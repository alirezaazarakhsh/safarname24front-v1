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
      className={cn(
        'bg-white lg:rounded-md rounded-[7px] flex items-center justify-between text-black lg:w-[200px] w-auto col-span-3',
        wholeClassName,
      )}
      data-focused={isFocused}
    >
      <div className="lg:h-8 h-10 aspect-square flex items-center justify-center">
        <IconsaxIcons
          name={icon}
          className="lg:h-3 lg:w-3 w-4 h-4 text-current shrink-0 aspect-square"
        />
      </div>
      <input
        className={cn(
          'lg:h-8 h-10 p-2 w-full block lg:placeholder:text-xs placeholder:text-[12px] lg:text-xs text-[12px] placeholder:font-normal font-normal text-current placeholder:text-current outline-0 bg-transparent',
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

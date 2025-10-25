// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { IconInputComponentPropsType } from '@/types/dashboard/component';
import { ReactNode, useState } from 'react';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { cn } from '@/utils/utils';
import { motion } from 'framer-motion';

// Creating and exporting IconInput component as default
export default function IconInput({
  icon,
  wholeClassName,
  onFocus,
  onBlur,
  className,
  autoFocus,
  onChange,
  ...props
}: IconInputComponentPropsType): ReactNode {
  // Defining states of component
  const [localValueState, setLocalValueState] = useState<string>('');
  const [isFocused, setFocused] = useState<boolean>(autoFocus || false);

  // Returning JSX
  return (
    <div
      data-focused={isFocused}
      className={cn(
        'bg-white lg:rounded-md rounded-[7px] flex items-center justify-between col-span-3 text-[#2b2b2b] px-[7px] gap-[5px]',
        wholeClassName,
      )}
    >
      <IconsaxIcons
        name={icon}
        className="w-[18px] h-[18px] text-current aspect-square"
        color="currentColor"
      />
      <input
        className={cn(
          'lg:h-8 h-10 lg:py-2 py-[10px]  flex-1 block placeholder:text-[12px] text-[12px] placeholder:font-semibold font-semibold text-current placeholder:text-current outline-0 bg-transparent',
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
        onChange={(e) => {
          onChange && onChange(e);
          setLocalValueState(e.target.value);
        }}
        value={localValueState}
        {...props}
      />
      {localValueState &&
        localValueState !== '' &&
        !localValueState.startsWith(' ') && (
          <motion.button
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            type="button"
            className="shrink-0"
            onClick={() => {
              setLocalValueState('');
            }}
          >
            <IconsaxIcons
              name={'CloseCircle'}
              className="w-[18px] h-[18px] text-current aspect-square"
              color="currentColor"
            />
          </motion.button>
        )}
    </div>
  );
}

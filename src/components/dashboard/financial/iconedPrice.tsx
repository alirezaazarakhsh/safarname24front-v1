// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { IconedPriceComponentPropsType } from '@/types/dashboard/component';
import { numberSeparation } from '@/utils';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

// Creating and exporting IconedPrice component as default
export default function IconedPrice({
  icon,
  price,
  title,
  className,
  onClick,
  selected,
  disabled = false,
}: IconedPriceComponentPropsType): ReactNode {
  // Returning part
  return (
    <div
      tabIndex={onClick && 0}
      onClick={!disabled ? onClick : undefined}
      data-selected={selected}
      data-disabled={disabled}
      className={cn(
        'bg-white rounded-lg border px-3 py-4 flex items-center justify-start gap-3 group',
        onClick
          ? "cursor-pointer transition-all duration-500 data-[selected='false']:text-black data-[selected='true']:text-blue-600 data-[selected='false']:text-black/ data-[selected='true']:border-blue-600 data-[disabled='true']:opacity-50 data-[disabled='false']:opacity-100 data-[disabled='true']:cursor-not-allowed"
          : 'text-black border-black/10',
        className,
      )}
    >
      <div
        className={cn(
          'w-[38px] h-[38px] rounded-md aspect-square overflow-hidden shrink-0 text-current',
          !onClick
            ? 'flex items-center justify-center overflow-hidden bg-gray-100'
            : 'group-data-[selected="false"]:bg-gray-100 group-data-[selected="true"]:bg-blue-50',
        )}
      >
        {onClick ? (
          <motion.div
            initial={{ transform: 'translateY(0)' }}
            exit={{ transform: 'translateY(0)' }}
            animate={
              !selected
                ? { transform: 'translateY(0)' }
                : { transform: 'translateY(-38px)' }
            }
            className="flex flex-col"
          >
            <div className="w-[38px] aspect-square flex items-center justify-center">
              <IconsaxIcons
                name={icon}
                className="w-[20px] h-[20px]"
                color="currentColor"
              />
            </div>

            <div className="w-[38px] aspect-square flex items-center justify-center">
              <IconsaxIcons
                name={'Verify'}
                className="w-[20px] h-[20px]"
                color="currentColor"
              />
            </div>
          </motion.div>
        ) : (
          <IconsaxIcons
            name={icon}
            className="w-[20px] h-[20px]"
            color="currentColor"
          />
        )}
        <div></div>
      </div>
      <div className="overflow-hidden w-full">
        <span className="text-cs75 font-semibold text-current truncate block text-right mb-1">
          {title}
        </span>
        <span className="text-cs75 font-semibold text-current truncate block text-right">
          {`${numberSeparation(price)} تومان`}
        </span>
      </div>
    </div>
  );
}

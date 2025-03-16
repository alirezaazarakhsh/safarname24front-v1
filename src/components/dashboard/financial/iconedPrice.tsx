// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { IconedPriceComponentPropsType } from '@/types/dashboard/component';
import { numberSeparation } from '@/utils';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@/hooks';

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
  // Defining hooks
  const isMobile = useMediaQuery('(max-width: 1024px)');

  // Returning part
  return (
    <div className="relative">
      <div
        tabIndex={onClick && 0}
        onClick={!disabled ? onClick : undefined}
        data-selected={selected}
        data-disabled={disabled}
        className={cn(
          'bg-white lg:h-auto h-[64px] lg:rounded-lg rounded-[12px] border lg:px-3 lg:py-4 px-[16px] py-[16px] flex items-center justify-start gap-3 group peer',
          onClick
            ? "cursor-pointer transition-all duration-500 data-[selected='false']:text-black data-[selected='true']:text-blue-600 data-[selected='false']:text-black/ data-[selected='true']:border-blue-600 data-[disabled='true']:opacity-50 data-[disabled='false']:opacity-100 data-[disabled='true']:cursor-not-allowed"
            : 'text-black border-black/10',
          className,
        )}
      >
        <div
          className={cn(
            'rounded-md aspect-square overflow-hidden shrink-0 text-current',
            !onClick
              ? 'flex items-center justify-center overflow-hidden lg:bg-gray-100 lg:w-[38px] lg:h-[38px]'
              : 'group-data-[selected="false"]:bg-gray-100 group-data-[selected="true"]:bg-blue-50 lg:w-[38px] lg:h-[38px] w-[43px] h-[43px]',
          )}
        >
          {onClick ? (
            <motion.div
              className="flex flex-col"
              initial={{ transform: 'translateY(0)' }}
              exit={{ transform: 'translateY(0)' }}
              animate={
                !selected
                  ? { transform: 'translateY(0)' }
                  : {
                      transform: !isMobile
                        ? 'translateY(-38px)'
                        : 'translateY(-43px)',
                    }
              }
            >
              <div className="lg:w-[38px] w-[43px] aspect-square flex items-center justify-center">
                <IconsaxIcons
                  name={icon}
                  className="w-[20px] h-[20px]"
                  color="currentColor"
                />
              </div>
              <div className="lg:w-[38px] w-[43px] aspect-square flex items-center justify-center">
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
        </div>
        <div className="overflow-hidden w-full lg:block flex items-center justify-between gap-3">
          <span className="lg:text-cs75 text-[12px] lg:font-semibold font-semibold text-current truncate block text-right lg:mb-1">
            {title} :
          </span>
          <p className="lg:text-right text-left truncate text-current">
            <span className="lg:text-cs75 text-[16px] lg:font-semibold font-bold text-current">
              {`${numberSeparation(price)} `}
            </span>
            <span className="lg:text-cs75 text-[12px] font-semibold text-current">
              تومان
            </span>
          </p>
        </div>
      </div>
      {disabled && (
        <div className="p-2 rounded-md bg-[#FFE9EB] text-cs-red absolute bottom-full left-[20px] w-[200px] transition-all duration-500 opacity-0 invisible peer-hover:opacity-100 peer-hover:visible">
          <p className="text-right text-current font-light text-[9px]">
            مشتری گرامی روش انتخابی روی (مبلغ دستی اضافه) قرار دادید نمیتوانید
            انتخاب کنید!
          </p>
          <div className="absolute top-full -translate-y-[50%] left-[20px] w-[15px] h-[15px] bg-[#FFE9EB] rotate-45" />
        </div>
      )}
    </div>
  );
}

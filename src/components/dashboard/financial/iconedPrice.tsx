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
import { Checkbox } from '@radix-ui/react-checkbox';

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
            ? "cursor-pointer transition-all duration-500 data-[selected='false']:text-black data-[selected='true']:text-blue-600 data-[selected='false']:text-black/ data-[selected='true']:border-blue-600 lg:data-[disabled='true']:opacity-50 lg:data-[disabled='false']:opacity-100 lg:data-[disabled='true']:cursor-not-allowed"
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
        {!onClick ? (
          <div className="overflow-hidden w-full lg:block flex items-center justify-between gap-3">
            <span className="lg:text-cs75 text-[12px] font-semibold text-current truncate block text-right lg:mb-1">
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
        ) : (
          <>
            <div className="overflow-hidden lg:w-auto w-full">
              <span className="lg:text-cs75 text-[12px] font-semibold text-current truncate block text-right mb-1">
                {title} :
              </span>
              <p className="lg:text-right truncate lg:text-cs75 text-[10px] font-semibold lg:group-data-[selected='true']:text-current lg:group-data-[selected='false']:text-current group-data-[selected='false']:text-gray-500 group-data-[selected='false']:text-current text-right">
                {`${numberSeparation(price)} تومان`}
              </p>
            </div>
            <div className="relative lg:w-[30px] lg:h-[30px] w-[25px] h-[25px] shrink-0 aspect-square text-blue-600/50 pointer-events-none lg:hidden block">
              <Checkbox
                disabled={disabled}
                checked={selected}
                onClick={onClick}
                className="shrink-0 bg-gray-100 lg:w-[30px] lg:h-[30px] w-[25px] h-[25px] rounded-md"
              />
              <IconsaxIcons
                name={disabled ? 'CloseSquare' : 'TickSquare'}
                variant="Bold"
                color={disabled ? '#4a5565' : 'currentColor'}
                data-selected={selected}
                className={cn(
                  'w-[15px] h-[15px] aspect-square absolute transition-all duration-500 top-[50%] left-[50%] block -translate-y-[50%] -translate-x-[50%] pointer-events-none',
                  !disabled &&
                    "data-[selected='false']:opacity-0 data-[selected='true']:opacity-100",
                )}
              />
            </div>
          </>
        )}
      </div>
      {disabled && (
        <div className="p-2 lg:rounded-md rounded-[6px] bg-[#FFE9EB] text-cs-red absolute lg:bottom-full bottom-[calc(75%+10px)] lg:left-[20px] left-[4px] lg:w-[200px] w-[218px] transition-all duration-500 opacity-0 invisible peer-hover:opacity-100 peer-hover:visible">
          <p className="text-right text-current lg:font-light font-medium lg:text-[9px] text-[8px]">
            مشتری گرامی روش انتخابی روی (مبلغ دستی اضافه) قرار دادید نمیتوانید
            انتخاب کنید!
          </p>
          <div className="absolute top-full -translate-y-[50%] left-[20px] w-[15px] h-[15px] bg-[#FFE9EB] rotate-45" />
        </div>
      )}
    </div>
  );
}

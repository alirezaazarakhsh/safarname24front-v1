// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { CreditCardDropDownPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { ReactNode, useEffect, useRef, useState } from 'react';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import useUserInfo from '@/hooks/dashboard/useUserInfo';
import BankIcon from '../ui/bankIcon';
import { numberSeparation } from '@/utils';
import { getBankFromCard } from '@/utils/string';

// Creating and exporting CreditCardDropDown component as default
export default function CreditCardDropDown({
  placeholder,
  className,
  onValueChange,
  hasIRIcon,
  disabled,
  useSheba = false,
  side = 'bottom',
  value,
  reset,
  ...props
}: CreditCardDropDownPropsType): ReactNode {
  // Defining hooks
  const [isOpened, setOpened] = useState<boolean>(false);
  const userInfo = useUserInfo();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = useState(0);

  // Using useEffect to set width of trigger
  useEffect(() => {
    if (triggerRef.current) {
      setOpened(false);
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [window.innerWidth]);

  // Defining a function to handle 4 by 4 sortings
  const seprateVal = (val: string | number): string =>
    numberSeparation(val.toString().replace(/\s+/g, ''), ' ', 4);

  // Returning JSX
  return (
    <DropdownMenu open={isOpened} onOpenChange={setOpened}>
      <DropdownMenuTrigger disabled={disabled} asChild>
        <button
          data-opened={isOpened}
          ref={triggerRef}
          className={cn(
            'bg-white transitaion-all duration-500 disabled:opacity-50 border border-black/10 rounded-lg flex items-center justify-between gap-3 p-3 text-black/50 data-[opened=true]:text-black data-[opened=true]:border-black',
            className,
          )}
          {...props}
        >
          <span
            dir={value && value !== '' ? 'ltr' : 'rtl'}
            className={
              'text-xs font-normal text-right truncate block text-current'
            }
          >
            {value && value !== '' ? seprateVal(value) : placeholder}
          </span>
          <div className="flex items-center justify-between gap-1 shrink-0 bg-transparent">
            {hasIRIcon && (
              <div
                className={
                  'w-[30px] h-[30px] flex items-center justify-center rounded-md bg-gray-100 text-black/50'
                }
              >
                <span className="text-cs06 block text-center truncate font-medium text-current -mb-0.5">
                  IR
                </span>
              </div>
            )}
            <div
              onPointerDown={(e) => {
                if (!disabled) {
                  e.stopPropagation();
                  reset && reset();
                }
              }}
              className={
                'w-[30px] h-[30px] transition-all duration-500 flex items-center justify-center rounded-md bg-gray-100 text-black/50 cursor-pointer'
              }
            >
              <IconsaxIcons
                color={'currentColor'}
                name={value && value !== '' ? 'TickSquare' : 'CloseSquare'}
                className="w-[15px] h-[15px]"
              />
            </div>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        style={{ width: triggerWidth }}
        side={side}
        className="shadow-black/10 border border-black/20 max-h-[150px] overflow-auto scrollbar-hide"
      >
        {userInfo.card_numbers.map((item, index) => (
          <DropdownMenuItem
            key={index}
            dir="ltr"
            onClick={() => {
              onValueChange && onValueChange(item.card_number, item.iban);
            }}
            className={
              'transition-all duration-500 hover:bg-gray-100 !cursor-pointer px-3 py-2 w-full flex items-center justify-start gap-3 [&:not(:last-of-type)]:border-b [&:not(:last-of-type)]:border-b-black/20'
            }
          >
            <div className="shrink-0 aspect-square w-[40px] h-[40px] flex items-center justify-center text-black border border-black/10 rounded-md">
              <BankIcon
                className="w-[20px] h-[20px]"
                name={
                  getBankFromCard(item.card_number.slice(0, 6))?.type || 'dey'
                }
              />
            </div>
            <div className="flex-1">
              <span className="text-cs65 font-semibold text-black truncate block text-left">
                {seprateVal(item.card_number)}
              </span>
              <p className="text-left truncate text-black/50 text-cs06 font-semibold">
                {seprateVal(item.iban)}
              </p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { CreditCardDropDownPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode, useEffect, useRef, useState } from 'react';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import useUserInfo from '@/hooks/dashboard/useUserInfo';
import BankIcon from '../ui/bankIcon';
import { numberSeparation } from '@/utils';
import { getBankFromCard } from '@/utils/string';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

// Creating and exporting CreditCardDropDown component as default
export default function CreditCardDropDown({
  placeholder,
  className,
  onValueChange,
  disabled,
  useSheba = false,
  useLegalInfo,
  side = 'bottom',
  value,
  reset,
  hideCreate = false,
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

  // Defining variables
  const dataToRender = useLegalInfo ? useLegalInfo : userInfo.card_numbers;
  const filtredData = dataToRender;

  // Conditional rendering
  if (useSheba) {
    return (
      <button
        ref={triggerRef}
        disabled={disabled || filtredData.length === 0}
        className={cn(
          'bg-white transitaion-all duration-500 disabled:opacity-50 border-[1.2px] border-black/10 rounded-lg flex items-center justify-between gap-3 p-3 text-black',
          className,
        )}
        {...props}
      >
        <span
          dir={value && value !== '' ? 'ltr' : 'rtl'}
          className={
            'lg:text-[12px] text-[10px] font-normal text-right truncate block text-current'
          }
        >
          {value && value !== '' ? seprateVal(value) : placeholder}
        </span>
        <div className="flex items-center justify-between gap-1 shrink-0 bg-transparent">
          <div
            className={
              'w-[30px] h-[30px] flex items-center justify-center rounded-md bg-gray-100 text-black/50'
            }
          >
            <span className="text-cs06 block text-center truncate font-medium text-current -mb-0.5">
              IR
            </span>
          </div>
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
    );
  } else {
    return (
      <DropdownMenu open={isOpened} onOpenChange={setOpened}>
        <DropdownMenuTrigger
          disabled={disabled || filtredData.length === 0}
          asChild
        >
          <button
            data-opened={isOpened}
            ref={triggerRef}
            className={cn(
              'bg-white transitaion-all duration-500 disabled:opacity-50 border-[1.2px] border-black/10 rounded-lg flex items-center justify-between gap-3 p-3 text-black data-[opened=true]:border-black group',
              className,
            )}
            {...props}
          >
            <span
              dir={value && value !== '' ? 'ltr' : 'rtl'}
              className={
                'lg:text-[12px] text-[10px] font-normal text-right truncate block text-current'
              }
            >
              {value && value !== '' ? seprateVal(value) : placeholder}
            </span>
            <div className="flex items-center justify-between gap-1 shrink-0 bg-transparent">
              <div
                className={
                  'w-[30px] h-[30px] flex items-center justify-center rounded-md bg-gray-100 text-black/50 cursor-pointer'
                }
              >
                <IconsaxIcons
                  color={'currentColor'}
                  name={'ArrowUp2'}
                  className="w-[15px] h-[15px] transition-all duration-300 group-data-[opened=false]:rotate-0 group-data-[opened=true]:rotate-180"
                />
              </div>
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
          className="shadow-black/10 border-[1.2px] border-black/20 max-h-[150px] overflow-auto scrollbar-hide"
        >
          <div className="p-3 border-b border-b-black/10" dir="rtl">
            <span className="text-right truncate block font-bold text-cs75">
              شماره کارت خود را انتخاب کنید.
            </span>
          </div>
          {side === 'top' && filtredData.length < 2 && !hideCreate && (
            <div className="p-3 border-b border-b-black/20">
              <Link
                href="/dashboard/financial/cart-to-cart"
                className="flex items-center justify-center gap-3 text-white px-4 py-2 rounded-lg bg-cs-blue w-full"
              >
                <IconsaxIcons
                  name="Add"
                  className="size-5 shrink-0"
                  color="currentColor"
                />
                <span className="text-cs07 font-normal text-current text-center truncate">
                  اضافه شماره کارت
                </span>
              </Link>
            </div>
          )}
          {filtredData.map((item, index) => (
            <DropdownMenuItem
              key={index}
              dir="rtl"
              onClick={() => {
                onValueChange && onValueChange(item.card_number, item.iban);
              }}
              className={
                'transition-all duration-500 hover:bg-gray-100 !cursor-pointer p-3 w-full flex items-center justify-between gap-3'
              }
            >
              <div className="flex items-center justify-star gap-3">
                <BankIcon
                  className="size-7 shrink-0"
                  name={
                    getBankFromCard(item.card_number.slice(0, 6))?.type ||
                    'unknown'
                  }
                />
                <span className="text-cs65 font-semibold text-black truncate block text-right">
                  {getBankFromCard(item.card_number)?.name || 'نامعلوم'}
                </span>
              </div>
              <span className="text-cs65 font-semibold text-black truncate block text-left">
                {numberSeparation(item.card_number, ' - ', 4)}
              </span>
            </DropdownMenuItem>
          ))}
          {side === 'bottom' && filtredData.length < 2 && !hideCreate && (
            <div className="p-3">
              <Link
                href="/dashboard/financial/cart-to-cart"
                className="flex items-center justify-center gap-3 text-white px-4 py-2 rounded-lg bg-cs-blue w-full"
              >
                <IconsaxIcons
                  name="Add"
                  className="size-5 shrink-0"
                  color="currentColor"
                />
                <span className="text-cs07 font-normal text-current text-center truncate">
                  اضافه شماره کارت
                </span>
              </Link>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}

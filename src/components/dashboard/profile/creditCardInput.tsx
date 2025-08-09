// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { CreditCardInputPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode, useRef, useEffect, useState } from 'react';
import InputAndLabel from '../financialCartToCart/inputAndLabel';
import BankIcon from '../ui/bankIcon';
import { getBankFromCard } from '@/utils/string';
import { numberSeparation } from '@/utils';
import useUserInfo from '@/hooks/dashboard/useUserInfo';

// Creating and exporting CreditCardInput component as default
export default function CreditCardInput({
  type,
  error,
  placeholder,
  isValid,
  validation,
  containerClassName,
  onFocus,
  onBlur,
  setValue,
  reset,
  ...props
}: CreditCardInputPropsType): ReactNode {
  // Defining states of component
  const [focused, setFocused] = useState<boolean>(false);
  const [selectedVal, setSelectedVal] = useState<string>();
  const userInfo = useUserInfo();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => setFocused(false), [selectedVal]);

  useEffect(() => {
    const body = document.body;
    const previousOverflow = body.style.overflow;

    if (focused) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = previousOverflow;
    }

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [focused]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setFocused(false);
      }
    }

    if (focused) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [focused]);

  // Returning JSX
  return (
    <div ref={wrapperRef} className={cn('relative w-full', containerClassName)}>
      <InputAndLabel
        validationType="icon"
        isValid={isValid}
        validation="creditCardNumberValidation"
        placeholder={placeholder}
        error={error}
        autoComplete={'off'}
        reset={reset}
        onFocus={(e) => {
          setFocused(true);
          onFocus && onFocus(e);
        }}
        {...props}
      />
      <div
        data-open={focused}
        className={
          'bg-white rounded-lg border border-black/10 absolute w-full transition-all duration-500 flex flex-col items-center justify-between z-40 overflow-hidden data-[open=false]:opacity-0 data-[open=false]:pointer-events-none data-[open=false]:scale-90 data-[open=true]:opacity-100 data-[open=true]:pointer-events-auto data-[open=true]:scale-100 top-[calc(100%+10px)] left-0 origin-top'
        }
      >
        <div className="p-2 w-full flex flex-col overflow-auto scrollbar-hide gap-3 max-h-[140px]">
          {userInfo.card_numbers.map((item, index) => (
            <div
              className="flex p-2 items-center justify-center gap-3 w-full transition-all duration-500 hover:bg-gray-100 rounded-lg cursor-pointer"
              dir="ltr"
              key={index}
              onClick={() => {
                setSelectedVal(item.card_number);
                setValue(item.card_number, item.iban);
              }}
            >
              <div className="shrink-0 aspect-square w-[40px] h-[40px] flex items-center justify-center text-black border border-black/10 rounded-md">
                <BankIcon
                  className="w-[20px] h-[20px]"
                  name={
                    getBankFromCard(item.card_number.slice(0, 6))?.type ||
                    'mellat'
                  }
                />
              </div>
              <div className="flex-1">
                <span className="text-cs65 font-semibold text-black truncate block text-left mb-1">
                  {numberSeparation(
                    item.card_number.toString().replace(/\s+/g, ''),
                    ' ',
                    4,
                  )}
                </span>
                <p className="text-left truncate text-black/50 text-cs06 font-semibold">
                  {numberSeparation(
                    item.iban.toString().replace(/\s+/g, ''),
                    ' ',
                    4,
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

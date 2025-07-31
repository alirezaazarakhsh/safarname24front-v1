// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { CreditCardInputPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode, useRef, useEffect, useState } from 'react';
import InputAndLabel from '../financialCartToCart/inputAndLabel';
import CustomPagination from '../ui/customPagination';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GetCreditCards } from '@/types/dashboard/api/get';
import { Skeleton } from '@/components/ui/skeleton';
import BankIcon from '../ui/bankIcon';
import { getBankFromCard } from '@/utils/string';
import { numberSeparation } from '@/utils';

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
  position = 'left',
  dropdownClassName,
  profile = 'natural',
  setValue,
  ...props
}: CreditCardInputPropsType): ReactNode {
  // Defining states of component
  const [focused, setFocused] = useState<boolean>(false);
  const [paginationNumber, setPaginationNumber] = useState<number>(0);
  const [selectedVal, setSelectedVal] = useState<string>();

  // Using useEffect to remove scroll from body
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

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fetching the data of credit cards
  const creditCards = useApiQuery<GetCreditCards>({
    url: `/finance/bank-cards?profile_type=${profile}&p=${paginationNumber + 1}`,
    queryKey: [`${profile}-credit-cards`],
    options: {
      enabled: focused,
      staleTime: Infinity,
    },
  });

  // Using useEffect to make useApiQuery Fetch again while pagination number changes
  useEffect(() => {
    async function handleRefetch() {
      await creditCards.refetch();
    }

    handleRefetch();
  }, [paginationNumber]);

  // Using useEffect to remove focus
  useEffect(() => setFocused(false), [selectedVal]);

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
        onFocus={(e) => {
          setFocused(true);
          onFocus && onFocus(e);
        }}
        {...props}
      />
      <div
        data-open={focused}
        className={cn(
          'bg-white rounded-lg border border-black/10 absolute w-full transition-all duration-500 flex flex-col items-center justify-between z-40 overflow-hidden data-[open=false]:opacity-0 data-[open=false]:pointer-events-none data-[open=false]:scale-90 data-[open=true]:opacity-100 data-[open=true]:pointer-events-auto data-[open=true]:scale-100',
          position === 'left' &&
            'lg:right-[calc(100%+10px)] lg:top-0 right-0 top-[calc(100%+10px)] lg:origin-right origin-top',
          dropdownClassName,
        )}
      >
        <div className="h-full p-2 w-full flex flex-col overflow-auto scrollbar-hide gap-3">
          {creditCards.isLoading ? (
            [...new Array(18)].map((_, index) => (
              <Skeleton className="w-full rounded-lg h-[50px]" key={index} />
            ))
          ) : creditCards.isError ? (
            <p className="text-center text-cs-red text-cs65 font-medium w-full">
              مشکلی در دریافت اطلاعات به وجود امد
            </p>
          ) : creditCards.data?.count === 0 ? (
            <p className="text-center text-cs-red text-cs65 font-medium w-full">
              چیزی برای نمایش وجود ندارد
            </p>
          ) : (
            creditCards.data?.results.map((item, index) =>
              creditCards.data?.results.map((item, index) => (
                <div
                  className="p-2.5 flex items-center justify-center gap-3 w-full transition-all duration-500 hover:bg-gray-100 rounded-lg cursor-pointer"
                  onClick={() => {
                    if (type === 'number') {
                      setSelectedVal(item.card_number);
                      setValue(item.card_number);
                    } else {
                      setSelectedVal(item.sheba_number);
                      setValue(item.sheba_number);
                    }
                  }}
                  key={index}
                >
                  <div className="shrink-0 aspect-square w-[50px] h-[50px] flex items-center justify-center text-black border border-black/10 rounded-md">
                    <BankIcon
                      name={
                        getBankFromCard(item.card_number.slice(0, 6))?.type ||
                        'mellat'
                      }
                      className="w-[30px] h-[30px]"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-cs07 font-semibold text-black truncate block text-right mb-1">
                      {numberSeparation(
                        item.card_number.toString().replace(/\s+/g, ''),
                        ' ',
                        4,
                      )}
                    </span>
                    <p className="text-right truncate text-black/50 text-cs65 font-semibold">
                      {numberSeparation(
                        item.sheba_number.toString().replace(/\s+/g, ''),
                        ' ',
                        4,
                      )}
                    </p>
                  </div>
                </div>
              )),
            )
          )}
        </div>
        {creditCards.isLoading ? (
          <div className="w-full bg-white border-t border-t-black/10 flex items-center justify-center p-2 shrink-0 overflow-hidden">
            <CustomPagination count={2} loading />
          </div>
        ) : creditCards.error ||
          !creditCards.data ||
          creditCards?.data.count <= 18 ? (
          false
        ) : (
          <div className="w-full bg-white border-t border-t-black/10 flex items-center justify-center p-2 shrink-0 overflow-hidden">
            <CustomPagination
              count={creditCards.data.count}
              activeIndex={paginationNumber}
              setActiveIndex={setPaginationNumber}
            />
          </div>
        )}
      </div>
    </div>
  );
}

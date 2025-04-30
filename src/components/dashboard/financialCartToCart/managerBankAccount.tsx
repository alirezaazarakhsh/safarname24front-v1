// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { ReactNode } from 'react';
import CreditCard from './creditCard';
import { numberSeparation } from '@/utils';
import { Button } from '@/components/ui/button';
import { ManagerBankAccountComponentPropsType } from '@/types/dashboard/component';
import { banks } from './creditCard';
import toast from '../ui/customSonner/toast';

// Creating and exporting ManagerBankAccount component as default
export default function ManagerBankAccount({
  selectedCreditCard,
}: ManagerBankAccountComponentPropsType): ReactNode {
  // Defining a function to convert , remove white spaces and group the given number or string and return the last value
  const valueTransform = (val: string | number) =>
    numberSeparation(val.toString().replace(/\s+/g, ''), ' - ', 4);

  // Defining a function to copy given value
  const copyVal = async (val: string | number) =>
    await navigator.clipboard.writeText(val.toString()).then(() =>
      toast({
        description: 'مشتری عزیز شماره مورد نظر با موفقیت کپی شد.',
        title: 'شماره کپی شد',
        theme: 'green',
      }),
    );

  // Defining bankName
  const bin = selectedCreditCard?.number.card.toString().slice(0, 6);
  const binName = bin ? banks[bin] : 'مشخص نشده';

  // Returning JSX
  return (
    <div className="bg-white border border-black/10 lg:rounded-lg rounded-[14px] overflow-hidden row-span-2 col-span-1">
      <div className="lg:px-3 lg:py-4 px-[14px] py-[14px] flex items-center justify-start border-b border-b-black/10 gap-3 shrink-0 w-full">
        <div className="shrink-0 lg:w-[38px] lg:h-[38px] w-[44px] h-[44px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
          <IconsaxIcons
            name="Crown1"
            className="w-[20px] h-[20px]"
            color="currentColor"
          />
        </div>
        <div className="overflow-hidden w-full">
          <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
            حساب بانکی مدیر
          </span>
          <p className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
            برای واریز وجه به اطلاعات زیر دقت زیادی توجه بفرمایید.
          </p>
        </div>
      </div>
      <div className="lg:px-3 lg:py-4 px-[14px] py-[14px] flex flex-col gap-7">
        <div className="bg-gray-100 lg:rounded-lg rounded-[12px] lg:p-4 p-[14px] flex items-center justify-center overflow-hidden lg:mb-3 mb-2">
          <div className="w-[250px]">
            <CreditCard
              info={selectedCreditCard ? { ...selectedCreditCard } : undefined}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <span className="lg:text-cs08 text-[12px] font-semibold block text-right truncate w-full overflow-hidden text-black lg:mb-2 mb-1">
              صاحب کارت
            </span>
            <span className="lg:text-cs07 text-[10px] font-normal block text-right truncate w-full overflow-hidden text-black/50">
              {selectedCreditCard ? selectedCreditCard.owner : '-'}
            </span>
          </div>
          <div>
            <span className="lg:text-cs08 text-[12px] font-semibold block text-right truncate w-full overflow-hidden text-black lg:mb-2 mb-1">
              بانک
            </span>
            <span className="lg:text-cs07 text-[10px] font-normal block text-right truncate w-full overflow-hidden text-black/50">
              {selectedCreditCard ? binName : '-'}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="lg:text-cs08 text-[12px] font-semibold block text-right truncate w-full overflow-hidden text-black lg:mb-2 mb-1">
                شماره کارت
              </span>
              <span className="lg:text-cs07 text-[10px] font-normal block text-right truncate w-full overflow-hidden text-black/50">
                {selectedCreditCard
                  ? valueTransform(selectedCreditCard.number.card)
                  : valueTransform('0000000000000000')}
              </span>
            </div>
            <Button
              onClick={() =>
                selectedCreditCard && copyVal(selectedCreditCard.number.card)
              }
              className={
                'transition-all duration-500 lg:rounded-lg rounded-[6px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-black shrink-0 lg:w-auto lg:h-auto aspect-square w-[40px] h-[40px]'
              }
            >
              <IconsaxIcons
                name={'DocumentCopy'}
                color="currentColor"
                className="h-[20px] w-[20px]"
              />
            </Button>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="lg:text-cs08 text-[12px] font-semibold block text-right truncate w-full overflow-hidden text-black lg:mb-2 mb-1">
                شماره شبا
              </span>
              <span className="lg:text-cs07 text-[10px] font-normal block text-right truncate w-full overflow-hidden text-black/50">
                {selectedCreditCard
                  ? `IR ${valueTransform(selectedCreditCard.number.shaba)}`
                  : `IR ${valueTransform('000000000000000000000000')}`}
              </span>
            </div>
            <Button
              onClick={() =>
                selectedCreditCard && copyVal(selectedCreditCard.number.shaba)
              }
              className={
                'transition-all duration-500 lg:rounded-lg rounded-[6px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-black shrink-0 lg:w-auto lg:h-auto aspect-square w-[40px] h-[40px]'
              }
            >
              <IconsaxIcons
                name={'DocumentCopy'}
                color="currentColor"
                className="h-[20px] w-[20px]"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

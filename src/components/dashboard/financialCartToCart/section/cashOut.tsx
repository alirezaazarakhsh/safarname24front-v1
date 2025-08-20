// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useState } from 'react';
import { Label } from '@/components/ui/label';
import CheckboxItem from '../../financial/checkboxItem';
import InputAndLabel from '../inputAndLabel';
import { numberSeparation } from '@/utils';
import LabledCheckbox from '../labledCheckbox';
import { Button } from '@/components/ui/button';

// Creating and exporting CashOut section/component of cart-to-cart dashboard (financial) page as default
export default function CashOut(): ReactNode {
  // Defining states of component
  const [profile, setProfile] = useState<'profile' | 'legal'>('legal');
  const [priceAmount, setPriceAmount] = useState<number | undefined>(undefined);
  const [creditCardNumber, setCreditCardNumber] = useState<string | undefined>(
    undefined,
  );
  const [creditCardShabaNumber, setCreditCardShabaNumber] = useState<
    string | undefined
  >(undefined);
  const [acceptedNumbers, setAcceptedNumbers] = useState<boolean>(false);

  // Defining conditions to check if a item is valid
  const priceAmountValid =
    priceAmount !== undefined &&
    priceAmount > 1000000 &&
    priceAmount <= 1000000000;
  const creditCardNumberValid =
    creditCardNumber !== undefined && creditCardNumber.length === 16;
  const creditCardShabaNumberValid =
    creditCardShabaNumber !== undefined && creditCardShabaNumber.length === 24;

  // Returning JSX
  return (
    <section className="bg-white lg:border border-t border-black/10 lg:rounded-lg rounded-0 overflow-hidden w-full grid lg:grid-cols-4 lg:gap-12 gap-[24px] lg:px-3 lg:py-4 px-[20px] py-[20px]">
      <div>
        <h3 className="block text-right font-bold lg:text-cs08 text-[12px] text-black truncate w-full lg:mb-3 mb-5">
          بخش مالی - برداشت وجه
        </h3>
        <Label
          className={
            'block truncate text-right w-full text-[10px] font-medium text-black mb-2'
          }
        >
          پروفایل خود را انتخاب نمایید
        </Label>
        <div className="flex flex-col items-center justify-between w-full lg:gap-3 gap-[24px]">
          <CheckboxItem
            onClick={() => setProfile('profile')}
            checked={profile === 'profile'}
            title={'پروفایل حقیقی'}
            isCardSelection
            className="lg:h-[50px]"
          />
          <CheckboxItem
            onClick={() => setProfile('legal')}
            checked={profile === 'legal'}
            title={'پروفایل حقوقی'}
            isCardSelection
            className="lg:h-[50px]"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-between w-full lg:gap-2 gap-[24px]">
        <InputAndLabel
          label="مبلغ برداشت کیف پول"
          isValid={priceAmountValid}
          type="text"
          className="w-full h-[50px]"
          validation="ICON"
          validationType="icon"
          placeholder="*120,000 تومان"
          onChange={(e) => {
            const value = e.target.value;
            const fixedStr = Number(
              value
                .replace(/\s*تومان\s*/g, '')
                .replace(/,/g, '')
                .replace(/\D/g, ''),
            );

            setPriceAmount(fixedStr);
          }}
          onInput={(e) => {
            let value = e.currentTarget.value;
            value = value.replace(/\s*تومان\s*/g, '');
            value = value.replace(/,/g, '');
            value = value.replace(/\D/g, '');
            const formattedValue = numberSeparation(value);

            e.currentTarget.value = `${formattedValue} تومان`;
          }}
        />
        <InputAndLabel
          isValid={creditCardNumberValid}
          label="شماره کارت بانکی"
          type="text"
          className="w-full h-[50px]"
          validation="ICON"
          validationType="icon"
          placeholder="* 0000-0000-0000-0000"
          onChange={(e) => {
            const value = e.target.value;
            const fixedStr = value.replace(/-/g, '');

            setCreditCardNumber(fixedStr);
          }}
          onInput={(e) => {
            let value = e.currentTarget.value.replace(/-/g, '');
            const formattedValue = numberSeparation(value, '-', 4);

            e.currentTarget.value = formattedValue;
          }}
        />
      </div>
      <div className="flex flex-col items-center justify-between w-full lg:gap-2 gap-[24px] lg:col-span-2">
        <InputAndLabel
          isValid={creditCardShabaNumberValid}
          label="شماره شبا کارت بانکی"
          type="text"
          className="w-full h-[50px]"
          validation="ICON"
          validationType="icon"
          placeholder="* 0000-0000-0000-0000-0000-0000"
          onChange={(e) => {
            const value = e.target.value;
            const fixedStr = value.replace(/-/g, '').replace('IR ', '');

            setCreditCardShabaNumber(fixedStr);
          }}
          onInput={(e) => {
            let value = e.currentTarget.value
              .replace(/-/g, '')
              .replace('IR ', '');
            const formattedValue = numberSeparation(value, '-', 4);

            e.currentTarget.value = `IR ${formattedValue}`;
          }}
        />
        <div className="flex items-center lg:justify-between justify-start gap-5 w-full lg:flex-row flex-col">
          <LabledCheckbox
            className="lg:w-auto w-full"
            label="شماره کارت و شماره شبا را تایید میکنم."
            disabled={false}
            onChange={(checked) => setAcceptedNumbers(checked)}
          />
          <Button
            onClick={() => {
              if (
                priceAmountValid &&
                creditCardNumberValid &&
                creditCardShabaNumberValid &&
                acceptedNumbers
              ) {
                // console.log({
                //   profile,
                //   priceAmount,
                //   creditCardNumber,
                //   creditCardShabaNumber,
                //   acceptedNumbers,
                // });
              }
            }}
            disabled={
              !(
                priceAmountValid &&
                creditCardNumberValid &&
                creditCardShabaNumberValid &&
                acceptedNumbers
              )
            }
            className="transition-all duration-500 lg:rounded-lg rounded-[10px] flex items-center justify-center h-[50px] lg:px-5 px-[20px] bg-black  text-white disabled:bg-gray-100 disabled:text-black/50 disabled:opacity-100 shrink-0 lg:w-fit w-full font-normal truncate text-center lg:text-xs text-[12px]"
          >
            ارسال درخواست (برداشت وجه)
          </Button>
        </div>
      </div>
    </section>
  );
}

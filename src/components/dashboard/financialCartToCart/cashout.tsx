// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useState } from 'react';
import { Label } from '@/components/ui/label';
import CheckboxItem from '@/components/dashboard/financial/checkboxItem';
import NormalInput from '../profile/normalInput';
import CreditCardDropDown from '../profile/creditCardDropdown';
import Selecter from './selecter';

// Creating and exporting CashOut section/component of cart-to-cart dashboard (financial) page as default
export default function CashOut(): ReactNode {
  // Defining states of component
  const [profile, setProfile] = useState<'profile' | 'legal'>('legal');

  // Returning JSX
  return (
    <section className="bg-white border rounded-xl border-black/10 p-4 grid grid-cols-4 gap-10">
      <div>
        <span className="text-cs09 font-extrabold truncate text-right mb-2 block text-black">
          بخش مالی - برداشت وجه
        </span>
        <span className="text-cs75 font-normal truncate text-right block text-black/70 mb-5">
          پروفایل خود را انتخاب نمایید
        </span>
        <div className="flex flex-col items-center justify-between w-full lg:gap-3 gap-[24px]">
          <CheckboxItem
            hideTooltip
            onClick={() => setProfile('profile')}
            checked={profile === 'profile'}
            title={'پروفایل حقیقی'}
            isCardSelection
            className="lg:h-[50px]"
          />
          <CheckboxItem
            onClick={() => setProfile('legal')}
            hideTooltip
            checked={profile === 'legal'}
            title={'پروفایل حقوقی'}
            isCardSelection
            className="lg:h-[50px]"
          />
        </div>
      </div>
      <div>
        <div className="mb-5 w-full">
          <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
            مبلغ برداشت کیف پول
          </span>
          <NormalInput
            type="number"
            placeholder="مبلغ مد نظر خود را وارد نمایید"
            required
          />
        </div>
        <div className="w-full">
          <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
            شماره کارت بانکی
          </span>
          <CreditCardDropDown
            placeholder="مبلغ مد نظر خود را وارد نمایید"
            className="w-full"
            hideCreate
          />
        </div>
      </div>
      <div className="col-span-2 flex flex-col items-center justify-between">
        <div className="mb-5 w-full">
          <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
            شماره شبا کارت بانکی
          </span>
          <NormalInput
            type="text"
            placeholder="24 رقم شماره شبا کارت را وارد نمایید"
            required
            clearFn={() => {}}
          />
        </div>
        <div className="flex items-center justify-between gap-4 w-full">
          <Selecter label="شماره کارت و شماره شبا را تایید میکنم." checked />
          <button
            disabled
            className="ml-3 px-4 h-[45px] transition-all text-cs75 shrink-0 duration-500 text-white bg-green-500 disabled:text-black disabled:bg-gray-100  rounded-md flex items-center justify-center"
          >
            ارسال درخواست (برداشت وجه)
          </button>
        </div>
      </div>
    </section>
  );
}

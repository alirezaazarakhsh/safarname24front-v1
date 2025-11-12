// Forcning Next.js to render this component as client side component
'use client';

import AdminCreditCardInfo from '@/components/dashboard/financialCartToCart/adminCreditCardInfo';
// Importing part
import EmergencieForm, {
  formType,
} from '@/components/dashboard/financialCartToCart/emergencieForm';
import SelectMode from '@/components/dashboard/financialCartToCart/selectMode';
import Subscription from '@/components/dashboard/financialCartToCart/subscription/subscription';
import UserCreditCard from '@/components/dashboard/financialCartToCart/userCreditCard';
import CartBalance from '@/components/dashboard/profile/cartBalance';
import Upload from '@/components/dashboard/upload/upload';
import useUserInfo from '@/hooks/dashboard/useUserInfo';
import { CartToCartFinancialMode } from '@/types/dashboard/component';
import { JSX, useState } from 'react';

// Creating and exporting CartToCart financial page as default
export default function CartToCartFinancialPage(): JSX.Element {
  // Defining hooks
  const [mode, setMode] = useState<CartToCartFinancialMode>('custom');
  const [file, setFile] = useState<File | undefined>(undefined);
  const userInfo = useUserInfo();
  const [emergeniceFormValue, setEmergencieFormValue] = useState<
    formType | undefined
  >();
  const [selectedCreditCard, setSelectedCreditCard] = useState(
    userInfo.card_numbers[0] ? userInfo.card_numbers[0] : undefined,
  );

  // Returning JSX
  return (
    <main className="p-5 lg:pb-5 pb-[50px] flex flex-col lg:gap-5 gap-[24px]">
      <SelectMode
        value={mode}
        onValueChange={setMode}
        submitDisabled={false}
        onSubmit={() => {
          console.log({
            mode,
            file,
            selectedCreditCard,
            emergeniceFormValue,
          });
        }}
      />
      <div className="grid grid-cols-3 lg:gap-5 gap-[24px]">
        <UserCreditCard
          data={userInfo.card_numbers}
          onValueChange={setSelectedCreditCard}
        />
        <div className="flex items-center justify-between flex-col lg:gap-5 gap-[24px]">
          <CartBalance hasMobileView className="shrink-0 w-full" />
          <div className="w-full h-full">
            <Upload
              onChange={(data) => setFile(data)}
              className="lg:w-full w-full h-full"
            />
          </div>
        </div>
        <EmergencieForm onChange={setEmergencieFormValue} />
      </div>
      <div className="grid grid-cols-5 lg:gap-5 gap-[24px]">
        <div className="bg-white border rounded-xl border-black/10 lg:p-4 p-[14px] col-span-2">
          <span className="text-cs09 font-extrabold truncate text-right mb-2 block text-black">
            بخش مالی - بخش اطلاعاتی
          </span>
          <p className="text-cs75 font-normal truncate text-right block text-black/70">
            مشتری گرامی در این بخش میتوایند مبلغ مدنظرتون واریز و برداشت کنید.
          </p>
        </div>
        <div className="bg-white border rounded-xl border-black/10 lg:p-4 p-[14px] col-span-3">
          <span className="text-cs09 font-extrabold truncate text-right mb-2 block text-black">
            نکته ضروری :
          </span>
          <p className="text-cs75 font-normal truncate text-right block text-black/70">
            اگر مبلغی را واریز کردید و به کیف پول شما واریز نگردید در آنی واحد
            به تیم{' '}
            <span className="text-cs-red font-semibold">
              پشتیبانی سفرنامه 24
            </span>{' '}
            تماس بگیرید.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-6  lg:gap-5 gap-[24px]">
        <AdminCreditCardInfo
          className="col-span-4"
          data={{
            name: 'امیرحسین لامعی',
            iban: '606723561235125612351256',
            number: '6067235612351256',
          }}
        />
        <Subscription className="col-span-2" />
      </div>
    </main>
  );
}

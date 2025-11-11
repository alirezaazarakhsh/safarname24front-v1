// Forcning Next.js to render this component as client side component
'use client';

import EmergencieForm from '@/components/dashboard/financialCartToCart/emergencieForm';
// Importing part
import SelectMode from '@/components/dashboard/financialCartToCart/selectMode';
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
  const userInfo = useUserInfo();

  // Returning JSX
  return (
    <main className="p-5 lg:pb-5 pb-[50px] flex flex-col lg:gap-5 gap-[24px]">
      <SelectMode value={mode} onValueChange={setMode} />
      <div className="grid grid-cols-3 lg:gap-5 gap-[24px]">
        <UserCreditCard data={userInfo.card_numbers[0]} />
        <div className="flex items-center justify-between flex-col lg:gap-5 gap-[24px]">
          <CartBalance hasMobileView className="shrink-0 w-full" />
          <div className="w-full h-full">
            <Upload
              onChange={(data) => console.log(data)}
              className="lg:w-full w-full h-full"
            />
          </div>
        </div>
        <EmergencieForm />
      </div>
    </main>
  );
}

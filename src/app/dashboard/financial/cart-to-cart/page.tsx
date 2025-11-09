// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import SelectMode from '@/components/dashboard/financialCartToCart/selectMode';
import UserCreditCard from '@/components/dashboard/financialCartToCart/userCreditCard';
import { CartToCartFinancialMode } from '@/types/dashboard/component';
import { JSX, useState } from 'react';

// Creating and exporting CartToCart financial page as default
export default function CartToCartFinancialPage(): JSX.Element {
  // Defining hooks
  const [mode, setMode] = useState<CartToCartFinancialMode>('custom');

  // Returning JSX
  return (
    <main className="p-5 lg:pb-5 pb-[50px] flex flex-col lg:gap-5 gap-[24px]">
      <SelectMode value={mode} onValueChange={setMode} />
      <div className="grid grid-cols-3 lg:gap-5 gap-[24px]">
        <UserCreditCard />
      </div>
    </main>
  );
}

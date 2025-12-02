// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import AdminCreditCardInfo from '@/components/dashboard/financialCartToCart/adminCreditCardInfo';
import Subscription from '@/components/dashboard/financialCartToCart/subscription/subscription';
import SubscriptionType from '@/components/dashboard/profile/subscriptionType';
import { JSX } from 'react';

// Creating and exporting Subscription financial page as default
export default function SubscriptionFinancialPage(): JSX.Element {
  // Returning JSX
  return (
    <main className="p-5 lg:pb-5 pb-[50px] flex flex-col lg:gap-5 gap-[24px]">
      <div className='grid lg:grid-cols-6 lg:gap-4 gap-[14px]'>
        <Subscription className='lg:col-span-2' />
        <AdminCreditCardInfo className='lg:col-span-4' />
        <SubscriptionType className='lg:col-span-3' />
      </div>
      PACKAGES HERE
    </main>
  );
}

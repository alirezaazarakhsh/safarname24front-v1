// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import AdminCreditCardInfo from '@/components/dashboard/financialCartToCart/adminCreditCardInfo';
import Subscription from '@/components/dashboard/financialCartToCart/subscription/subscription';
import SubscriptionPicker from '@/components/dashboard/financialSubscription/subscriptionPicker';
import SubscriptionDetails from '@/components/dashboard/financialSubscription/subscriptionsDetails';
import SubscriptionType from '@/components/dashboard/profile/subscriptionType';
import { JSX } from 'react';

// Creating and exporting Subscription financial page as default
export default function SubscriptionFinancialPage(): JSX.Element {
  // Returning JSX
  return (
    <main className="p-5 lg:pb-5 pb-[50px] flex flex-col lg:gap-5 gap-[24px]">
      <div className='grid lg:grid-cols-6 lg:gap-4 gap-[14px]'>
        <div className={'bg-white border rounded-xl border-black/10 lg:p-4 p-[14px] flex lg:flex-row flex-col items-center justify-between gap-3 lg:col-span-4'}>
          <div className="overflow-hidden flex-1 lg:w-auto w-full">
            <span className="text-cs09 font-extrabold truncate text-right mb-2 block text-black">
              بخش مالی - اشتراک
            </span>
            <span className="text-cs75 font-normal truncate text-right block text-black/70">
              در این بخش می‌توانید پلن اشتراک مدنظر خود را خریداری یا تمدید کنید.
            </span>
          </div>
        </div>
        <SubscriptionType className='lg:col-span-2' />
      </div>
      <div className='grid lg:grid-cols-7 lg:gap-4 gap-[14px]'>
        <Subscription className='lg:col-span-2' subscription={{
          chart: [
            { month: 'فروردین', price: 200000 },
            { month: 'اردیبهشت', price: 200000 },
            { month: 'خرداد', price: 48888 },
            { month: 'تیر', price: 48888 },
            { month: 'مرداد', price: 48888 },
            { month: 'شهریور', price: 48888 },
            { month: 'مهر', price: 48888 },
            { month: 'ابان', price: 48888 },
            { month: 'اذر', price: 48888 },
            { month: 'دی', price: 48888 },
            { month: 'بهمن', price: 48888 },
            { month: 'اسفند', price: 48888 },
          ],
          endsAt: new Date().toISOString(),
          price: 400000,
          type: "free"
        }} />
        <AdminCreditCardInfo className='lg:col-span-5' />
      </div>
      <div className='grid lg:grid-cols-7 lg:gap-4 gap-[14px]'>
        <SubscriptionPicker className='lg:col-span-5 lg:h-[344px]' />
        <SubscriptionDetails className='lg:col-span-2 lg:h-[344px]' />
      </div>
    </main>
  );
}

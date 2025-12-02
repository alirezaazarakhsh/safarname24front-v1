// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import AdminCreditCardInfo from '@/components/dashboard/financialCartToCart/adminCreditCardInfo';
import Details from '@/components/dashboard/financialCartToCart/details';
import Subscription from '@/components/dashboard/financialCartToCart/subscription/subscription';
import SubscriptionPackage from '@/components/dashboard/financialSubscription/subscriptionPackage';
import SubscriptionPicker from '@/components/dashboard/financialSubscription/subscriptionPicker';
import SubscriptionType from '@/components/dashboard/profile/subscriptionType';
import { cn } from '@/utils/utils';
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
        <Subscription className='lg:col-span-2' />
        <AdminCreditCardInfo className='lg:col-span-5' />
      </div>
      <div className='grid lg:grid-cols-7 lg:gap-4 gap-[14px]'>
        <SubscriptionPicker className='lg:col-span-5 lg:h-[344px]' />
        <Details className='lg:col-span-2 lg:h-[344px]' />
      </div>
      <div className='py-10'>
        <div className='grid lg:grid-cols-3 items-center lg:gap-0 gap-[24px] lg:w-3/4 mx-auto'>
          {
            [...new Array(3)].map((_, index) => (
              <SubscriptionPackage
                key={index}
                className={cn(
                  "lg:h-[500px]",
                  index === 1 && "lg:scale-[1.1]"
                )}
                data={{
                  id: 1,
                  name: "Starter",
                  price: 120000,
                  subTitle: "Perfect for trying out our service",
                  features: [
                    "1",
                    "2",
                    "2",
                    "3",
                    "4"
                  ],
                }}
              />

            ))
          }
        </div>
      </div>
    </main>
  );
}

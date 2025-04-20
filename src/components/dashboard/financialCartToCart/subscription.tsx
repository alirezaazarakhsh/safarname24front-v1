// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { ReactNode } from 'react';
import moment from 'jalali-moment';
import { numberSeparation } from '@/utils';
import SubscriptionChart from './subscriptionChart/subscriptionChart';

// Defining fake data about subscription
const subscription: {
  type: 'premium' | 'free';
  endsAt: string;
  discountCode: string;
  price: number;
} = {
  type: 'premium',
  endsAt: moment().add(2, 'days').toISOString(),
  discountCode: 'SAF1HI20R8H',
  price: 43200000,
};

// Creating and exporting Subscription component as default
export default function Subscription(): ReactNode {
  // Returning JSX
  return (
    <div className="bg-white border border-black/10 rounded-lg overflow-hidden row-span-1 col-span-1 flex flex-col justify-between items-center">
      <div className="px-3 py-4 flex items-center justify-between border-b border-b-black/10 gap-3 shrink-0 w-full">
        <div className="flex items-center justify-between w-full gap-3">
          <div className="shrink-0 w-[38px] h-[38px] rounded-md flex items-center justify-center border border-black/10 text-black">
            <IconsaxIcons
              name="Flash"
              className="w-[20px] h-[20px]"
              color="currentColor"
            />
          </div>
          <div className="overflow-hidden w-full lg:block flex items-center justify-between gap-3">
            <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right lg:mb-1">
              اشتراک
            </span>
            <p className="lg:text-right text-left truncate text-black/50 lg:text-cs75 text-[16px] lg:font-semibold font-bold">
              کد تخفیف کارت اشتراکی سفرنامه 24
            </p>
          </div>
        </div>
        <IconsaxIcons
          name="InfoCircle"
          className="w-[20px] h-[20px] shrink-0"
          color="black"
        />
      </div>
      <div className="flex items-center gap-3 w-full h-full px-3 py-4 overflow-auto scrollbar-hide">
        <div className="w-[125px] h-full bg-gray-100 border-[1.5px] border-black/10 rounded-lg shrink-0 overflow-auto scrollbar-hide flex items-end justify-start">
          <SubscriptionChart />
        </div>
        <div className="w-full h-full flex flex-col justify-center gap-5 items-start">
          <span className="block text-right font-semibold text-black text-cs75 truncate w-full">
            کارت اشتراک -{' '}
            {subscription.type === 'premium' ? 'پریمیوم' : 'رایگان'}
          </span>
          <div className="flex items-center justify-between gap-3 w-full">
            <span className="block text-right font-medium text-black text-cs07 truncate">
              تاریخ انقضا :
            </span>
            <span className="block text-left font-medium text-black text-cs07 truncate">
              {moment(subscription.endsAt).format('jYYYY/jMM/jDD')}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 w-full">
            <span className="block text-right font-medium text-black text-cs07 truncate">
              کد تخفیف اشتراک :
            </span>
            <span className="block text-left font-medium text-black text-cs07 truncate">
              {subscription.discountCode}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 w-full">
            <span className="block text-right font-medium text-black text-cs07 truncate">
              مبلغ اشتراک :
            </span>
            <span className="block text-left font-medium text-black text-cs07 truncate">
              {`${numberSeparation(subscription.price)} تومان`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

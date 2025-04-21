// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { Button } from '@/components/ui/button';
import { typeCreditCardsSubmitComponentPropsType } from '@/types/dashboard/component';
import Link from 'next/link';
import { ReactNode } from 'react';

// Creating and exporting CreditCardsSubmit component as default
export default function CreditCardsSubmit({
  selectedCreditCard,
}: typeCreditCardsSubmitComponentPropsType): ReactNode {
  // Returning JSX
  return (
    <div className="flex flex-col justify-between items-center row-span-1 col-span-1 gap-5">
      <div className="bg-white border border-black/10 rounded-lg overflow-auto scrollbar-hide w-full h-full px-3 py-4 flex flex-col gap-3 items-center justify-between">
        <div>
          <span className="block text-right font-semibold text-black text-cs07 mb-1">
            توضیحات تکمیلی :
          </span>
          <p className="text-right font-medium text-black/50 text-cs07 leading-5">
            مشتری گرامی لازم به ذکر میباشد که مبلغ بالای 10,000,000 تومان اگر به
            شارژ کیف پول اقدام نمایید در مدت 24 ساعت کاری (بانک) مبلغ به حساب
            کیف پول شما واریز میشود و اگر مبلغ کمتر از 10,000,000 تومان واریز
            انجام دهید مبلغ به کیف پول شما در آنی واحد واریز میشود.
          </p>
        </div>
        <div>
          <span className="block text-right font-semibold text-black text-cs07 mb-1">
            نکته ضروری :
          </span>
          <p className="text-right font-medium text-black/50 text-cs07 leading-5">
            اگر مبلغی را واریز کردید و به کیف پول شما واریز نگردید در آنی واحد
            به تیم
            <Link className="text-cs-red" href="/contact-us">
              {`  پشتیبانی سفرنامه 24  `}
            </Link>
            تماس بگیرید.
          </p>
        </div>
      </div>
      <Button
        disabled={!selectedCreditCard}
        className={
          'transition-all duration-500 rounded-lg flex items-center justify-center p-3 bg-green-500 hover:bg-green-600  text-white disabled:bg-gray-100 disabled:text-black/50 disabled:opacity-100 shrink-0 w-full font-normal  truncate text-center text-xs'
        }
      >
        ارسال اطلاعات (کارت به کارت)
      </Button>
    </div>
  );
}

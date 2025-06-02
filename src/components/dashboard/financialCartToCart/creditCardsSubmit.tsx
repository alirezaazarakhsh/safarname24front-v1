// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { Button } from '@/components/ui/button';
import { typeCreditCardsSubmitComponentPropsType } from '@/types/dashboard/component';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import Loading from '../ui/loading';
import FactorSuccess from './dialog/factorSuccess';
import FactorError from './dialog/factorError';
import FactorErrorNotEnough from './dialog/factorErrorNotEnough';

// Creating and exporting CreditCardsSubmit component as default
export default function CreditCardsSubmit({
  selectedCreditCard,
}: typeCreditCardsSubmitComponentPropsType): ReactNode {
  // Defining states of components
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [factorSuccessDialogOpened, setFactorSuccessDialogOpened] =
    useState<boolean>(false);
  const [factorErrorDialogOpened, setFactorErrorDialogOpened] =
    useState<boolean>(false);
  const [
    factorErrorNotEnoughDialogOpened,
    setFactorErrorNotEnoughDialogOpened,
  ] = useState<boolean>(false);

  // Defining a function to validate fake data
  const onSubmit = async () => {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));

    setSubmitting(false);
    setFactorSuccessDialogOpened(true);
  };

  // Returning JSX
  return (
    <div className="flex flex-col justify-between items-center row-span-1 col-span-1 gap-5">
      <FactorSuccess
        isOpened={factorSuccessDialogOpened}
        closeFn={() => setFactorSuccessDialogOpened(false)}
      />
      <FactorError
        isOpened={factorErrorDialogOpened}
        closeFn={() => setFactorErrorDialogOpened(false)}
      />
      <FactorErrorNotEnough
        isOpened={factorErrorNotEnoughDialogOpened}
        closeFn={() => setFactorErrorNotEnoughDialogOpened(false)}
      />
      <div className="bg-white border border-black/10 rounded-lg overflow-auto scrollbar-hide w-full h-full px-3 py-4 flex flex-col gap-3 items-center justify-between">
        <div>
          <span className="block text-right font-semibold text-black lg:text-cs07 text-[12px] mb-1">
            توضیحات تکمیلی :
          </span>
          <p className="text-right font-medium text-black/50 lg:text-cs07 text-[10px] leading-5">
            مشتری گرامی لازم به ذکر میباشد که مبلغ بالای 10,000,000 تومان اگر به
            شارژ کیف پول اقدام نمایید در مدت 24 ساعت کاری (بانک) مبلغ به حساب
            کیف پول شما واریز میشود و اگر مبلغ کمتر از 10,000,000 تومان واریز
            انجام دهید مبلغ به کیف پول شما در آنی واحد واریز میشود.
          </p>
        </div>
        <div>
          <span className="block text-right font-semibold text-black lg:text-cs07 text-[12px] mb-1">
            نکته ضروری :
          </span>
          <p className="text-right font-medium text-black/50 lg:text-cs07 text-[10px] leading-5">
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
        disabled={!selectedCreditCard || isSubmitting}
        onClick={() => selectedCreditCard && onSubmit()}
        className={
          'transition-all duration-500 lg:rounded-lg rounded-[10px] flex items-center justify-center lg:px-3 lg:py-3 px-[20px] py-0 lg:h-[40px] h-[50px] bg-green-500 hover:bg-green-600  text-white disabled:bg-gray-100 disabled:text-black/50 disabled:opacity-100 shrink-0 w-full lg:font-normal font-semibold truncate text-center lg:text-xs text-[12px]'
        }
      >
        {isSubmitting ? <Loading /> : 'ارسال اطلاعات (کارت به کارت)'}
      </Button>
    </div>
  );
}

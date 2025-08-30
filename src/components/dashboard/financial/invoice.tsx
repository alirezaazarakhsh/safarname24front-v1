// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { InvoiceComponentPropsType } from '@/types/dashboard/component';
import { numberSeparation } from '@/utils';
import { ReactNode, useState } from 'react';
import num2persian from 'num2persian';
import Loading from '../ui/loading';
import PaymantCancledDialog from './dialog/paymentCancledDialog';
import PaymentSuccessDialog from './dialog/paymentSuccesfullDialog';
import PaymentErrorDialog from './dialog/paymentErrorDialog';

// Creating and exporting Invoice componnent as default
export default function Invoice({
  value,
}: InvoiceComponentPropsType): ReactNode {
  // Defining states of component
  const [isLoading, setLoading] = useState<boolean>(false);
  const [paymantCancledDialogOpened, setPaymantCancledDialogOpened] =
    useState<boolean>(false);
  const [paymantSuccessDialogOpened, setPaymantSuccessDialogOpened] =
    useState<boolean>(false);
  const [paymantErrorDialogOpened, setPaymantErrorDialogOpened] =
    useState<boolean>(false);

  // Handling onClick of submit button
  const handleClickOfSubmit = async () => {
    setLoading(true);
    const randomNum = Math.floor(Math.random() * 2); // For Testing purposes for now which returns random number of 1 (accepted) or 0 (failed)
    await new Promise((resolve) => setTimeout(() => resolve(true), 2000));

    setLoading(false);
    randomNum === 1
      ? setPaymantSuccessDialogOpened(true)
      : setPaymantErrorDialogOpened(true);
  };

  // Returning JSX
  return (
    <div className="lg:p-[16px] p-[12px] lg:rounded-[10px] rounded-[14px] border border-black/10 bg-white flex flex-col justify-between items-start lg:h-full h-auto">
      <PaymantCancledDialog
        isOpened={paymantCancledDialogOpened}
        closeFn={() => setPaymantCancledDialogOpened(false)}
      />
      <PaymentSuccessDialog
        isOpened={paymantSuccessDialogOpened}
        closeFn={() => setPaymantSuccessDialogOpened(false)}
      />
      <PaymentErrorDialog
        isOpened={paymantErrorDialogOpened}
        closeFn={() => setPaymantErrorDialogOpened(false)}
      />
      <div className="border-b-[3px] border-black/10 border-dashed mb-[16px] pb-[16px] w-full">
        <span className="lg:text-cs85 text-[12px] font-semibold text-black truncate block">
          صورتحساب پرداختی
        </span>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex items-center justify-between gap-3">
          <span className="block text-right font-semibold text-gray-600 truncate text-[13px]">
            مبلغ نهایی :
          </span>
          <span className="block text-left font-semibold text-black truncate text-[13px]">
            {value !== 0
              ? `${numberSeparation(value)} تومان`
              : 'مبلغی وارد نشده!'}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="block text-right font-semibold text-gray-600 truncate text-[13px]">
            معادل ریالی مبلغ :
          </span>
          <span className="block text-left font-semibold text-black truncate text-[13px]">
            {value !== 0 ? `${num2persian(value)} تومان` : 'نامعلوم'}
          </span>
        </div>
        <button
          disabled={value === 0 || isLoading}
          onClick={handleClickOfSubmit}
          className="bg-green-600 lg:h-[40px] h-[50px] lg:rounded-lg rounded-[8px] text-white flex items-center justify-center lg:p-3 p-[18px] transition-all duration-500 hover:bg-green-700 disabled:bg-[#f0f0f0] disabled:text-gray-500"
        >
          {isLoading ? (
            <Loading />
          ) : (
            <span className="text-current font-semibold text-[13px] block text-center truncate">
              تایید نهایی پرداخت
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

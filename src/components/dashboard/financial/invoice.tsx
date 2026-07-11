// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { InvoiceComponentPropsType } from '@/types/dashboard/component';
import { numberSeparation } from '@/utils';
import { ReactNode, useEffect, useState } from 'react';
import num2persian from 'num2persian';
import Loading from '../ui/loading';
import PaymantCancledDialog from './dialog/paymentCancledDialog';
import PaymentSuccessDialog from './dialog/paymentSuccesfullDialog';
import PaymentErrorDialog from './dialog/paymentErrorDialog';
import { ICDashedBorder } from '@/components/icons/ICDashedBorder';
import useApiMutation from '@/hooks/dashboard/useApiMutation';
import { POSTCreatePaymentLink } from '@/types/dashboard/api/post';
import { useSearchParams } from 'next/navigation';
import { addCommas } from '@persian-tools/persian-tools';

// Creating and exporting Invoice componnent as default
export default function Invoice({
  value,
}: InvoiceComponentPropsType): ReactNode {
  // Defining hooks
  const searchParams = useSearchParams();
  const [paymantCancledDialogOpened, setPaymantCancledDialogOpened] =
    useState<boolean>(false);
  const [paymantSuccessDialogOpened, setPaymantSuccessDialogOpened] =
    useState<boolean>(false);
  const [paymantErrorDialogOpened, setPaymantErrorDialogOpened] =
    useState<boolean>(false);

  // Defining variables
  const amount = searchParams.get('amount') as string | null;
  const paymentStatus = searchParams.get('payment_status') as
    | 'success'
    | 'unsuccessfull'
    | null;

  // Using useEffect to open success and failed dialog after redirecting from payment page to this page
  useEffect(() => {
    if (paymentStatus) {
      if (paymentStatus === 'success') {
        setPaymantErrorDialogOpened(false);
        setPaymantSuccessDialogOpened(true);
      } else {
        setPaymantErrorDialogOpened(true);
        setPaymantSuccessDialogOpened(false);
      }
    }
  }, []);

  // Fetching data
  const sendData = useApiMutation<POSTCreatePaymentLink>({
    url: '/finance/wallet/create-payment-link/',
    method: 'post',
    options: {
      onSuccess: (data) => {
        window.location.href = data.payment_link;
      },
      onError: () => setPaymantErrorDialogOpened(true),
    },
  });

  // Handling onClick of submit button
  const handleClickOfSubmit = () => sendData.mutate({ amount: value });

  // Returning JSX
  return (
    <div className="lg:p-[16px] p-[12px] lg:rounded-[10px] rounded-[14px] border border-black/10 bg-white flex flex-col justify-between items-start lg:h-full h-auto">
      <PaymantCancledDialog
        isOpened={paymantCancledDialogOpened}
        closeFn={() => setPaymantCancledDialogOpened(false)}
      />
      <PaymentSuccessDialog
        isOpened={paymantSuccessDialogOpened}
        infos={[amount ? addCommas(amount) : '0']}
        closeFn={() => setPaymantSuccessDialogOpened(false)}
      />
      <PaymentErrorDialog
        isOpened={paymantErrorDialogOpened}
        closeFn={() => setPaymantErrorDialogOpened(false)}
        refetch={() => {
          if (paymentStatus !== 'success') {
            setPaymantErrorDialogOpened(false);
          } else {
            setPaymantErrorDialogOpened(false);
            handleClickOfSubmit();
          }
        }}
      />
      <div className="w-full mb-2">
        <span className="lg:text-cs85 text-[12px] font-semibold text-black truncate block">
          صورتحساب پرداختی
        </span>
      </div>
      <div className="w-full overflow-hidden mb-[10px]">
        <ICDashedBorder className="w-ful h-2 text-gray-300" />
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
            {value !== 0 ? `${num2persian(value * 10)} ریال` : 'نامعلوم'}
          </span>
        </div>
        <button
          disabled={value === 0 || sendData.isPending}
          onClick={handleClickOfSubmit}
          className="bg-green-600 lg:h-[40px] h-[50px] lg:rounded-lg rounded-[8px] text-white flex items-center justify-center lg:p-3 p-[18px] transition-all duration-500 hover:bg-green-700 disabled:bg-[#f0f0f0] disabled:text-gray-500"
        >
          {sendData.isPending ? (
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

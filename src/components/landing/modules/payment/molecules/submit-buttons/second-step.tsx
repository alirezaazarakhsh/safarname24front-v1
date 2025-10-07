'use client';

import { CSSVars } from '@/types/landing';
import { axiosInstance } from '@/utils/axios';

import loader from '@/styles/loader.module.css';
import { payment } from '../../helpers/constant';
import { useSearchParams } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { showCMToast } from '@/components/landing/shared/toast';

type ApiResponse = { data: { discount_value: number } };

// ------------------------------

export function SecondStepSubmitButton() {
  const searchParams = useSearchParams();
  const trackingCode = searchParams.get(payment.reservationId);

  const { mutate, status } = useMutation<ApiResponse>({
    mutationFn: () => {
      return axiosInstance(`/hotel/reservation/discount-code/${trackingCode}/`);
    },
    onSuccess: (data) => {
      console.log(data);

      showCMToast({
        type: 'success',
        title: '',
        description: '',
      });
    },
    onError: (error) => {
      console.log(error);

      showCMToast({
        type: 'error',
        title: '',
        description: '',
      });
    },
  });

  return (
    <button
      onClick={() => mutate()}
      disabled={status === 'pending'}
      className="w-full h-12 bg-cs-dark-blue rounded-cs-10"
    >
      {status === 'pending' ? (
        <div className="full-size flex-center">
          <div
            className={loader.dots}
            style={{ '--dots-color': '#fff' } as CSSVars}
          />
        </div>
      ) : (
        <span className="text-zinc-100 text-cs85 font-semibold">
          تایید نهایی و پرداخت
        </span>
      )}
    </button>
  );
}

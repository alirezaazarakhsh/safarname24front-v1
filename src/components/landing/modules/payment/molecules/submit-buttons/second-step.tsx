'use client';

import { CSSVars } from '@/types/landing';
import { ArrowLeft } from 'iconsax-react';
import { axiosInstance } from '@/utils/axios';

import loader from '@/styles/loader.module.css';
import { payment } from '../../helpers/constant';
import { useSearchParams } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { showCMToast } from '@/components/landing/shared/toast';

type ApiResponse = { data: { discount_value: number } };

type Props = {
  status: 'pending' | 'initial' | 'confirmed' | 'rejected';
};

// ------------------------------

export function SecondStepSubmitButton(props: Props) {
  const { status } = props;

  const searchParams = useSearchParams();
  const trackingCode = searchParams.get(payment.reservationId);

  const { mutate, status: mutateStatus } = useMutation<ApiResponse>({
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
    <>
      {status === 'confirmed' && (
        <button
          onClick={() => mutate()}
          disabled={status !== 'confirmed' && mutateStatus === 'pending'}
          className="w-full h-12 bg-cs-dark-blue mt-4 rounded-cs-10 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {mutateStatus === 'pending' ? (
            <div className="full-size flex-center">
              <div
                className={loader.dots}
                style={{ '--dots-color': '#fff' } as CSSVars}
              />
            </div>
          ) : (
            <span className="text-zinc-100 text-cs85 font-semibold flex-center gap-2">
              پرداخت صورتحساب
              <ArrowLeft size={18} color="#fff" />
            </span>
          )}
        </button>
      )}
    </>
  );
}

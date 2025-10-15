'use client';

import { CSSVars } from '@/types/landing';
import { ArrowLeft } from 'iconsax-react';
import { axiosInstance } from '@/utils/axios';

import loader from '@/styles/loader.module.css';
import { payment } from '../../helpers/constant';
import { useSearchParams } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { showCMToast } from '@/components/landing/shared/toast';
import { useReservationStatus } from '../../helpers/useReservationStatus';

type ApiResponse = { data: { discount_value: number } };

// ------------------------------

export function SecondStepSubmitButton() {
  const searchParams = useSearchParams();
  const trackingCode = searchParams.get(payment.reservationId);

  const { status } = useReservationStatus(trackingCode);

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
          className="w-full h-12 bg-cs-dark-blue rounded-cs-10"
          disabled={mutateStatus === 'pending'}
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
              تایید نهایی و پرداخت
              <ArrowLeft size={18} color="#fff" />
            </span>
          )}
        </button>
      )}
    </>
  );
}

'use client';

import { CSSVars } from '@/types/landing';
import { ArrowLeft } from 'iconsax-react';
import { axiosInstance } from '@/utils/axios';

import loader from '@/styles/loader.module.css';
import { payment } from '../../helpers/constant';
import { useMutation } from '@tanstack/react-query';

import { useRouter, useSearchParams } from 'next/navigation';
import { showCMToast } from '@/components/landing/shared/toast';
import { useReservationStatus } from '../../helpers/useReservationStatus';

type ApiResponse = {
  data: {
    ok: boolean;
    payment_link: string;
  };
};

// ------------------------------

export function SecondStepSubmitButton() {
  const searchParams = useSearchParams();
  const trackingCode = searchParams.get(payment.reservationId);

  const router = useRouter();
  const { status } = useReservationStatus(trackingCode);

  const { mutate, status: mutateStatus } = useMutation<ApiResponse>({
    mutationFn: () => {
      return axiosInstance.post(`/payment/reservation-check/${trackingCode}/`);
    },
    onSuccess: (data) => {
      const res = data?.data;
      // console.log(res);

      res.ok
        ? router.push(res.payment_link)
        : router.push(
            `/payment/watcher-info?${payment.reservationId}=${trackingCode}`,
          );
    },
    onError: (error) => {
      // console.log(error);

      showCMToast({
        type: 'success',
        title: '',
        description: '',
      });
    },
  });

  return (
    <>
      <button
        onClick={() => mutate()}
        disabled={status !== 'confirmed' || mutateStatus === 'pending'}
        className="h-12 w-full rounded-cs-10 bg-cs-dark-blue disabled:cursor-not-allowed disabled:opacity-90"
      >
        {mutateStatus === 'pending' ? (
          <div className="full-size flex-center">
            <div
              className={loader.dots}
              style={{ '--dots-color': '#fff' } as CSSVars}
            />
          </div>
        ) : (
          <span className="flex-center gap-2 text-cs85 font-semibold text-zinc-100">
            پرداخت صورتحساب
            <ArrowLeft size={18} color="#fff" />
          </span>
        )}
      </button>
    </>
  );
}

'use client';

import { useState } from 'react';
import { AxiosError } from 'axios';

import { CSSVars } from '@/types/landing';
import { axiosInstance } from '@/utils/axios';
import loader from '@/styles/loader.module.css';
import { useMutation } from '@tanstack/react-query';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallReactions } from '@/components/landing/shared/reaction';
import { payment } from '@/components/landing/modules/payment/helpers/constant';

type Request = {
  room_id: number;
  hotel_id: number;
  room_number: number;
  date: {
    enter: string;
    exit: string;
  };
};

type Props = {
  roomId: number;
  hotelId: number;
  roomNumber: number;
  checkAuth?: () => boolean;
};

// -----------------------------

export default function ReserveButton(props: Props) {
  const { roomId, hotelId, roomNumber } = props;

  const router = useRouter();
  const searchParams = useSearchParams();
  const callReaction = useCallReactions();
  const [isLoading, setLoading] = useState(false);

  const { mutate } = useMutation<any, AxiosError<any>, Request>({
    mutationFn: (data) => {
      setLoading(true);
      return axiosInstance.post('hotel/reservation/create/', data);
    },
    onSuccess: (response) => {
      setLoading(false);
      const trackingCode =
        response?.data?.tracking_code ||
        response?.data?.data?.tracking_code ||
        (response as any)?.tracking_code;

      if (trackingCode) {
        router.push(
          `/payment/complete-passengers-information?${payment.reservationId}=${trackingCode}`,
          { scroll: false },
        );
      } else {
        router.push('/payment/complete-passengers-information', { scroll: false });
      }
    },
    onError: (error) => {
      setLoading(false);
      callReaction({
        type: 'error',
        title: 'متاسفانه خطایی رخ داده است !',
        description:
          error?.response?.data?.detail ??
          error?.response?.data?.error ??
          'عملیات رزرو با مشکلی روبرو شده است. لطفاً مجدداً تلاش فرمایید.',
      });
    },
  });

  function handleClick() {
    const exitDate = searchParams.get('end-date');
    const enterDate = searchParams.get('start-date');

    if (!enterDate || !exitDate) {
      callReaction({
        type: 'error',
        title: 'تاریخ ورود و خروج مشخص نشده است',
        description: 'لطفاً ابتدا تاریخ ورود و خروج اقامت خود را مشخص فرمایید.',
      });
      return;
    }

    mutate({
      room_id: roomId,
      hotel_id: hotelId,
      room_number: roomNumber,
      date: {
        enter: enterDate,
        exit: exitDate,
      },
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="col-span-2 flex-center h-11 w-full rounded-cs-10 bg-cs-dark-blue font-bold text-zinc-100"
    >
      {isLoading ? (
        <span
          className={loader.dots}
          style={{ '--dots-color': '#fff' } as CSSVars}
        />
      ) : (
        'رزرو اتاق'
      )}
    </button>
  );
}
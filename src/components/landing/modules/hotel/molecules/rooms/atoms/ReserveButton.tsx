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

type Response = {
  data: { tracking_code: string };
};

type Props = {
  roomId: number;
  hotelId: number;
  roomNumber: number;
  checkAuth: () => boolean;
};

// -----------------------------

export default function ReserveButton(props: Props) {
  const { checkAuth, roomId, hotelId, roomNumber } = props;

  const router = useRouter();
  const searchParams = useSearchParams();

  const callReaction = useCallReactions();
  // const isMultipleRoom = roomId.length > 1;
  const [isLoading, setLoading] = useState(false);

  const { mutate } = useMutation<Response, AxiosError<any>, Request>({
    mutationFn: (data) => {
      setLoading(true);
      return axiosInstance.post('hotel/reservation/create/', data);
    },
    onSuccess: (response) => {
      router.push(
        `/payment/complete-passengers-information?${payment.reservationId}=${response.data.tracking_code}`,
        { scroll: false },
      );
    },
    onError: (error) => {
      setLoading(false);
      callReaction({
        type: 'error',
        title: 'متاسفانه خطایی رخ داده است !',
        description:
          error?.response?.data?.error ??
          'عملیات رزرو با مشکلی در سرور روبرو شده است',
      });
    },
  });

  function handleClick() {
    const exitDate = searchParams.get('end-date');
    const enterDate = searchParams.get('start-date');

    if (!checkAuth() || !enterDate || !exitDate) return;

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
      className={`flex-center h-11 rounded-cs-10 text-cs08 ${false ? 'bg-cs-blue/10 font-extrabold text-cs-blue lg:w-32' : 'col-span-2 w-full bg-cs-dark-blue font-bold text-zinc-100'}`}
    >
      {isLoading ? (
        <span
          className={loader.dots}
          style={{ '--dots-color': false ? '#4b5bce' : '#fff' } as CSSVars}
        />
      ) : false ? (
        'رزرو اتاق ها'
      ) : (
        'رزرو اتاق'
      )}
    </button>
  );
}

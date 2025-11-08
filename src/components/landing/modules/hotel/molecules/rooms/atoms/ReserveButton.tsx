import { CSSVars } from '@/types/landing';
import loader from '@/styles/loader.module.css';

import { useState } from 'react';
import { AxiosError } from 'axios';
import { axiosInstance } from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallReactions } from '@/components/landing/shared/reaction';
import { payment } from '@/components/landing/modules/payment/helpers/constant';

type Request = {
  hotel_id: number;
  room_id: number[];
  date: {
    enter: string;
    exit: string;
  };
};

type Response = {
  data: { tracking_code: string };
};

type Props = {
  hotelId: number;
  roomId: number[];
  checkAuth: () => boolean;
};

// -----------------------------

export default function ReserveButton(props: Props) {
  const { checkAuth, roomId, hotelId } = props;

  const router = useRouter();
  const searchParams = useSearchParams();

  const callReaction = useCallReactions();
  const isMultipleRoom = roomId.length > 1;

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
    const authCheck = checkAuth();

    const exitDate = searchParams.get('end-date');
    const enterDate = searchParams.get('start-date');

    if (!authCheck || !enterDate || !exitDate) return;

    mutate({
      hotel_id: hotelId,
      room_id: roomId,
      date: {
        enter: enterDate,
        exit: exitDate,
      },
    });
  }

  return (
    <button
      onClick={handleClick}
      className={`text-cs08 h-11 flex-center rounded-cs-10 ${isMultipleRoom ? 'bg-cs-blue/10 text-cs-blue font-extrabold lg:w-32' : 'w-full bg-cs-dark-blue text-zinc-100 font-bold col-span-2'}`}
    >
      {isLoading ? (
        <span
          className={loader.dots}
          style={
            { '--dots-color': isMultipleRoom ? '#4b5bce' : '#fff' } as CSSVars
          }
        />
      ) : isMultipleRoom ? (
        'رزرو اتاق ها'
      ) : (
        'رزرو اتاق'
      )}
    </button>
  );
}

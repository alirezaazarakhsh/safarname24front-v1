'use client';

import { axiosInstance } from '@/utils/axios';
import { payment } from '../helpers/constant';
import loader from '@/styles/loader.module.css';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

type ApiResponse = {};
type TResponse = 'success' | 'cancel' | 'error';

const info = {
  success: {
    title: 'اطلاعات رزرو شما با موفقیت تایید شد',
    desc: 'مشتری گرامی درخواست رزرو شما تایید شده است , در ادامه میتوانید اقدام به پرداخت صورتحساب نمایید .',
  },
  cancel: {
    title: 'اطلاعات رزرو شما تایید نشد !',
    desc: 'مشتری گرامی درخواست رزرو شما به دلیل عدم ظرفیت یا اطلاعات اشتباه مورد تایید نمیباشد .',
    button: 'ثبت رزرو جدید',
  },
  error: {
    title: 'خطایی رخ داده است !',
    desc: 'مشتری گرامی درخواست رزرو شما با مشکلی روبرو شده است , لطفا  مجدد تلاش فرمایید .',
    button: 'تلاش مجدد',
  },
};

// ------------------------------

export function CheckReservationInfo() {
  const searchParams = useSearchParams();
  const trackingCode = searchParams.get(payment.reservationId);

  const type: TResponse = 'success';

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['reservation-form'],
    queryFn: () => axiosInstance(`/hotel/reservation/form/${trackingCode}`),
  });

  function handleClick() {}

  return (
    <div className="bg-white text-cs08/6 font-semibold p-5 py-4 grid overflow-hidden border rounded-xl">
      {status === 'pending' ? (
        <div className="h-28 flex-center">
          <div className={loader.dots} />
        </div>
      ) : status === 'error' ? (
        <p className="text-zinc-500 text-cs08 font-semibold">
          خطا در محاسبه اطلاعات رزرو !
        </p>
      ) : (
        <>
          <p
            className={`text-cs85 font-bold pb-2.5 border-b ${type === 'success' ? 'text-green-600' : 'text-cs-red'}`}
          >
            {info[type].title}
          </p>

          <p className="text-zinc-600 mt-3"> {info[type].desc}</p>

          {/* {type !== 'success' && (
            <button
              onClick={handleClick}
              className="w-fit bg-zinc-100 text-zinc-800 px-5 py-2 rounded-lg"
            >
              {info[type].button}
            </button>
          )} */}
        </>
      )}
    </div>
  );
}

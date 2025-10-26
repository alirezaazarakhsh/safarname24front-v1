'use client';

import Link from 'next/link';
import { payment } from '../helpers/constant';
import { axiosInstance } from '@/utils/axios';
import loader from '@/styles/loader.module.css';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

type ApiResponse = { data: { payment_status: 'unpaid' | 'paid' | 'pending' } };

// ------------------------------

export function WatcherInfo() {
  const searchParams = useSearchParams();
  const trackingCode = searchParams.get(payment.reservationId);

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['payment-status'],
    queryFn: () => axiosInstance(`/payment/payment-status/${trackingCode}/`),
  });

  const paymentStatus = data?.data.payment_status;
  //   console.log(paymentStatus);

  return (
    <div className="bg-white p-5 border text-cs08/6 font-semibold rounded-xl">
      {status === 'pending' ? (
        <div className="h-28 flex-center">
          <div className={loader.dots} />
        </div>
      ) : (
        <>
          {paymentStatus === 'paid' ? (
            <div className="grid">
              <p className="text-cs85/5 font-bold pb-3 border-b text-green-600">
                پرداخت صورتحساب با موفقیت انجام شد
              </p>

              <p className="text-zinc-600 mt-3.5 mb-4">
                مشتری گرامی سپاس از اعتماد شما نسبت به مجموعه سفرنامه 24 , خرید
                شما با موفقیت انجام شد .
              </p>

              <Link
                href={`/dashboard/reservations/${trackingCode}`}
                className="bg-zinc-100 w-fit px-5 py-2.5 text-zinc-800 rounded-lg"
              >
                مشاهده واچر
              </Link>
            </div>
          ) : (
            <div className="grid">
              <p className="text-cs85/5 font-bold pb-3 border-b text-cs-red">
                پرداخت صورتحساب با خطا مواجه شد
              </p>

              <p className="text-zinc-600 mt-3.5 mb-4">
                مشتری گرامی به دلیل مشکل فنی در سیستم درگاه پرداخت , رزرو شما
                قابل پیگیری نمیباشد .
                <br />
                لطفا رزرو جدیدی را با استفاده از دکمه زیر ثبت نمایید .
              </p>

              <Link
                href={'/best-hotels'}
                className="bg-zinc-100 w-fit px-5 py-2.5 text-zinc-800 rounded-cs-10"
              >
                ثبت رزرو جدید
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

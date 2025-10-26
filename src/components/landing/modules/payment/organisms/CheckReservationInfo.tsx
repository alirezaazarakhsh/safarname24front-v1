'use client';

import { payment } from '../helpers/constant';
import loader from '@/styles/loader.module.css';

import { useSearchParams } from 'next/navigation';
import { TimerDisplay } from '../molecules/check-reservation-info';
import { useReservationStatus } from '../helpers/useReservationStatus';

// ------------------------------

export function CheckReservationInfo() {
  const searchParams = useSearchParams();

  const { reservationId, checkReservationInfo: info } = payment;
  const trackingCode = searchParams.get(reservationId);

  const { queryStatus, status, timer } = useReservationStatus(trackingCode);
  // console.log({ status, timer, queryStatus });

  return (
    <div className="bg-white text-cs08/6 font-semibold p-5 py-4 grid overflow-hidden border rounded-xl">
      {status === 'initial' ? (
        <div className="h-28 flex-center">
          <div className={loader.dots} />
        </div>
      ) : queryStatus === 'error' ? (
        <p className="text-zinc-500 text-cs08 font-semibold">
          خطا در بررسی اطلاعات رزرو !
        </p>
      ) : (
        <>
          <p
            className={`text-cs85 font-bold pb-2.5 border-b ${status === 'confirmed' ? 'text-green-600' : status === 'rejected' ? 'text-cs-red' : 'text-zinc-800'}`}
          >
            {status === 'confirmed'
              ? info.confirmed.title
              : status === 'rejected'
                ? info.rejected.title
                : 'در حال بررسی تایید ادمین ...'}
          </p>

          <div className="text-zinc-600 mt-3">
            {status === 'confirmed' ? (
              info.confirmed.desc
            ) : status === 'rejected' ? (
              info.rejected.desc
            ) : (
              <TimerDisplay seconds={timer} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

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

  const { status, timer } = useReservationStatus(trackingCode);
  // console.log({ status, timer });

  return (
    <div className="grid overflow-hidden rounded-xl border bg-white p-5 py-4 text-cs08/6 font-semibold">
      {status === 'initial' ? (
        <div className="flex-center h-28">
          <div className={loader.dots} />
        </div>
      ) : (
        <>
          <p
            className={`border-b pb-2.5 text-cs85 font-bold ${status === 'confirmed' ? 'text-green-600' : status === 'rejected' ? 'text-cs-red' : 'text-zinc-800'}`}
          >
            {status === 'confirmed'
              ? info.confirmed.title
              : status === 'rejected'
                ? info.rejected.title
                : 'در حال بررسی تایید ادمین ...'}
          </p>

          <div className="mt-3 text-zinc-600">
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

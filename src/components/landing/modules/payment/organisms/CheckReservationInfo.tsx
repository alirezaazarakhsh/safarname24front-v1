'use client';

import { axiosInstance } from '@/utils/axios';
import { payment } from '../helpers/constant';
import loader from '@/styles/loader.module.css';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type ApiResponse = {};
type TResponse = 'success' | 'cancel' | 'error';

// ------------------------------

export function CheckReservationInfo() {
  const searchParams = useSearchParams();

  const { reservationId, checkReservationInfo: info } = payment;
  const trackingCode = searchParams.get(reservationId);

  const type: TResponse = 'success';

  useEffect(() => {
    // wss://cps.safarnameh24.com/ws/reservation/sfa5098846462/
    const ws = new WebSocket(
      `wss://cps.safarnameh24.com/ws/${trackingCode}/`,
    );

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    console.log('event');
    ws.onmessage = (event) => {
      try {
        console.log(event);
        const data = JSON.parse(event.data);
        console.log(data);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };
  }, []);

  function handleClick() {}

  return (
    <>
      {/* <div className="bg-white text-cs08/6 font-semibold p-5 py-4 grid overflow-hidden border rounded-xl">
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

            {type !== 'success' && (
              <button
                onClick={handleClick}
                className="w-fit bg-zinc-100 text-zinc-800 px-5 py-2 rounded-lg"
              >
                {info[type].button}
              </button>
            )}
          </>
        )}
      </div> */}
    </>
  );
}

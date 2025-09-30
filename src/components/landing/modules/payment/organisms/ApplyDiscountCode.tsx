'use client';

import {
  RemoveDiscountCode,
  SubmitDiscountCode,
} from '../molecules/apply-discount-code';

import { useEffect, useState } from 'react';
import { axiosInstance } from '@/utils/axios';
import { payment } from '../helpers/constant';

import loader from '@/styles/loader.module.css';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

type ApiResponse = { discount_code: string };

// ------------------------------

export function ApplyDiscountCode() {
  const searchParams = useSearchParams();
  const trackingCode = searchParams.get(payment.reservationId);

  const [discountCode, setDiscountCode] = useState('');

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    const filteredInput = input
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(0, 8)
      .toUpperCase();

    setDiscountCode(filteredInput);
  }

  // === GET
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['reservation-invoice'],
    queryFn: () => axiosInstance(`/hotel/reservation/invoice/${trackingCode}/`),
  });

  // === Set-State Discount-Code
  useEffect(() => {
    if (data?.discount_code) {
      setDiscountCode(data?.discount_code);
    }
  }, [data]);

  return (
    <div className="relative bg-white text-cs08 font-semibold p-5 pt-4 border rounded-xl">
      <span className="text-cs85 font-bold">اعمال کد تخفیف</span>
      <div className="my-3 border-b" />
      <span className="text-zinc-500">
        مشترک گرامی کد تخفیف خود را وارد نمایید :
      </span>

      {status === 'pending' && (
        <div className="absolute left-0 -top-0.5 flex-center">
          <span className={loader.spinner} style={{ scale: '0.25' }} />
        </div>
      )}

      <div className="h-11 mt-6 grid grid-cols-2 gap-3.5">
        <SubmitDiscountCode
          trackingCode={trackingCode}
          discountCode={discountCode}
        />

        <div className="relative flex overflow-hidden rounded-cs-10">
          <RemoveDiscountCode
            trackingCode={trackingCode}
            discountCode={data?.discount_code}
          />

          <input
            type="text"
            maxLength={8}
            value={discountCode}
            onChange={handleInputChange}
            placeholder="- - - - - - - -"
            className="w-full bg-zinc-100 text-zinc-500 text-cs08 font-inter text-center"
          />
        </div>
      </div>
    </div>
  );
}

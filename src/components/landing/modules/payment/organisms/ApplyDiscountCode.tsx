'use client';

import {
  RemoveDiscountCode,
  SubmitDiscountCode,
} from '../molecules/apply-discount-code';

import { useState } from 'react';
import { Invoice } from '../helpers/type';
import { numberSeparation } from '@/utils';

import { axiosInstance } from '@/utils/axios';
import { payment } from '../helpers/constant';
import SimpleError from '../atoms/SimpleError';

import loader from '@/styles/loader.module.css';
import { useSearchParams } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type ApiResponse = { data: Invoice };

// ------------------------------

export function ApplyDiscountCode() {
  const searchParams = useSearchParams();
  const trackingCode = searchParams.get(payment.reservationId);

  const queryClient = useQueryClient();
  const [discountCode, setDiscountCode] = useState('');

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    const filteredInput = input
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(0, 8)
      .toUpperCase();

    setDiscountCode(filteredInput);
  }

  // === GET Price-Number of Discount-Code
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['reservation-invoice'],
    queryFn: () =>
      axiosInstance(`/hotel/reservation/invoice/${trackingCode}/`),
  });

  function handleInvalidateQuery() {
    setDiscountCode('');
    queryClient.invalidateQueries({ queryKey: ['reservation-invoice'] });
  }

  return (
    <div className="relative bg-white text-cs08 font-semibold p-5 pt-4 border rounded-xl">
      <div className="text-cs85 font-bold pb-3 mb-3.5 border-b">
        اعمال کد تخفیف
      </div>

      {status === 'pending' ? (
        <div className="h-20 flex-center">
          <div className={loader.dots} />
        </div>
      ) : status === 'error' ? (
        <SimpleError desc="خطا در نمایش اطلاعات کد تخفیف" />
      ) : data?.data.discount_code ? (
        <>
          <div className="h-10 mt-4 flex gap-2.5">
            <div className="bg-cs-red/10 text-cs-red font-bold px-3.5 flex-between flex-1 items-center gap-1 border border-cs-red/10 rounded-lg">
              <span>مبلغ تخفیف :</span>
              <span>{numberSeparation(data?.data.discount_code)} تومان</span>
            </div>

            <RemoveDiscountCode
              trackingCode={trackingCode}
              handleInvalidateQuery={handleInvalidateQuery}
            />
          </div>
        </>
      ) : (
        <>
          <p className="text-zinc-500">
            مشتری گرامی کد تخفیف خود را وارد نمایید :
          </p>

          <div className="h-11 mt-5 grid grid-cols-2 gap-3.5">
            <SubmitDiscountCode
              trackingCode={trackingCode}
              discountCode={discountCode}
              handleInvalidateQuery={handleInvalidateQuery}
            />

            <div className="relative flex overflow-hidden rounded-cs-10">
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
        </>
      )}
    </div>
  );
}

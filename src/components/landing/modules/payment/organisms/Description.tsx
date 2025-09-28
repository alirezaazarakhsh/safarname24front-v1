'use client';

import { useEffect, useState } from 'react';
import { payment } from '../helpers/constant';
import { axiosInstance } from '@/utils/axios';

import loader from '@/styles/loader.module.css';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useSearchParams } from 'next/navigation';

type Response = { data: { description: string } };

// ------------------------------

export function Description() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState('');
  const trackingCode = searchParams.get(payment.reservationId);

  const { data, status } = useQuery<Response>({
    queryKey: ['reservation-description'],
    queryFn: () =>
      axiosInstance(`/hotel/reservation/description/${trackingCode}/`),
  });

  // === Updating Value Based-On data
  useEffect(() => {
    const description = data?.data.description;
    if (description) setValue(data?.data.description);
  }, [data]);

  // === Updating Session-Storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(payment.descriptionKey, value);
    }
  }, [value]);

  return (
    <div className="relative bg-white p-5 pt-4 grid gap-3 overflow-hidden border rounded-xl">
      <div className="flex items-center gap-2">
        <span className="text-cs85 font-bold">توضیحات :</span>
        <span className="bg-zinc-100 text-zinc-500 text-cs07 font-semibold px-2 py-0.5 pt-1 rounded-md">
          * اختیاری
        </span>
      </div>

      {status === 'pending' && (
        <div className="absolute left-0 -top-0.5 flex-center">
          <span className={loader.spinner} style={{ scale: '0.25' }} />
        </div>
      )}

      <textarea
        value={value}
        name="description"
        onChange={(e) => setValue(e.target.value)}
        placeholder="توضیحات تکمیلی خود را وارد نمایید ..."
        readOnly={pathname !== '/payment/complete-passengers-information'}
        className="min-h-20 max-h-40 text-zinc-500 text-cs08/5 font-semibold custom-scrollbar resize-y outline-none"
      />
    </div>
  );
}

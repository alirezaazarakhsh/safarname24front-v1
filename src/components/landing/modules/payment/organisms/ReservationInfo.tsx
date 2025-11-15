'use client';

import { FormSchema } from '../helpers/type';
import { payment } from '../helpers/constant';
import { axiosInstance } from '@/utils/axios';

import SimpleError from '../atoms/SimpleError';
import loader from '@/styles/loader.module.css';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { RoomInfo } from '../molecules/reservation-form';
import { Reserver, RoomTable } from '../molecules/passengers-table';

// ------------------------------

export function ReservationInfo() {
  const searchParams = useSearchParams();
  const trackingCode = searchParams.get(payment.reservationId);

  const { data, status } = useQuery<FormSchema>({
    queryKey: ['reservation-form'],
    queryFn: async () => {
      return axiosInstance(`/hotel/reservation/form/${trackingCode}/`).then(
        (data) => data.data,
      );
    },
  });

  return (
    <div className="rounded-xl border bg-white p-5">
      {status === 'pending' ? (
        <div className="flex-center h-80">
          <div className={loader.dots} style={{ scale: '1.6' }} />
        </div>
      ) : status === 'error' ? (
        <div className="ml-auto">
          <SimpleError desc="خطا در نمایش اطلاعات مسافران" />
        </div>
      ) : (
        <div className="pb-1">
          <Reserver reserver={data?.reserver} />

          <div className="space-y-8 pb-1">
            {[...data?.rooms, ...data?.rooms].map((room, index) => (
              <div key={index} className="space-y-4">
                <RoomInfo
                  name={room.name}
                  discountOnPurchase={0}
                  capacity={room.capacity}
                  extraCapacity={room.extra_capacity}
                />

                <div className="overflow-auto rounded-cs-10 border">
                  <RoomTable room={room} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

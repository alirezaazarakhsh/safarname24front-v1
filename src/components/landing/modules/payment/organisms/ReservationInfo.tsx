'use client';

import { payment } from '../helpers/constant';
import { axiosInstance } from '@/utils/axios';
import loader from '@/styles/loader.module.css';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { Person, RoomForm } from '../helpers/type';
import { RoomInfo } from '../molecules/reservation-form';
import { Reserver, RoomTable } from '../molecules/passengers-table';

type ApiResponse = {
  data: {
    reserver: Person;
    rooms: RoomForm[];
  };
};

// ------------------------------

export function ReservationInfo() {
  const searchParams = useSearchParams();
  const trackingCode = searchParams.get(payment.reservationId);

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['reservation-form'],
    queryFn: () => axiosInstance(`/hotel/reservation/form/${trackingCode}`),
  });

  return (
    <>
      {status === 'pending' ? (
        <div className="bg-white h-96 p-5 flex-center border rounded-xl">
          <div className={loader.dots} style={{ scale: '1.6' }} />
        </div>
      ) : (
        <div className="bg-white p-5 pb-6 border rounded-xl">
          <Reserver reserver={data?.data.reserver} />

          {data?.data.rooms.map((room, index) => (
            <div
              key={index}
              className="space-y-5 border-b pb-6 last:border-b-0 last:pb-0"
            >
              <RoomInfo
                name={room.name}
                discountOnPurchase={0}
                capacity={room.capacity}
                extraCapacity={room.extra_capacity}
              />

              <div className="border overflow-auto rounded-cs-10">
                <RoomTable room={room} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

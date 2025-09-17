'use client';

import {
  RoomName,
  TrackingCode,
  ReservationField,
} from '../molecules/reservation-details';

import { payment } from '../helpers/constant';
import { HotelInitialInfo } from '@/types/landing';
import { generalInstance } from '@/utils/services';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

type ApiResponse = { data: HotelInitialInfo };

// ------------------------------

export function ReservationDetails() {
  const { reservationId: reserveId } = payment;

  const searchParams = useSearchParams();
  const trackingCode = searchParams.get(reserveId);

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-information'],
    queryFn: () =>
      generalInstance(`/hotel/hotels/${'parsianazadi'}/introduction`),
  });

  const isLoading = status === 'pending';

  return (
    <div className="bg-white p-5 pt-4 border rounded-xl">
      <span className="text-cs85 font-bold">مشخصات رزرو هتل</span>

      <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <ReservationField
          icon="Clock"
          isLoading={isLoading}
          title="تاریخ و ساعت ورود"
          value={`1404/08/15 - ساعت 15:00`}
        />

        <ReservationField
          icon="Clock"
          isLoading={isLoading}
          title="تاریخ و ساعت خروج"
          value={`1404/08/18 - ساعت 11:00`}
        />

        <ReservationField
          icon="Moon"
          value={`3 شب`}
          isLoading={isLoading}
          title="تعداد شب اقامت"
        />

        <ReservationField
          title="هتل"
          icon="Buliding"
          isLoading={isLoading}
          value={`پارسیان آزادی - 5 ستاره`}
        />

        <ReservationField
          icon="Buildings2"
          title="شهر و استان"
          isLoading={isLoading}
          value={`تهران - تهران`}
        />

        <ReservationField
          value={`2 اتاق`}
          icon="Buildings"
          title="تعداد اتاق"
          isLoading={isLoading}
        />

        <RoomName
          isLoading={isLoading}
          rooms={['1 تخته لوکس ویژن', '1 تخته لوکس ویژن']}
        />

        <TrackingCode isLoading={isLoading} value={trackingCode} />
      </div>
    </div>
  );
}

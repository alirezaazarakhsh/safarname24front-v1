'use client';

import {
  TrackingCode,
  ReservationField,
} from '../molecules/reservation-details';

import { payment } from '../helpers/constant';
import { axiosInstance } from '@/utils/axios';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { ReservationDetail } from '../helpers/type';

type Response = { data: ReservationDetail };

// ------------------------------

export function ReservationDetails() {
  const searchParams = useSearchParams();
  const trackingCode = searchParams.get(payment.reservationId);

  const { data, status } = useQuery<Response>({
    queryKey: ['reservation-detail'],
    queryFn: () =>
      axiosInstance(`/hotel/reservation/reservation-detail/${trackingCode}/`),
  });

  const detail = data?.data;
  const isLoading = status === 'pending';

  return (
    <div className="bg-white p-5 pt-4 border rounded-xl">
      <span className="text-cs85 font-bold">مشخصات رزرو هتل</span>

      <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <ReservationField
          icon="Clock"
          isLoading={isLoading}
          title="تاریخ و ساعت ورود"
          value={`${detail?.date.enter.replaceAll('-', '/')} - ساعت ${detail?.time.enter.slice(0, 5)}`}
        />

        <ReservationField
          icon="Clock"
          isLoading={isLoading}
          title="تاریخ و ساعت خروج"
          value={`${detail?.date.exit.replaceAll('-', '/')} - ساعت ${detail?.time.exit.slice(0, 5)}`}
        />

        <ReservationField
          icon="Moon"
          isLoading={isLoading}
          title="تعداد شب اقامت"
          value={`${detail?.number_of_nights} شب`}
        />

        <ReservationField
          title="هتل"
          icon="Buliding"
          isLoading={isLoading}
          value={`${detail?.hotel_name} - ${detail?.hotel_star} ستاره`}
        />

        <ReservationField
          icon="Buildings2"
          title="شهر و استان"
          isLoading={isLoading}
          value={`${detail?.city_name} - ${detail?.province_name}`}
        />

        <ReservationField
          icon="Buildings"
          title="تعداد اتاق"
          isLoading={isLoading}
          value={`${detail?.number_of_rooms} اتاق`}
        />

        <ReservationField
          icon="ReceiptText"
          isLoading={isLoading}
          title="نیم شارژ ورود هتل"
          value={detail?.half_charges.enter ? 'دارد' : 'ندارد'}
        />

        <ReservationField
          icon="ReceiptText"
          isLoading={isLoading}
          title="نیم شارژ خروج هتل"
          value={detail?.half_charges.exit ? 'دارد' : 'ندارد'}
        />

        <TrackingCode isLoading={isLoading} value={trackingCode} />
      </div>
    </div>
  );
}

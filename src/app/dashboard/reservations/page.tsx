// Forcing next.js to render this component as client side component
'use client';

// Importing part
import ErrorTable from '@/components/dashboard/api/errorTable';
import AllFactorsTable from '@/components/dashboard/reservation/allFactorsTable';
import Filter from '@/components/dashboard/reservation/filter';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETReservation, GETReservationItem } from '@/types/dashboard/api/get';
import { ReactNode, useEffect, useState } from 'react';

// Defining fake data for now
const reservations: GETReservationItem[] = [
  {
    uuid: 'a1f9e7c3-12ab-45d8-b091-12f4c123abcd',
    user: 101,
    room_dates: [1730000000, 1730086400],
    passengers: [1, 2],
    extra_passengers: [],
    paid_price: 1200000,
    status: 'success',
    fail_reason: '',
    expired_date: '2025-10-22T12:00:00Z',
    additional_details: 'رزرو با موفقیت انجام شد.',
    has_check_in_half_day_charge: false,
    has_check_out_half_day_charge: false,
    created: '2025-10-20T14:32:00Z',
    updated: '2025-10-20T14:35:00Z',
  },
  {
    uuid: 'b2e4d9f5-42ff-4c19-a7c9-99a221fe7721',
    user: 102,
    room_dates: [1730092800, 1730179200],
    passengers: [1],
    extra_passengers: [3],
    paid_price: 850000,
    status: 'pending_approve',
    fail_reason: '',
    expired_date: '2025-10-22T10:00:00Z',
    additional_details: 'در انتظار تایید مدیریت.',
    has_check_in_half_day_charge: true,
    has_check_out_half_day_charge: false,
    created: '2025-10-21T09:00:00Z',
    updated: '2025-10-21T09:01:00Z',
  },
  {
    uuid: 'c3d8a9f1-22be-4901-b9f4-771f3a1aa932',
    user: 103,
    room_dates: [1730179200, 1730265600],
    passengers: [1, 2, 3],
    extra_passengers: [],
    paid_price: 2400000,
    status: 'approved',
    fail_reason: '',
    expired_date: '2025-10-25T12:00:00Z',
    additional_details: 'رزرو تایید و پرداخت انجام شده است.',
    has_check_in_half_day_charge: false,
    has_check_out_half_day_charge: true,
    created: '2025-10-19T11:00:00Z',
    updated: '2025-10-19T11:05:00Z',
  },
  {
    uuid: 'd4aa221b-45c2-4ff1-9b42-abc4412c99aa',
    user: 104,
    room_dates: [1730265600, 1730352000],
    passengers: [2],
    extra_passengers: [],
    paid_price: 0,
    status: 'payment',
    fail_reason: '',
    expired_date: '2025-10-24T09:00:00Z',
    additional_details: 'در حال پرداخت توسط کاربر.',
    has_check_in_half_day_charge: false,
    has_check_out_half_day_charge: false,
    created: '2025-10-21T12:00:00Z',
    updated: '2025-10-21T12:01:00Z',
  },
  {
    uuid: 'e5f123b9-8872-4f43-b18c-7ddfe09f2210',
    user: 105,
    room_dates: [1730352000, 1730438400],
    passengers: [1, 4],
    extra_passengers: [5],
    paid_price: 1700000,
    status: 'rejected',
    fail_reason: 'عدم موجودی اتاق در تاریخ انتخابی.',
    expired_date: '2025-10-25T12:00:00Z',
    additional_details: 'درخواست توسط مدیریت رد شد.',
    has_check_in_half_day_charge: false,
    has_check_out_half_day_charge: false,
    created: '2025-10-19T15:00:00Z',
    updated: '2025-10-19T15:05:00Z',
  },
  {
    uuid: 'f6b3e8d4-3219-4d23-941c-8aa442ed1120',
    user: 106,
    room_dates: [1730438400, 1730524800],
    passengers: [1, 2],
    extra_passengers: [],
    paid_price: 950000,
    status: 'failed',
    fail_reason: 'پرداخت ناموفق بود.',
    expired_date: '2025-10-22T18:00:00Z',
    additional_details: 'خطا در درگاه بانکی.',
    has_check_in_half_day_charge: false,
    has_check_out_half_day_charge: false,
    created: '2025-10-21T13:30:00Z',
    updated: '2025-10-21T13:32:00Z',
  },
  {
    uuid: 'g7f9a1e3-22b4-4e19-b8d9-44ee3321bb11',
    user: 107,
    room_dates: [1730524800, 1730611200],
    passengers: [1, 3],
    extra_passengers: [],
    paid_price: 1150000,
    status: 'expired',
    fail_reason: 'زمان پرداخت منقضی شده است.',
    expired_date: '2025-10-22T22:00:00Z',
    additional_details: 'رزرو به دلیل عدم پرداخت لغو شد.',
    has_check_in_half_day_charge: false,
    has_check_out_half_day_charge: false,
    created: '2025-10-20T08:00:00Z',
    updated: '2025-10-20T08:05:00Z',
  },
  {
    uuid: 'h8d1e7f2-12c3-4129-84a1-9c9932a4d771',
    user: 108,
    room_dates: [1730611200, 1730697600],
    passengers: [2],
    extra_passengers: [4, 5],
    paid_price: 2100000,
    status: 'success',
    fail_reason: '',
    expired_date: '2025-10-28T12:00:00Z',
    additional_details: 'پرداخت با موفقیت انجام شد.',
    has_check_in_half_day_charge: true,
    has_check_out_half_day_charge: true,
    created: '2025-10-18T10:00:00Z',
    updated: '2025-10-18T10:05:00Z',
  },
  {
    uuid: 'i9e4a6f8-4433-4e28-a1bb-1211c8e9aa99',
    user: 109,
    room_dates: [1730697600, 1730784000],
    passengers: [1, 2, 3],
    extra_passengers: [],
    paid_price: 1800000,
    status: 'approved',
    fail_reason: '',
    expired_date: '2025-10-29T10:00:00Z',
    additional_details: 'رزرو تایید نهایی شد.',
    has_check_in_half_day_charge: false,
    has_check_out_half_day_charge: false,
    created: '2025-10-21T15:00:00Z',
    updated: '2025-10-21T15:10:00Z',
  },
  {
    uuid: 'j0a2b3c4-55d5-4b1a-84ee-7f8831ccaa88',
    user: 110,
    room_dates: [1730784000, 1730870400],
    passengers: [1],
    extra_passengers: [],
    paid_price: 650000,
    status: 'pending_approve',
    fail_reason: '',
    expired_date: '2025-10-27T08:00:00Z',
    additional_details: 'در انتظار تایید نهایی.',
    has_check_in_half_day_charge: false,
    has_check_out_half_day_charge: false,
    created: '2025-10-21T11:00:00Z',
    updated: '2025-10-21T11:01:00Z',
  },
];

// Creating and exporting Reservations page as default
export default function ReservationsPage(): ReactNode {
  // Defining states of component
  const [filterVal, setFilterVal] = useState<string>('');

  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[25px] lg:bg-transparent bg-white">
      <Filter
        onChange={(val) => setFilterVal(val)}
        dataNotEmpty
        loading={false}
      />
      <AllFactorsTable data={reservations} loading={false} />
    </main>
  );
}

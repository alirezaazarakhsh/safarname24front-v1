'use client';

import {
  TrackingCode,
  ReservationField,
} from './molecules/reservation-details';

import dynamic from 'next/dynamic';
const Location = dynamic(
  () =>
    import('./molecules/reservation-details/Location').then(
      ({ Location }) => Location,
    ),
  { ssr: false },
);

// ------------------------------

export function ReservationDetails() {
  return (
    <div className="bg-white p-5 pt-4 border rounded-xl">
      <span className="text-cs85 font-bold">مشخصات رزرو هتل</span>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <ReservationField
          icon="Clock"
          title="تاریخ و ساعت ورود"
          value={`ساعت ورود ${'(14:00)'} - ${'1403/01/01'}`}
        />

        <ReservationField
          icon="Clock"
          title="تاریخ و ساعت خروج"
          value={`ساعت خروج ${'(14:00)'} - ${'1403/01/01'}`}
        />

        <ReservationField
          icon="House"
          title="هتل"
          value={`${'اسپیناس پالاس'} - ${'(تهران)'}`}
        />

        <ReservationField
          icon="Moon"
          title="تعداد شب اقامت"
          value={`${3} شب`}
        />

        <ReservationField
          icon="Building"
          title="نام اتاق"
          value={`دوبلکس رویال (VIP)`}
        />

        <ReservationField
          icon="Buildings2"
          title="تعداد اتاق"
          value={`${2} اتاق`}
        />

        <ReservationField
          icon="ReceiptText"
          title="نیم شارژ ورود"
          value={`دارد`}
        />

        <ReservationField
          icon="ReceiptText"
          title="نیم شارژ خروج"
          value={`ندارد`}
        />

        <ReservationField
          icon="HashtagUp"
          title="کد پیگیری رزرو"
          value={`#B6747T22`}
          valueDirection="ltr"
          valueClassName="font-inter text-right"
        />

        {/* <Location />
        <TrackingCode /> */}
      </div>
    </div>
  );
}

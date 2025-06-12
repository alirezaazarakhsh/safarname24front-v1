'use client';

import dynamic from 'next/dynamic';

import TrackingCode from './TrackingCode';
import ReservationField from './ReservationField';

const Location = dynamic(
  () => import('./Location').then(({ Location }) => Location),
  {
    ssr: false,
  },
);

// ------------------------------

export function ReservationDetails() {
  return (
    <div className="bg-white p-4 border-2 rounded-xl">
      {/* === Title */}
      <span className="text-cs09 font-extrabold">مشخصات رزرو هتل</span>

      {/* === Details-List */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3 lg:gap-6">
        <ReservationField
          icon="Clock"
          title="تاریخ و ساعت ورود"
          subtitle={`ساعت ورود ${'(14:00)'} - ${'1403/01/01'}`}
        />

        <ReservationField
          icon="Clock"
          title="تاریخ و ساعت خروج"
          subtitle={`ساعت خروج ${'(14:00)'} - ${'1403/01/01'}`}
        />

        <ReservationField
          icon="House"
          title="هتل"
          subtitle={`${'اسپیناس پالاس'} - ${'(تهران)'}`}
        />

        <ReservationField
          icon="Moon"
          title="تعداد شب اقامت"
          subtitle={`${3} شب`}
        />

        <ReservationField
          icon="Building"
          title="نام اتاق"
          subtitle={`دوبلکس رویال (VIP)`}
        />

        <ReservationField
          icon="Buildings2"
          title="تعداد اتاق"
          subtitle={`${2} اتاق`}
        />

        <ReservationField
          icon="ReceiptText"
          title="نیم شارژ ورود"
          subtitle={`دارد`}
        />

        <ReservationField
          icon="ReceiptText"
          title="نیم شارژ خروج"
          subtitle={`ندارد`}
        />

        <Location />
        <TrackingCode />
      </div>
    </div>
  );
}

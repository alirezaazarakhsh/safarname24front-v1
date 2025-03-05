// Importing part
import { ReactNode } from 'react';
import HotelAcceptSection from '@/components/dashboard/reservationFactor/hotelAcceptSection';
import Link from 'next/link';
import RoomsSection from '@/components/dashboard/reservationFactor/roomsSection';
import RulesSection from '@/components/dashboard/reservationFactor/rulesSection';
import Header from '@/components/dashboard/reservationFactor/header';

// Defining some dummy data
const data: {
  note?: string;
  location: {
    label: string;
    googleMapURL: string;
  };
  accept: {
    reserver: string;
    createdAt: string;
    codePeigiri: string;
    phoneNumber: string;
    enterAt: string;
    exitAt: string | null;
  }[];
  rooms: {
    info: {
      hotelName: string;
      timeSpan: 8; // in Nights
      meals: string;
      enteranceHalfCharge: boolean;
      exitHalfCharge: boolean;
      reserver: string;
    };
    passenger: string[];
  }[];
} = {
  note: 'توضیحات : لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است که بهبود بخشیده شده که میتواند به تمامی دیزاینر کمک کند.',
  location: {
    label:
      'آدرس هتل : جردن، خیابان مطهری، رو به روی بانک پارسیان نرسیده به هتل بین اللملی ایران',
    googleMapURL: '#',
  },
  accept: [
    {
      reserver: 'علیرضا آذرخش آلوچه',
      createdAt: new Date().toISOString(),
      codePeigiri: '45HGI13968V',
      phoneNumber: '09912346598',
      enterAt: new Date().toISOString(),
      exitAt: null,
    },
  ],
  rooms: [
    {
      info: {
        hotelName: 'هتل اسپیناس پالاس  - اتاق دوبلکس',
        timeSpan: 8,
        meals: 'ناهار و صبحانه',
        enteranceHalfCharge: true,
        exitHalfCharge: true,
        reserver: 'علیرضا آذرخش آلوچه',
      },
      passenger: ['پرهام رحیمی', 'محمد مهدی تاشا'],
    },
  ],
};

// Creating and exporting single Reservation edit page as default
export default function SingleReservationPage(): ReactNode {
  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 lg:pt-5 pt-[calc(28px+24px)] p-[24px] pb-[100px] flex flex-col lg:gap-8 gap-[25px]">
      <Header />
      <HotelAcceptSection data={data.accept} />
      <div className="p-3 lg:h-16 bg-gray-100 border border-black/10 rounded-lg flex items-center justify-between gap-5">
        <p className="font-medium  text-black text-cs75 block text-right truncate">{`${data.location.label} ادرس هتل :`}</p>
        <Link
          href={data.location.googleMapURL}
          className="h-10 px-3 border border-blue-500 bg-green-100 rounded-md transition-all duration-500 hover:bg-blue-200 text-blue-600 flex items-center justify-center"
        >
          <span className="text-current text-cs75 font-medium truncate block text-right">
            نقشه Google Map
          </span>
        </Link>
      </div>
      <RoomsSection data={data.rooms} />
      {data.note && (
        <div className="p-3 bg-cs-red/10 rounded-lg lg:h-16 flex items-center justify-start">
          <p className="font-medium  text-cs-red text-cs75 block text-right lg:truncate">
            {data.note}
          </p>
        </div>
      )}
      <RulesSection />
    </main>
  );
}

// Importing part
import { ReactNode } from 'react';
import Logo from '@/components/dashboard/ui/logo';
import HotelAcceptSection from '@/components/dashboard/reservationFactor/hotelAcceptSection';

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
    <main className="lg:p-5 lg:pb-5 p-[24px] pb-[100px] flex flex-col lg:gap-5 gap-[25px]">
      <Logo />
      <HotelAcceptSection data={data.accept} />
    </main>
  );
}

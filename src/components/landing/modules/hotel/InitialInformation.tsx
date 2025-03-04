'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';

import { ICApartment, ICClock, ICLocation } from '@/components/icons';

export const HotelMap = dynamic(() => import('./molecules/HotelMap').then(({ HotelMap }) => HotelMap), {
  ssr: false,
  loading: () => (
    <button className='top-4 left-4 w-full h-10 px-4 mt-6 flex-center self-start gap-2 border-2 border-zinc-200 rounded-lg md:absolute md:w-max md:mt-0'></button>
  ),
});

type Props = {
  information: {
    logo: string;
    hotelName: string;
    city: string;
    stars: number;
    address: string;
    numberOfRooms: number;
    numberOfFloors: number;
    entryTime: string;
    exitTime: string;
    geoLocation: { lat: number; lng: number };
  };
};

// -----------------------------------------

export function InitialInformation(props: Props) {
  const {
    information: {
      logo,
      hotelName,
      city,
      stars,
      address,
      numberOfRooms,
      numberOfFloors,
      entryTime,
      exitTime,
      geoLocation,
    },
  } = props;

  return (
    <div className='relative h-auto bg-white text-cs08 p-4 border-2 border-zinc-200 rounded-xl md:text-cs75'>
      {/* Logo | HotelName | City | Stars */}
      <div className='flex items-center gap-3'>
        <div className='w-16 h-16 overflow-hidden border-2 border-zinc-200 rounded-lg'>
          <Image src={logo} alt='hotel-logo' width={100} height={100} className='full-size object-cover' />
        </div>

        <div className='space-y-1'>
          <div className='text-zinc-800 text-cs09 font-extrabold flex-center gap-1'>
            <span>هتل</span>
            <span>{hotelName}</span>
            <span>{city}</span>
          </div>

          <div className='font-bold flex items-center gap-1'>
            <span>{stars}</span>
            <span>ستاره</span>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className='text-zinc-600 font-bold flex items-center gap-3 mt-6 mb-4'>
        <div className='w-9 h-9 flex-center border-2 border-zinc-200 rounded-md'>
          <ICLocation />
        </div>

        <div className='flex-1 flex items-center gap-1'>
          <span>آدرس</span>
          <span className='mx-0.5'>:</span>
          <span>{address}</span>
        </div>
      </div>

      {/* NumberOfRooms | NumberOfFloors | EntryTime | ExitTime */}
      <div className='text-zinc-600 font-bold grid gap-3 md:grid-cols-2 md:gap-4'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 flex-center border-2 border-zinc-200 rounded-md'>
            <ICApartment />
          </div>

          <div className='flex-center gap-1'>
            <span>تعداد اتاق</span>
            <span className='mx-0.5'>:</span>
            <span>{numberOfRooms}</span>
            <span>اتاق</span>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 flex-center border-2 border-zinc-200 rounded-md'>
            <ICApartment type={2} />
          </div>

          <div className='flex-center gap-1'>
            <span>تعداد طبقات</span>
            <span className='mx-0.5'>:</span>
            <span>{numberOfFloors}</span>
            <span>طبقه</span>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 flex-center border-2 border-zinc-200 rounded-md'>
            <ICClock className='w-5 h-5' />
          </div>

          <div className='flex-center gap-1'>
            <span>ساعت ورود</span>
            <span className='mx-0.5'>:</span>
            <span>{entryTime}</span>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 flex-center border-2 border-zinc-200 rounded-md'>
            <ICClock className='w-5 h-5' />
          </div>

          <div className='flex-center gap-1'>
            <span>ساعت خروج</span>
            <span className='mx-0.5'>:</span>
            <span>{exitTime}</span>
          </div>
        </div>
      </div>

      {/* Map */}
      <HotelMap hotelInfo={{ hotelName, city, address }} geoLocation={geoLocation} />
    </div>
  );
}

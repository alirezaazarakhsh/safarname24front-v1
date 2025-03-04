'use client';

import 'swiper/css';
import '@/styles/swiper.css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useMediaQuery } from '@/hooks';
import ImportantPlaceDrawer from './ImportantPlaceDrawer';

type Props = {
  importantPlaces: {
    title: string;
    image: string;
    distances: { byCar: number; onFoot: number; totalDistance: number };
    geolocation: { lat: number; lng: number };
  }[];
};

// -----------------------------------------

export default function MImportantPlaces(props: Props) {
  const { importantPlaces } = props;

  const isDesktop = useMediaQuery('(min-width: 1024px)');
  if (isDesktop) return null;

  return (
    <div>
      <Swiper
        spaceBetween={20}
        modules={[Pagination]}
        pagination={{ enabled: true, dynamicBullets: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
        }}
        className='hotelMImportantPlaces-swiper'
      >
        {importantPlaces?.map((importantPlace, index) => (
          <SwiperSlide key={index} className='select-none'>
            <div className='bg-white h-28 p-4 pt-5 flex flex-col border-2 border-zinc-200 rounded-xl'>
              <span className='text-zinc-800 text-cs85 font-extrabold'>{importantPlace.title}</span>

              <div className='mt-auto flex-between items-center'>
                <div className='text-zinc-800 text-cs08 font-semibold flex-center gap-1'>
                  <span>مسافت کلی</span>
                  <span>:</span>
                  <span>{importantPlace.distances.totalDistance}</span>
                  <span>کیلومتر</span>
                </div>

                <ImportantPlaceDrawer importantPlace={importantPlace} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

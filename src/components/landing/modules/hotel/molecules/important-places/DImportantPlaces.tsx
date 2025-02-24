'use client';

import 'swiper/css';
import '@/styles/swiper.css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import Image from 'next/image';
import { useRef, useState } from 'react';

import { useMediaQuery } from '@/hooks';
import { ICArrowLeft } from '@/components/icons';
import { ImportantPlaceMap } from './ImportantPlaceMap';
import DImportantPlaceCard from './DImportantPlaceCard';

type Props = {
  importantPlaces: {
    title: string;
    image: string;
    distances: { byCar: number; onFoot: number; totalDistance: number };
    geolocation: { lat: number; lng: number };
  }[];
};

// -----------------------------------------

export default function DImportantPlaces(props: Props) {
  const { importantPlaces } = props;

  const swiperRef = useRef<SwiperType>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const importantPlace = importantPlaces[activeSlide];

  const isDesktop = useMediaQuery('(min-width: 1024px)');
  if (!isDesktop) return null;

  return (
    <div className='relative h-96 mb-20 flex gap-8 xl:gap-10'>
      {/* Import-places info */}
      <div className='w-1/2'>
        <Swiper
          spaceBetween={15}
          slidesPerView={3}
          direction='vertical'
          modules={[Pagination]}
          pagination={{
            el: '.hotelDImportantPlaces-swiper-pagination',
            clickable: true,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className='hotelDImportantPlaces-swiper'
        >
          {importantPlaces?.map((importantPlace, index) => (
            <SwiperSlide key={index} className='select-none cursor-pointer' onClick={() => setActiveSlide(index)}>
              <DImportantPlaceCard importantPlace={importantPlace} slideIsActive={activeSlide === index} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Swiper-Pagination */}
        <div className='hotelDImportantPlaces-swiper-pagination swiper-pagination-horizontal' />
      </div>

      {/* Import-place Image | Map */}
      <div className='relative w-1/2 overflow-hidden rounded-[14px]'>
        <Image
          src={importantPlace.image}
          alt='place0view'
          width={600}
          height={400}
          className='full-size object-cover'
        />

        <ImportantPlaceMap geoLocation={importantPlace.geolocation} />
      </div>

      {/* Navigation */}
      <div className='absolute -bottom-16 right-0 h-9 flex gap-4'>
        <button
          className='bg-zinc-200/50 w-9 flex-center rounded-md transition-colors duration-200 ease-in-out hover:bg-zinc-200/70'
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ICArrowLeft className='w-3.5 h-3.5 stroke-zinc-400 rotate-180' />
        </button>

        <button
          className='bg-zinc-200/50 w-9 flex-center rounded-md transition-colors duration-200 ease-in-out hover:bg-zinc-200/70'
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ICArrowLeft className='w-3.5 h-3.5 stroke-zinc-400' />
        </button>
      </div>
    </div>
  );
}

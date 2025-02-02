'use client';

import 'swiper/css';
import '@/styles/swiper.css';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Navigation, Pagination } from 'swiper/modules';

import { useRef } from 'react';
import { TopBarConfig } from '../../shared';
import { BestSellingHotel as Hotel } from '@/types';
import BestSellingHotelA from './molecules/BestSellingHotelA';
import BestSellingHotelB from './molecules/BestSellingHotelB';

type Props = {
  hotels: Hotel[];
};

// -----------------------------------------------

export function BestSellingHotels(props: Props) {
  const { hotels } = props;
  const swiperRef = useRef<SwiperType>(null);

  return (
    <div className='sm:-ml-5 xl:ml-0'>
      <TopBarConfig
        title='هتل های پرفروش سفرنامه'
        subtitle='هتل های پر فروش و جذاب سفرنامه رو از دست نده !'
        seeAllHref='/'
        backBtnFunc={() => swiperRef.current?.slidePrev()}
        nextBtnFunc={() => swiperRef.current?.slideNext()}
      />

      <div className='flex-between'>
        {/* Best-Selling-Hotels-B */}
        <div className='w-[30%] hidden xl:flex'>
          <Swiper
            spaceBetween={20}
            pagination={{ clickable: true }}
            slidesPerView={1}
            modules={[Pagination]}
            className='bestSellingHotelsB-swiper h-[23rem]'
          >
            {hotels.slice(0, 4).map((hotel) => (
              <SwiperSlide key={hotel.id} className='max-w-full select-none'>
                <BestSellingHotelB hotel={hotel} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Best-Selling-Hotels-A */}
        <div className='w-full xl:w-[67%]'>
          <Swiper
            spaceBetween={20}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              0: { slidesPerView: 1, pagination: { enabled: true } },
              640: { slidesPerView: 'auto' },
              1280: { slidesPerView: 2, pagination: { enabled: false } },
            }}
            modules={[Navigation, Pagination]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className='bestSellingHotelsA-swiper h-[14rem] xl:h-max'
          >
            {hotels.map((hotel) => (
              <SwiperSlide key={hotel.id} className='select-none sm:max-w-96'>
                <div className='xl:hidden'>
                  <BestSellingHotelA hotel={hotel} />
                </div>

                <div className='hidden gap-4 xl:grid'>
                  <BestSellingHotelA hotel={hotel} />
                  <BestSellingHotelA hotel={hotel} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

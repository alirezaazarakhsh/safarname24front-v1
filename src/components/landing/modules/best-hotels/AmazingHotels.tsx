'use client';

import 'swiper/css';
import '@/styles/swiper.css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { TopBarConfig } from '../../shared';
import { AmazingHotel as Hotel } from '@/types/landing';
import MHotelCard from './molecules/hotel-card/MHotelCard';
import DHotelCard from './molecules/hotel-card/DHotelCard';

type Props = {
  amazingHotels: Array<Hotel>;
};

// -------------------------------------

export function AmazingHotels(props: Props) {
  const { amazingHotels } = props;

  if (!amazingHotels?.length) return null;

  return (
    <div className="overflow-hidden xl:overflow-visible">
      <TopBarConfig
        className="ml-0"
        timerDeadline="2025-04-12"
        subtitle="هتل های لحظه ای سفرنامه رو از دست نده !"
        title={{ type: 'double', first: 'هتل های', second: 'شگفت انگیز' }}
      />

      {/* Small-Screen */}
      <div className="xl:hidden">
        <Swiper
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          spaceBetween={20}
          modules={[Pagination]}
          className="amazingHotels-swiper"
          pagination={{ clickable: true, dynamicBullets: true }}
        >
          {amazingHotels?.map((hotel, index) => (
            <SwiperSlide key={index}>
              <MHotelCard hotel={hotel} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Large-Screen */}
      <div className="hidden gap-8 xl:grid">
        {amazingHotels?.map((hotel, index) => (
          <DHotelCard key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

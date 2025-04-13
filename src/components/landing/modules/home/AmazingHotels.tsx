'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Autoplay, Navigation } from 'swiper/modules';

import { useRef } from 'react';
import { SuggestedHotel as Hotel } from '@/types';
import { SuggestedHotel, TopBarConfig } from '../../shared';

type Props = {
  hotels: Hotel[];
};

// -----------------------------------------------
export function AmazingHotels(props: Props) {
  const { hotels } = props;
  const swiperRef = useRef<SwiperType>(null);

  return (
    <div className="-ml-5 lg:ml-0">
      <TopBarConfig
        timerDeadline="2025-04-25"
        viewAllHref="/best-hotels"
        subtitle="هتل های تخفیف دار رو  از دست نده !"
        title={{ type: 'double', first: 'هتل های', second: 'شگفت انگیز' }}
      />

      <Swiper
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 'auto', slidesOffsetAfter: 22 },
          1280: {
            slidesPerView: 4,
            slidesOffsetAfter: 0,
          },
        }}
        speed={500}
        autoplay={{
          delay: 4000,
          pauseOnMouseEnter: true,
        }}
        modules={[Navigation, Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {hotels.map((hotel) => (
          <SwiperSlide
            key={hotel.id}
            className="max-w-72 select-none xl:max-w-full"
          >
            <SuggestedHotel hotel={hotel} showTimer={false} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import { useRef } from 'react';
import { SuggestedHotel as Hotel } from '@/types';
import { SuggestedHotel, TopBarConfig } from '../../shared';

type Props = {
  suggestedHotels: Hotel[];
};

// -----------------------------------------------

export function SuggestedHotels(props: Props) {
  const { suggestedHotels } = props;
  const swiperRef = useRef<SwiperType>(null);

  return (
    <div className="-ml-5 xl:ml-0">
      <TopBarConfig
        viewAllHref="/best-hotels"
        subtitle="هتل های پیشنهادی سفرنامه رو از دست نده !"
        title={{ type: 'single', text: 'هتل های پیشنهادی' }}
        prevClickFunc={() => swiperRef.current?.slidePrev()}
        nextClickFunc={() => swiperRef.current?.slideNext()}
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
        modules={[Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="suggestedHotels-swiper"
      >
        {suggestedHotels?.map((hotel) => (
          <SwiperSlide
            key={hotel.id}
            className="max-w-72 pb-4 select-none xl:max-w-full"
          >
            <SuggestedHotel hotel={hotel} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Autoplay, Navigation } from 'swiper/modules';

import { useRef } from 'react';
import { Hotel } from '@/types';
import { SuggestedHotel, TopBarConfig } from '../../shared';
import { Section } from './molecules/Section';

type Props = {
  city: string;
  suggestedHotels: Hotel[];
};

// -----------------------------------------------

export function SuggestedHotels(props: Props) {
  const { suggestedHotels, city } = props;
  const swiperRef = useRef<SwiperType>(null);

  const topbarConfigTitle = city
    ? `هتل های پیشنهادی شهر ${city}`
    : 'هتل های پیشنهادی';

  if (!suggestedHotels) return null;

  return (
    <Section sectionID="suggested-hotels" className="-ml-5 lg:ml-0">
      <TopBarConfig
        viewAllHref="/best-hotels"
        title={{ type: 'single', text: topbarConfigTitle }}
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
        autoplay={{
          delay: 4000,
          pauseOnMouseEnter: true,
        }}
        modules={[Navigation, Autoplay]}
        className="suggestedHotels-swiper"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
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
    </Section>
  );
}

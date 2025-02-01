'use client';

import 'swiper/css';
import '@/styles/swiper.css';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import Image from 'next/image';
import { useState } from 'react';
import SearchAndFilter from './molecules/SearchAndFilter';

// type Props = {
//   images: Hotel[];
// };

const slidesInitialStat = {
  allowSlidePrev: false,
  allowSlideNext: true,
};

const images = ['/image/banner/large-banner.png', '/image/banner/large-banner.png', '/image/banner/large-banner.png'];

// -----------------------------------------------

export function HeroSection() {
  const [controlSlides, setControlSlides] = useState(slidesInitialStat);

  // Control Slide-Changes
  const handleSetControlSlides = (slide: 'next' | 'prev', value: boolean) =>
    setControlSlides((prev) => ({ ...prev, [`allowSlide${slide.charAt(0).toUpperCase() + slide.slice(1)}`]: value }));

  return (
    <div className='relative hidden xl:block'>
      <SearchAndFilter />

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        speed={1500}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSlideChange={(swiper) => {
          if (swiper.activeIndex === 0) handleSetControlSlides('prev', false);
          else handleSetControlSlides('prev', true);

          if (swiper.activeIndex === swiper.slides.length - 1) handleSetControlSlides('next', false);
          else handleSetControlSlides('next', true);
        }}
        allowSlidePrev={controlSlides.allowSlidePrev}
        allowSlideNext={controlSlides.allowSlideNext}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        className='heroSection-swiper h-[34rem] rounded-2xl'
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className='max-w-full select-none flex-center overflow-hidden rounded-2xl'>
            <Image src={image} alt='hotel-view' width={1280} height={600} className='full-size object-cover' />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

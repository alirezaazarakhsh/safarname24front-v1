'use client';

import 'swiper/css';
import '@/styles/swiper.css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import Image from 'next/image';
import { useState } from 'react';
import SearchAndFilter from './molecules/SearchAndFilter';

const slidesInitialStat = {
  allowSlidePrev: false,
  allowSlideNext: true,
};

type Props = {
  images: Array<string>;
};

// -----------------------------------------------

export function HeroSection(props: Props) {
  const { images } = props;
  const [controlSlides, setControlSlides] = useState(slidesInitialStat);

  // Control Slide-Changes
  const handleSetControlSlides = (slide: 'next' | 'prev', value: boolean) =>
    setControlSlides((prev) => ({
      ...prev,
      [`allowSlide${slide.charAt(0).toUpperCase() + slide.slice(1)}`]: value,
    }));

  return (
    <div className="relative hidden xl:block">
      <SearchAndFilter />

      <Swiper
        slidesPerView={1}
        grabCursor={true}
        effect={'fade'}
        speed={800}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => {
          if (swiper.activeIndex === 0) handleSetControlSlides('prev', false);
          else handleSetControlSlides('prev', true);

          if (swiper.activeIndex === swiper.slides.length - 1)
            handleSetControlSlides('next', false);
          else handleSetControlSlides('next', true);
        }}
        allowSlidePrev={controlSlides.allowSlidePrev}
        allowSlideNext={controlSlides.allowSlideNext}
        modules={[Pagination, Autoplay, EffectFade]}
        className="heroSection-swiper h-[40rem] rounded-2xl"
      >
        {images?.map((image, index) => (
          <SwiperSlide
            key={index}
            className="bg-zinc-200 max-w-full select-none flex-center overflow-hidden rounded-2xl"
          >
            {image && (
              <Image
                src={image}
                width={1280}
                height={800}
                alt="hotel-view"
                className="full-size object-cover"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

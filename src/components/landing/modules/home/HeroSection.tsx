'use client';

import 'swiper/css';
import '@/styles/swiper.css';

import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import Image from 'next/image';
import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { generalInstance } from '@/utils/services';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Skeleton } from '@/components/ui/skeleton';

import type { HeroSlide } from '@/types/landing/home';
import SearchAndFilter from './molecules/SearchAndFilter';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

type ApiResponse = HeroSlide[];

// -----------------------------------

export function HeroSection() {
  const [controlSlides, setControlSlides] = useState({
    allowSlidePrev: false,
    allowSlideNext: true,
  });

  const { data: heroSlides, status } = useQuery<ApiResponse>({
    queryKey: ['config-slides'],
    queryFn: () => generalInstance('/config/slides/').then((res) => res.data),
  });

  function handleSetControlSlides(slide: 'next' | 'prev', value: boolean) {
    setControlSlides((prevValue) => ({
      ...prevValue,
      [`allowSlide${slide.charAt(0).toUpperCase() + slide.slice(1)}`]: value,
    }));
  }

  if (status !== 'pending' && (!heroSlides || !heroSlides.length)) return null;

  return (
    <div className="relative -mb-4 hidden lg:block">
      {status !== 'pending' && <SearchAndFilter />}

      {status === 'pending' ? (
        <Skeleton className="h-[36rem] w-full rounded-2xl xl:h-[40rem]" />
      ) : (
        <Swiper
          slidesPerView={1}
          grabCursor={true}
          effect={'fade'}
          speed={800}
          autoplay={{
            delay: 8000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => {
            if (swiper.activeIndex === 0) handleSetControlSlides('prev', false);
            else handleSetControlSlides('prev', true);

            if (swiper.activeIndex === swiper.slides.length - 1)
              handleSetControlSlides('next', false);
            else handleSetControlSlides('next', true);
          }}
          modules={[Pagination, Autoplay, EffectFade]}
          allowSlidePrev={controlSlides.allowSlidePrev}
          allowSlideNext={controlSlides.allowSlideNext}
          className="heroSection-swiper h-[36rem] rounded-2xl xl:h-[40rem]"
        >
          {heroSlides?.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="flex-center relative max-w-full select-none overflow-hidden rounded-2xl bg-zinc-200"
            >
              {slide.image && (
                <Image
                  fill
                  priority
                  src={slide.image}
                  alt="hotel-pictures"
                  className="full-size object-cover"
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

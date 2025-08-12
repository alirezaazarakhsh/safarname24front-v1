'use client';

import 'swiper/css';
import '@/styles/swiper.css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import Image from 'next/image';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import SearchAndFilter from './molecules/SearchAndFilter';
import { generalInstance, isEmptyOrInvalid } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

type Data = {
  order: number;
  image: string;
};

type ApiResponse = {
  data: Data[];
};

const slidesInitialStat = {
  allowSlidePrev: false,
  allowSlideNext: true,
};

// -----------------------------------------------

export function HeroSection() {
  const [controlSlides, setControlSlides] = useState(slidesInitialStat);

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['config-slides'],
    queryFn: () => generalInstance('/config/slides'),
  });

  // Control Slide-Changes
  const handleSetControlSlides = (slide: 'next' | 'prev', value: boolean) =>
    setControlSlides((prev) => ({
      ...prev,
      [`allowSlide${slide.charAt(0).toUpperCase() + slide.slice(1)}`]: value,
    }));

  if (isEmptyOrInvalid({ data, status })) return null;

  return (
    <div className="relative hidden -mb-4 lg:block">
      {status !== 'pending' && <SearchAndFilter />}

      {status === 'pending' ? (
        <Skeleton className="w-full h-[36rem] rounded-2xl xl:h-[40rem]" />
      ) : (
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
          className="heroSection-swiper h-[36rem] rounded-2xl xl:h-[40rem]"
        >
          {data?.data.map((image, index) => (
            <SwiperSlide
              key={index}
              className="bg-zinc-200 max-w-full select-none flex-center overflow-hidden rounded-2xl"
            >
              {image && (
                <Image
                  priority
                  width={1280}
                  height={800}
                  alt="hotel-view"
                  src={image.image}
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

'use client';

import 'swiper/css';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TOP_CITIES } from '@/lib/constants/general';

import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import { HotelCard } from './hotel-card';

// ------------------------------

export function RecommendedHotels() {
  const swiperRef = useRef<SwiperType>(null);

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <span className="font-extrabold">هتل های پیشنهادی</span>

        <div className="flex gap-2">
          <Button
            size={'icon-lg'}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ArrowRight />
          </Button>

          <Button
            size={'icon-lg'}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ArrowLeft />
          </Button>
        </div>
      </div>

      <div className="-mx-4 xl:mx-0">
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 'auto',
              slidesOffsetAfter: 20,
              slidesOffsetBefore: 20,
            },
            1280: {
              slidesPerView: 4,
              slidesOffsetAfter: 0,
              slidesOffsetBefore: 0,
            },
          }}

          spaceBetween={24}
          modules={[Pagination]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {TOP_CITIES.map((_, i) => (
            <SwiperSlide key={i} className="max-w-68 select-none xl:max-w-full">
              <HotelCard />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

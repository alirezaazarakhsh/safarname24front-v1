'use client';

import 'swiper/css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from 'cn';
import { TOP_CITIES } from '@/lib/constants/general';

import heroImage_1 from '@/assets/images/background/hero-3.jpg';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import Link from 'next/link';

// ------------------------------

export function Cities() {
  const swiperRef = useRef<SwiperType>(null);

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <span className="font-extrabold">شهر های پربازدید ایران</span>

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
              slidesPerView: 6,
              slidesOffsetAfter: 0,
              slidesOffsetBefore: 0,
            },
          }}

          spaceBetween={24}
          className="size-full h-64"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {TOP_CITIES.map((item, i) => (
            <SwiperSlide key={i} className="max-w-48 select-none xl:max-w-full">
              <Link
                href={'/'}
                className="bg-card group relative flex h-full overflow-hidden rounded-2xl"
              >
                <div
                  className={cn(
                    'absolute inset-0 z-20 p-5',
                    'flex flex-col justify-between',
                    'bg-linear-0 from-black/60 via-transparent to-transparent',
                  )}
                >
                  <div
                    className={cn(
                      'flex w-fit items-center gap-1 rounded-md bg-white/80 text-xs font-semibold backdrop-blur-md',
                      'px-2 py-1 sm:-mt-1',
                      'transition-all',
                      'sm:invisible sm:opacity-0 sm:group-hover:visible sm:group-hover:mt-0 sm:group-hover:opacity-100',
                      '',
                    )}
                  >
                    <span>{item.accommodations_count}</span>
                    <span>اقامتگاه</span>
                  </div>

                  <div
                    className={cn('truncate text-sm font-semibold text-white')}
                  >
                    <span>{item.province}</span>
                    <span className="mx-1">,</span>
                    <span>{item.city}</span>
                  </div>
                </div>

                <Image
                  alt=""
                  fill
                  src={heroImage_1}
                  className="z-10 object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

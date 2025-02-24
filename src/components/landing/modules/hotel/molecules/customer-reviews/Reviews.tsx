'use client';

import 'swiper/css';
import '@/styles/swiper.css';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import Review from './Review';
import { useRef } from 'react';
import { useMediaQuery } from '@/hooks';
import { HotelCustomerReview } from '@/types';
import { ICArrowLeft } from '@/components/icons';

type Props = {
  reviews: Array<HotelCustomerReview>;
};

// -----------------------------------------

export default function Reviews(props: Props) {
  const { reviews } = props;

  const swiperRef = useRef<SwiperType>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <>
      {/* Small-Screen */}
      {!isDesktop && (
        <div className='overflow-hidden sm:-ml-5 lg:hidden'>
          <Swiper
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 'auto' },
            }}
            modules={[Pagination]}
            pagination={{ enabled: true, dynamicBullets: true }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className='hotelMReviews-swiper'
          >
            {reviews?.map((review, id) => (
              <SwiperSlide key={id} className='select-none sm:max-w-96'>
                <Review review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Large-Screen */}
      {isDesktop && (
        <div className='relative w-8/12 hidden lg:block'>
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            direction='vertical'
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className='h-full'
          >
            {reviews?.map((review, id) => (
              <SwiperSlide key={id} className='select-none'>
                <Review review={review} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <div className='absolute -top-[3.8rem] left-32 h-8 flex gap-3'>
            <button
              className='bg-zinc-200/50 w-8 flex-center rounded-md transition-colors duration-200 ease-in-out hover:bg-zinc-200/70'
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ICArrowLeft className='w-4 h-4 rotate-180' />
            </button>

            <button
              className='bg-zinc-200/50 w-8 flex-center rounded-md transition-colors duration-200 ease-in-out hover:bg-zinc-200/70'
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ICArrowLeft className='w-4 h-4' />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

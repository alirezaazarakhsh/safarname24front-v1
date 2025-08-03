'use client';

import 'swiper/css';
import '@/styles/swiper.css';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

import Review from './Review';
import { HotelCustomerReview } from '@/types';

import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

type ApiResponse = {
  data: HotelCustomerReview[];
};

type Props = {
  hotelSlug: string;
};

// -----------------------------------------

export default function Reviews(props: Props) {
  const { hotelSlug } = props;
  const swiperRef = useRef<SwiperType>(null);

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-comments-list'],
    queryFn: () => generalInstance(`/hotel/hotels/${hotelSlug}/comments`),
  });

  return (
    <>
      {/* Small-Screen */}
      {status === 'pending' ? (
        <Skeleton className="h-96 rounded-xl lg:hidden" />
      ) : (
        <div className="overflow-hidden sm:-ml-5 lg:hidden">
          <Swiper
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 'auto' },
            }}
            modules={[Pagination]}
            pagination={{ enabled: true, dynamicBullets: true }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="hotelMReviews-swiper"
          >
            {data?.data?.map((review, id) => (
              <SwiperSlide key={id} className="select-none sm:max-w-96">
                <Review {...review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Large-Screen */}
      {status === 'pending' ? (
        <div className="h-[30rem] hidden grid-rows-2 gap-6 lg:grid">
          <Skeleton className="rounded-xl" />
          <Skeleton className="rounded-xl" />
        </div>
      ) : (
        <div className="relative z-10 h-full hidden lg:block">
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            direction="vertical"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="h-full"
          >
            {data?.data?.map((review, id) => (
              <SwiperSlide key={id} className="select-none">
                <Review {...review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}

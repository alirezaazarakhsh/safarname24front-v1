'use client';

import 'swiper/css';
import { Navigation } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import { useRef } from 'react';
import { TopBarConfig } from '../../shared';
import CustomerReview from './molecules/CustomerReview';

type Props = {
  reviews: Array<{
    id: number;
    image: string;
    fullname: string;
    rate: number;
    desc: string;
  }>;
};

// ------------------------------------------------

export function CustomerReviews(props: Props) {
  const { reviews } = props;
  const swiperRef = useRef<SwiperType>(null);

  return (
    <div className="-ml-5 -mb-4 lg:ml-0">
      <TopBarConfig
        subtitle="نظرات محبت آمیز مشتری های سفرنامه"
        title={{ type: 'single', text: 'نظرات مشتریان' }}
        prevClickFunc={() => swiperRef.current?.slidePrev()}
        nextClickFunc={() => swiperRef.current?.slideNext()}
      />

      <Swiper
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 'auto', slidesOffsetAfter: 22 },
          1280: { slidesPerView: 4, slidesOffsetAfter: 0 },
        }}
        modules={[Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {reviews?.map((review) => (
          <SwiperSlide
            key={review.id}
            className="max-w-72 pb-4 select-none xl:max-w-full"
          >
            <CustomerReview review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

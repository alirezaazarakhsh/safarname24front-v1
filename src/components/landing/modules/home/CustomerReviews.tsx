'use client';

import 'swiper/css';
import { Navigation } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

import { TopBarConfig } from '../../shared';
import { Skeleton } from '@/components/ui/skeleton';
import CustomerReview from './molecules/CustomerReview';
import { generalInstance, isEmptyOrInvalid } from '@/utils/services';

type Data = {
  rate: number;
  text: string;
  commenter: string;
  evaluation: string;
  commenter_image: string;
};

type ApiResponse = {
  data: Data[];
};

// ------------------------------

export function CustomerReviews() {
  const swiperRef = useRef<SwiperType>(null);

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['config-comments'],
    queryFn: () => generalInstance('/config/comments'),
  });

  if (isEmptyOrInvalid({ data, status })) return null;

  return (
    <div className="-ml-5 -mb-4 lg:ml-0">
      <TopBarConfig
        arraylength={data?.data.length}
        subtitle="نظرات محبت آمیز مشتری های سفرنامه"
        title={{ type: 'single', text: 'نظرات مشتریان' }}
        prevClickFunc={() => swiperRef.current?.slidePrev()}
        nextClickFunc={() => swiperRef.current?.slideNext()}
      />

      {status === 'pending' ? (
        <>
          <Skeleton className="h-[19rem] xl:hidden rounded-xl" />

          <div className="grid-cols-4 gap-4 hidden xl:grid">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="h-[19rem] rounded-xl" />
              ))}
          </div>
        </>
      ) : (
        <Swiper
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 'auto', slidesOffsetAfter: 22 },
            1280: { slidesPerView: 4, slidesOffsetAfter: 0 },
          }}
          modules={[Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {data?.data.map((review, index) => (
            <SwiperSlide
              key={index}
              className="max-w-72 pb-4 select-none xl:max-w-full"
            >
              <CustomerReview {...review} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

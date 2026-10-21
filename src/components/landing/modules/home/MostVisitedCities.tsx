'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import { TopBarConfig } from '../../shared';
import { Skeleton } from '@/components/ui/skeleton';
import MostVisitedCity from './molecules/MostVisitedCity';
import { generalInstance, isEmptyOrInvalid } from '@/utils/services';

type Data = {
  id: number;
  name: string;
  slug: string;
  image: string;
  province: string;
  hotels_number: number;
};

type ApiResponse = { data: Data[] };

// ---------------------------

export function MostVisitedCities() {
  const swiperRef = useRef<SwiperType>(null);

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['most-visited-cities'],
    queryFn: () => generalInstance('/hotel/cities/homepage/'),
  });

  if (isEmptyOrInvalid({ data, status })) return null;

  return (
    <div className="-ml-5 lg:ml-0">
      <TopBarConfig
        maxLength={6}
        arraylength={data?.data.length}
        subtitle="شهر های پر بازدید ایران رو از دست نده !"
        prevClickFunc={() => swiperRef.current?.slidePrev()}
        nextClickFunc={() => swiperRef.current?.slideNext()}
        title={{ type: 'single', text: 'شهر های پر بازدید ایران' }}
      />

      {status === 'pending' ? (
        <>
          <Skeleton className="h-56 xl:hidden" />

          <div className="h-60 hidden grid-cols-6 gap-5 xl:grid">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="grid grid-rows-[13rem_2rem] gap-3">
                  <Skeleton />
                  <Skeleton />
                </div>
              ))}
          </div>
        </>
      ) : (
        <Swiper
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 'auto', slidesOffsetAfter: 22 },
            1280: { slidesPerView: 6, slidesOffsetAfter: 0 },
          }}
          modules={[Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {data?.data.map((city, index) => (
            <SwiperSlide
              key={index}
              className="max-w-44 select-none xl:max-w-full"
            >
              <MostVisitedCity {...city} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

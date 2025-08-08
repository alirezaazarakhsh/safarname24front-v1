'use client';

import 'swiper/css';
import '@/styles/swiper.css';
import 'swiper/css/pagination';

import { useRef } from 'react';
import { TopBarConfig } from '../../shared';
import { useQuery } from '@tanstack/react-query';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Navigation, Pagination } from 'swiper/modules';

import { Hotel } from '@/types';
import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

import BestSellingHotelA from './molecules/BestSellingHotelA';
import BestSellingHotelB from './molecules/BestSellingHotelB';

type ApiResponse = {
  data: { best_sellers: (Hotel & { reservation_count: number })[] };
};

// ----------------------------

export function BestSellingHotels() {
  const swiperRef = useRef<SwiperType>(null);
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['best-selling-hotels'],
    queryFn: () => generalInstance('/hotel/hotels/home'),
  });

  if (
    status !== 'pending' &&
    (!data?.data || !data?.data.best_sellers || !data?.data.best_sellers.length)
  )
    return null;

  return (
    <div className="-ml-5 lg:ml-0">
      <TopBarConfig
        viewAllHref="/best-hotels"
        title={{
          type: 'single',
          text: 'هتل های پرفروش و جذاب سفرنامه',
        }}
        arraylength={data?.data.best_sellers.length}
        prevClickFunc={() => swiperRef.current?.slidePrev()}
        nextClickFunc={() => swiperRef.current?.slideNext()}
        subtitle="هتل های پرفروش و جذاب سفرنامه رو از دست نده !"
      />

      <div className="justify-between grid-cols-[30%_67%] xl:grid">
        {/* Best-Selling-Hotels-B (Large-Device) */}
        <div className="hidden xl:block">
          {status === 'pending' ? (
            <Skeleton className="h-80 rounded-2xl" />
          ) : (
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              modules={[Pagination]}
              pagination={{ clickable: true }}
              className="bestSellingHotelsB-swiper !pb-12"
            >
              {data?.data.best_sellers?.slice(0, 4).map((hotel, index) => (
                <SwiperSlide key={index} className="max-w-full select-none">
                  <BestSellingHotelB hotel={hotel} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Best-Selling-Hotels-A (Small-Device) */}
        <div className="xl:hidden">
          {status === 'pending' ? (
            <Skeleton className="w-full h-40 rounded-xl" />
          ) : (
            <Swiper
              spaceBetween={20}
              slidesPerView={'auto'}
              pagination={{
                enabled: true,
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                0: { slidesOffsetAfter: 0 },
                640: { slidesOffsetAfter: 22 },
              }}
              modules={[Navigation, Pagination]}
              className="bestSellingHotelsA-swiper !pb-12 xl:!pb-0"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {data?.data.best_sellers?.map((hotel, index) => (
                <SwiperSlide key={index} className="select-none max-w-[20rem]">
                  <BestSellingHotelA hotel={hotel} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Best-Selling-Hotels-A (Large-Device) */}
        <div className="hidden xl:block">
          {status === 'pending' ? (
            <div className="h-80 grid grid-cols-2 gap-4">
              <Skeleton className="rounded-xl" />
              <Skeleton className="rounded-xl" />
              <Skeleton className="rounded-xl" />
              <Skeleton className="rounded-xl" />
            </div>
          ) : (
            <Swiper
              spaceBetween={20}
              slidesPerView={2}
              modules={[Navigation]}
              className="bestSellingHotelsA-swiper"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {Array.from(
                {
                  length: Math.ceil(data?.data.best_sellers?.length / 2),
                },
                (_, i) => i,
              ).map((_, index) => (
                <SwiperSlide key={_} className="max-w-full pb-4 select-none">
                  <div className="hidden gap-4 xl:grid">
                    {data?.data.best_sellers
                      ?.slice(4)
                      ?.slice(index * 2, index * 2 + 2)
                      ?.map((hotel, index) => (
                        <BestSellingHotelA key={index} hotel={hotel} />
                      ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
}

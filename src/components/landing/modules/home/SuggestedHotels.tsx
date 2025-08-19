'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import { useRef } from 'react';
import { Hotel } from '@/types';
import { useQuery } from '@tanstack/react-query';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Navigation, Autoplay } from 'swiper/modules';

import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';
import { SuggestedHotel, TopBarConfig } from '../../shared';

type ApiResponse = {
  data: {
    special_offers: Hotel[];
    flash_sales: Hotel[];
    best_sellers: Hotel[];
  };
};

// ----------------------------

export function SuggestedHotels() {
  const swiperRef = useRef<SwiperType>(null);

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['suggested-hotels'],
    queryFn: () => generalInstance('/hotel/hotels/home'),
  });

  if (
    status !== 'pending' &&
    (!data?.data ||
      !data?.data.special_offers ||
      !data?.data.special_offers.length)
  )
    return null;

  return (
    <div className="-ml-5 xl:ml-0">
      <TopBarConfig
        viewAllHref="/best-hotels"
        arraylength={data?.data.special_offers.length}
        subtitle="هتل های پیشنهادی سفرنامه رو از دست نده !"
        title={{ type: 'single', text: 'هتل های پیشنهادی' }}
        prevClickFunc={() => swiperRef.current?.slidePrev()}
        nextClickFunc={() => swiperRef.current?.slideNext()}
      />

      {status === 'pending' ? (
        <>
          <Skeleton className="h-[23.5rem] xl:hidden" />
          <div className="h-[23.5rem] hidden grid-cols-4 gap-5 xl:grid">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="rounded-xl" />
              ))}
          </div>
        </>
      ) : (
        <Swiper
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 'auto', slidesOffsetAfter: 22 },
            1280: {
              slidesPerView: 4,
              slidesOffsetAfter: 0,
            },
          }}
          speed={600}
          autoplay={
            data?.data.special_offers?.length > 4
              ? {
                  delay: 4000,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          modules={[Navigation, Autoplay]}
          className="suggestedHotels-swiper"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {data?.data.special_offers?.map((hotel, index) => (
            <SwiperSlide
              key={index}
              className="max-w-72 pb-4 select-none xl:max-w-full"
            >
              <SuggestedHotel hotel={hotel} showLike={false} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

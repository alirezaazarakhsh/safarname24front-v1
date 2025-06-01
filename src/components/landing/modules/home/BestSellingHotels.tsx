'use client';

import 'swiper/css';
import '@/styles/swiper.css';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Navigation, Pagination } from 'swiper/modules';

import { useRef } from 'react';
import { TopBarConfig } from '../../shared';
import { BestSellingHotel as Hotel } from '@/types';

import BestSellingHotelA from './molecules/BestSellingHotelA';
import BestSellingHotelB from './molecules/BestSellingHotelB';

type Props = {
  hotels: Hotel[];
};

// -----------------------------------------------

export function BestSellingHotels(props: Props) {
  const { hotels } = props;
  const swiperRef = useRef<SwiperType>(null);

  return (
    <div className="sm:-ml-5 lg:ml-0">
      <TopBarConfig
        viewAllHref="/best-hotels"
        title={{
          type: 'single',
          text: 'هتل های پر فروش و جذاب سفرنامه',
        }}
        prevClickFunc={() => swiperRef.current?.slidePrev()}
        nextClickFunc={() => swiperRef.current?.slideNext()}
        subtitle="هتل های پر فروش و جذاب سفرنامه رو از دست نده !"
      />

      <div className="justify-between grid-cols-[30%_68%] xl:grid">
        {/* Best-Selling-Hotels-B (Large-Device) */}
        <div className="hidden xl:block">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            modules={[Pagination]}
            pagination={{ clickable: true }}
            className="bestSellingHotelsB-swiper"
          >
            {hotels?.slice(0, 4).map((hotel) => (
              <SwiperSlide key={hotel.id} className="max-w-full select-none">
                <BestSellingHotelB hotel={hotel} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Best-Selling-Hotels-A (Small-Device) */}
        <div className="xl:hidden">
          <Swiper
            spaceBetween={20}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                slidesOffsetAfter: 0,
                pagination: { enabled: true },
              },
              640: { slidesPerView: 'auto', slidesOffsetAfter: 22 },
            }}
            modules={[Navigation, Pagination]}
            className="bestSellingHotelsA-swiper"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {hotels?.map((hotel) => (
              <SwiperSlide
                key={hotel.id}
                className="pb-4 select-none sm:max-w-[26rem]"
              >
                <BestSellingHotelA hotel={hotel} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Best-Selling-Hotels-A (Large-Device) */}
        <div className="hidden xl:block">
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            modules={[Navigation]}
            className="bestSellingHotelsA-swiper"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {Array.from(
              { length: Math.ceil(hotels?.length / 2) },
              (_, i) => i,
            ).map((_, index) => (
              <SwiperSlide key={_} className="max-w-full pb-4 select-none">
                <div className="hidden gap-4 xl:grid">
                  {hotels
                    ?.slice(index * 2, index * 2 + 2)
                    ?.map((hotel) => (
                      <BestSellingHotelA key={hotel.id} hotel={hotel} />
                    ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

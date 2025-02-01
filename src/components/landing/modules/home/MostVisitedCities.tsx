'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import { useRef } from 'react';
import Image from 'next/image';
import { TopBarConfig } from '../../shared';

type Props = {
  cities: { image: string; city: string; province: string; numberOfResidence: number }[];
};

export function MostVisitedCities(props: Props) {
  const { cities } = props;
  const swiperRef = useRef<SwiperType>(null);

  return (
    <div className='-ml-5 lg:ml-0'>
      <TopBarConfig
        title='شهر های پر بازدید ایران'
        subtitle='شهر های پر بازدید ایران رو از دست نده !'
        backBtnFunc={() => swiperRef.current?.slidePrev()}
        nextBtnFunc={() => swiperRef.current?.slideNext()}
      />

      <Swiper
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 'auto' },
          1280: {
            slidesPerView: 5,
          },
        }}
        modules={[Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className='mostVisitedCities-swiper'
      >
        {cities.map((city, index) => (
          <SwiperSlide key={index} className='max-w-40 select-none xl:max-w-full'>
            <div className='relative group'>
              {/* Image */}
              <div className='bg-zinc-200 h-40 overflow-hidden rounded-xl'>
                <Image src={city.image} alt={city.city} width={300} height={300} className='full-size object-cover' />
              </div>

              {/* Number of residence */}
              <div className='absolute top-0 right-3 bg-zinc-100 w-16 h-6 text-zinc-800 text-cs65 font-bold pt-1 flex-center gap-1 opacity-0 rounded-md transition-all duration-200 ease-in-out group-hover:opacity-100 group-hover:top-3'>
                <span>{city.numberOfResidence}</span>
                <span>اقامتگاه</span>
              </div>

              {/* Province | City */}
              <div className='text-cs08 mt-3 flex items-center gap-1'>
                <span className='text-zinc-800 font-extrabold'>{city.province}</span>
                <span>,</span>
                <span className='text-zinc-600 font-semibold'>{city.city}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

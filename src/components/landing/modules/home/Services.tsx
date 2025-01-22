'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import '@/styles/swiper.css';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = {
  src: { icon: React.ReactNode; title: string; desc: string }[];
};

// -----------------------------------------

export function Services(props: Props) {
  const { src } = props;

  return (
    <div className='sm:-ml-4 xl:ml-0'>
      <Swiper
        spaceBetween={20}
        modules={[Pagination]}
        pagination={{ clickable: true, dynamicBullets: true }}
        breakpoints={{ 0: { slidesPerView: 1 }, 640: { slidesPerView: 'auto' }, 1280: { slidesPerView: 4 } }}
        className='services-swiper h-[12.5rem]'
      >
        {src.map((service, index) => (
          <SwiperSlide key={index} className='select-none cursor-grab sm:max-w-80'>
            <div className='relative bg-white text-cs08 p-4 flex flex-col gap-2 rounded-xl transition-all duration-300 delay-100 ease-in-out group xl:bg-[#ededed] xl:cursor-default xl:hover:bg-white xl:hover:shadow-[0_0.5rem_1rem_0_rgba(0,0,0,0.05)]'>
              <div className='bg-cs-red/20 w-12 h-12 mb-2 p-3 flex-center rounded-cs-10'>{service.icon}</div>

              <span className='text-zinc-800 font-bold'>{service.title}</span>
              <p className='text-zinc-500 font-semibold'>{service.desc}</p>

              <div className='absolute inset-0 -z-10 bg-cs-red scale-50 rounded-xl transition-all duration-500 delay-100 ease-in-out xl:group-hover:-bottom-8 xl:group-hover:scale-75'></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

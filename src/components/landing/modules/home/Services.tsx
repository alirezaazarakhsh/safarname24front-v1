'use client';

import 'swiper/css';
import '@/styles/swiper.css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = {
  services: { icon: React.ReactNode; title: string; desc: string }[];
};

// -----------------------------------------

export function Services(props: Props) {
  const { services } = props;

  return (
    <div className='sm:-ml-5 xl:ml-0'>
      {/* Small-Device */}
      <div className='xl:hidden'>
        <Swiper
          spaceBetween={20}
          modules={[Pagination]}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{ 0: { slidesPerView: 1 }, 640: { slidesPerView: 'auto' } }}
          className='services-swiper'
        >
          {services.map((service, index) => (
            <SwiperSlide key={index} className='select-none sm:max-w-80'>
              <Service service={service} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Large-Device */}
      <div className='hidden grid-cols-4 gap-4 xl:grid'>
        {services.map((service, index) => (
          <SwiperSlide key={index} className='select-none sm:max-w-80'>
            <Service service={service} />
          </SwiperSlide>
        ))}
      </div>
    </div>
  );
}

// -----------------------------------------

type ServiceProps = {
  service: { icon: React.ReactNode; title: string; desc: string };
};

function Service(props: ServiceProps) {
  const {
    service: { icon, title, desc },
  } = props;

  return (
    <div className='relative bg-white p-4 flex flex-col gap-2 rounded-xl transition-all duration-300 delay-100 ease-in-out group xl:bg-[#F8F8F8] xl:hover:shadow-[0_0_1.5rem_rgba(0,0,0,0.08)]'>
      <div className='bg-cs-red/20 w-12 h-12 mb-2 p-3 flex-center rounded-cs-10'>{icon}</div>

      <span className='text-zinc-800 text-cs85 font-bold'>{title}</span>
      <p className='text-zinc-500 text-cs08 font-semibold'>{desc}</p>

      <div className='absolute inset-0 -z-10 bg-cs-red scale-50 rounded-xl transition-all duration-500 delay-100 ease-in-out xl:group-hover:-bottom-8 xl:group-hover:scale-75'></div>
    </div>
  );
}

'use client';

import 'swiper/css';
import '@/styles/swiper.css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IconsName } from '@/types';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

type Service = { icon: IconsName; title: string; desc: string };
type Props = { services: Array<Service> };

// -----------------------------------------

export function Services(props: Props) {
  const { services } = props;

  return (
    <div className="sm:-ml-5 xl:ml-0">
      {/* Small-Device */}
      <div className="xl:hidden overflow-hidden rounded-xl sm:rounded-none">
        <Swiper
          spaceBetween={20}
          modules={[Pagination]}
          className="services-swiper"
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            0: { slidesPerView: 1, slidesOffsetAfter: 0 },
            640: { slidesPerView: 'auto', slidesOffsetAfter: 22 },
          }}
        >
          {services?.map((service, index) => (
            <SwiperSlide key={index} className="select-none sm:max-w-80">
              <Service service={service} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Large-Device */}
      <div className="hidden grid-cols-4 gap-4 xl:grid">
        {services?.map((service, index) => (
          <SwiperSlide key={index} className="select-none sm:max-w-80">
            <Service service={service} />
          </SwiperSlide>
        ))}
      </div>
    </div>
  );
}

// -----------------------------------------

type ServiceProps = { service: Service };

function Service(props: ServiceProps) {
  const {
    service: { icon, title, desc },
  } = props;

  return (
    <div className="relative bg-white p-5 flex flex-col gap-2 rounded-xl shadow-[0_1rem_1rem_rgba(0,0,0,0.02)] transition-all duration-300 delay-100 ease-in-out group xl:bg-[#F8F8F8] xl:shadow-none xl:hover:shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.08)]">
      <div className="bg-cs-red/20 w-12 h-12 mb-2 flex-center rounded-cs-10">
        <IconsaxIcons name={icon} size={24} color="#f30f26" />
      </div>

      <span className="text-zinc-800 text-cs85 font-bold xl:text-cs09">
        {title}
      </span>
      <p className="text-zinc-500 text-cs08 font-semibold">{desc}</p>

      <div className="absolute inset-0 -z-10 bg-cs-red scale-50 rounded-xl transition-all duration-500 ease-in-out xl:group-hover:-bottom-9 xl:group-hover:scale-75"></div>
    </div>
  );
}

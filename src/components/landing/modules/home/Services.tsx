'use client';

import 'swiper/css';
import '@/styles/swiper.css';
import 'swiper/css/pagination';

import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Skeleton } from '@/components/ui/skeleton';
import { generalInstance, isEmptyOrInvalid } from '@/utils/services';

type Data = {
  title: string;
  subtitle: string;
  icon: { url: string };
};

type ApiResponse = {
  data: Data[];
};

// ------------------------------

export function Services() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['config-advantages'],
    queryFn: () => generalInstance('/config/advantages'),
  });

  if (isEmptyOrInvalid({ data, status })) return null;

  return (
    <div className="sm:-ml-5 xl:ml-0">
      {/* Small-Device */}
      <div className="xl:hidden overflow-hidden rounded-xl sm:rounded-none">
        {status === 'pending' ? (
          <Skeleton className="h-44 rounded-xl" />
        ) : (
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
            {data?.data.map((service, index) => (
              <SwiperSlide key={index} className="select-none sm:max-w-80">
                <Service {...service} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Large-Device */}
      <div className="hidden grid-cols-4 gap-4 xl:grid">
        {status === 'pending'
          ? Array(4)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="h-48 rounded-xl" />
              ))
          : data?.data.map((service, index) => (
              <SwiperSlide key={index} className="select-none sm:max-w-80">
                <Service {...service} />
              </SwiperSlide>
            ))}
      </div>
    </div>
  );
}

// -----------------------------------------

function Service(props: Data) {
  const { icon, title, subtitle } = props;

  return (
    <div className="relative bg-white p-5 flex flex-col gap-2 rounded-xl shadow-[0_1rem_1rem_rgba(0,0,0,0.02)] transition-all duration-300 delay-100 ease-in-out group xl:bg-[#F8F8F8] xl:shadow-none xl:hover:shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.08)]">
      <div className="bg-cs-red/20 w-12 h-12 mb-2 p-2.5 flex-center rounded-cs-10">
        {icon.url && <Image alt="icon" width={24} height={24} src={icon.url} />}
      </div>

      <span className="text-zinc-800 text-cs85 font-bold xl:text-cs09">
        {title}
      </span>

      <p className="text-zinc-500 text-cs08/5 line-clamp-4 font-semibold">
        {subtitle}
      </p>

      <div className="absolute -z-10 bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-cs-red rounded-xl transition-all duration-300 delay-300 ease-in-out group-hover:-bottom-2"></div>
    </div>
  );
}

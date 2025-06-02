'use client';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import { TopBarConfig } from '../../shared';
import { Skeleton } from '@/components/ui/skeleton';
import { generalInstance, isEmptyOrInvalid } from '@/utils/services';

type Data = {
  title: string;
  image: string;
  description: string;
};

type ApiResponse = {
  data: Data[];
};

// -----------------------------

export function ReasonOfSelection() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['choose-reasons'],
    queryFn: () => generalInstance('/config/choose-reasons'),
  });

  if (isEmptyOrInvalid({ data, status })) return null;

  return (
    <div className="-ml-5 lg:ml-0">
      <TopBarConfig
        title={{ type: 'single', text: 'دلایل انتخاب سفرنامه 24' }}
        subtitle="موارد مهم برای اینکه باید سفرنامه اولویت باشه !"
      />

      {status === 'pending' ? (
        <>
          {/* === Small-Screen */}
          <Skeleton className="h-80 rounded-xl xl:hidden" />

          {/* === large-Screen */}
          <div className="h-96 hidden grid-cols-4 gap-6 xl:grid">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="rounded-xl" />
              ))}
          </div>
        </>
      ) : (
        <Swiper
          spaceBetween={25}
          breakpoints={{
            0: { slidesPerView: 'auto', slidesOffsetAfter: 22 },
            1280: {
              slidesPerView: 4,
              slidesOffsetAfter: 0,
            },
          }}
        >
          {data?.data.map((item, index) => (
            <SwiperSlide
              key={index}
              className="max-w-72 pb-4 select-none xl:max-w-full"
            >
              <div className="relative bg-zinc-200/70 h-80 overflow-hidden rounded-2xl shadow-[0_0.5rem_1rem_rgb(0,0,0,0.05)] xl:h-96">
                {item.image && (
                  <Image
                    fill
                    src={item.image}
                    alt="image-reason"
                    className="full-size object-cover"
                  />
                )}

                <div className="absolute top-[12.8rem] bottom-4 inset-x-4 bg-white px-6 py-4 flex flex-col items-center gap-2 rounded-xl transition-all duration-500 ease-in-out hover:top-4">
                  <span className="text-zinc-800 text-cs08 font-bold">
                    {item.title}
                  </span>

                  <p className="text-zinc-500 text-cs75/5 text-justify font-semibold overflow-hidden">
                    {item.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

'use client';

import 'swiper/css';
import '@/styles/swiper.css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';
import DImageGallery from './molecules/image-gallery/DImageGallery';

type Data = {
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  main_image: string;
};

type ApiResponse = {
  data: Data;
};

type Props = {
  hotelSlug: string;
};

// -----------------------------------------

export function Pictures(props: Props) {
  const { hotelSlug } = props;

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-images'],
    queryFn: () => generalInstance(`/hotel/hotels/${hotelSlug}/images`),
  });

  if (status !== 'pending' && (!data || !data?.data)) return null;

  return (
    <>
      {/* Small-Device */}
      {status === 'pending' ? (
        <Skeleton className="h-52 xl:hidden rounded-xl" />
      ) : (
        <div className="bg-white h-52 p-2 rounded-xl shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.06)] xl:hidden">
          <Swiper
            spaceBetween={20}
            modules={[Pagination]}
            className="hotelPictures-swiper"
            pagination={{ dynamicBullets: true }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                pagination: { enabled: true },
              },
              640: {
                slidesPerView: 2,
                pagination: { enabled: false },
              },
              1024: { slidesPerView: 3 },
            }}
          >
            {data?.data &&
              Object.values(data?.data).map((picture, index) => (
                <SwiperSlide key={index} className="select-none">
                  <div className="bg-zinc-100 h-48 overflow-hidden rounded-cs-10">
                    {picture && (
                      <Image
                        priority
                        width={500}
                        height={400}
                        src={picture}
                        alt="hotel-view"
                        className="full-size object-cover"
                      />
                    )}
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}

      {/* Large-Device */}
      <div className="h-96 hidden grid-cols-2 gap-6 xl:grid">
        {/* Minor-Images */}
        <div className="h-96 grid grid-cols-2 grid-rows-2 gap-4">
          {status === 'pending' ? (
            <>
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} />
                ))}
            </>
          ) : (
            data?.data &&
            Object.values(data?.data)
              .slice(1)
              .map((picture, index) => (
                <div
                  key={index}
                  className="bg-zinc-200 overflow-hidden rounded-xl"
                >
                  <Image
                    priority
                    width={500}
                    height={400}
                    src={picture}
                    alt="hotel-view"
                    className="full-size object-cover"
                  />
                </div>
              ))
          )}
        </div>

        {/* Main-Image */}
        {status === 'pending' ? (
          <Skeleton />
        ) : (
          <div className="relative bg-zinc-200 overflow-hidden rounded-xl">
            {data?.data.main_image && (
              <Image
                width={600}
                height={400}
                alt="hotel-view"
                src={data?.data.main_image}
                className="full-size object-cover"
              />
            )}

            <DImageGallery hotelSlug={hotelSlug} />
          </div>
        )}
      </div>
    </>
  );
}

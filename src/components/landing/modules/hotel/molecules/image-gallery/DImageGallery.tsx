'use client';

import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';

import 'swiper/css';
import '@/styles/swiper.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';
import { useMediaQuery } from '@/hooks';
import { useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useQuery } from '@tanstack/react-query';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Navigation, Pagination } from 'swiper/modules';

import { generalInstance, isEmptyOrInvalid } from '@/utils/services';

type Data = {
  title: string;
  images: { image: string }[];
};

type ApiResponse = { data: Data[] };

type Props = {
  hotelSlug: string;
};

// ---------------------------------------

export default function DImageGallery(props: Props) {
  const swiperRef = useRef<SwiperType>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-gallery'],
    queryFn: () => generalInstance(`/hotel/hotels/${props.hotelSlug}/gallery`),
  });

  const isDesktop = useMediaQuery('(min-width: 768px)');
  if (!isDesktop || isEmptyOrInvalid({ data, status })) return null;

  return (
    <Dialog>
      {/* === Small-Screen */}
      <DialogTrigger className="bg-zinc-100 text-zinc-700 text-[clamp(0.75rem,2vw,0.8rem)] font-bold flex-center gap-1 rounded-lg transition-colors duration-200 ease-in-out hover:bg-zinc-200/60 sm:px-6">
        تصاویر هتل
      </DialogTrigger>

      {/* === Large-Screen */}
      {status !== 'pending' && (
        <DialogTrigger className="absolute bottom-4 left-4 bg-zinc-100 text-cs75 font-bold px-4 py-2 hidden backdrop-blur-lg rounded-lg xl:block">
          مشاهده تصاویر هتل
        </DialogTrigger>
      )}

      <DialogContent className="max-w-[70%] w-full h-[30rem] flex p-5 flex-col gap-4 lg:max-w-[42rem] lg:h-[32rem]">
        <DialogTitle className="hidden"></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>

        {/* Pictures */}
        <div className="relative flex-1 overflow-hidden rounded-xl">
          <DialogClose className="absolute top-4 right-4 z-10 bg-white w-8 h-8 flex-center rounded-md">
            <IoClose className="w-5 h-5 text-zinc-700" />
          </DialogClose>

          <div className="absolute top-4 left-4 z-10 bg-white text-zinc-800 h-8 px-3 text-cs75/3 font-bold flex-center rounded-lg">
            <span className="inline-block w-4 text-center">
              {activeIndex + 1}
            </span>
            <span>/</span>
            <span className="inline-block w-4 text-center">
              {data?.data[categoryIndex].images.length}
            </span>
          </div>

          {/* --------------- */}

          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              enabled: true,
            }}
            modules={[Pagination, Navigation]}
            className="DHotelGallery-swiper h-full"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            pagination={{ clickable: true, dynamicBullets: true }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {data?.data[categoryIndex].images?.map((image, index) => (
              <SwiperSlide key={index} className="select-none">
                <div className="bg-zinc-100 h-full overflow-hidden rounded-xl">
                  {image && (
                    <Image
                      width={800}
                      height={600}
                      alt="hotel-view"
                      src={image.image}
                      className="full-size object-cover"
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Categories */}
        <div>
          <Swiper
            spaceBetween={10}
            breakpoints={{
              0: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="h-full"
          >
            {data?.data?.map((picture, index) => (
              <SwiperSlide
                key={index}
                className="select-none"
                onClick={() => {
                  setCategoryIndex(index);
                  swiperRef.current?.slideTo(0);
                }}
              >
                <div className="h-full flex flex-col">
                  {/* Image */}
                  <div
                    className={`relative bg-zinc-100 h-24 overflow-hidden border-2 rounded-xl transition-colors duration-200 ease-in-out hover:border-cs-red ${
                      categoryIndex === index
                        ? 'border-cs-red'
                        : 'border-transparent'
                    }`}
                  >
                    {picture.images[0].image && (
                      <Image
                        alt="hotel-view"
                        width={300}
                        height={200}
                        src={picture.images[0].image}
                        className="full-size object-cover"
                      />
                    )}

                    <div className="absolute top-2 left-2 w-8 h-6 pt-0.5 bg-white text-zinc-800 text-cs07 font-bold flex-center rounded-md">
                      {picture.images.length}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="text-zinc-700 text-cs75 font-bold mt-3">
                    {picture.title}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </DialogContent>
    </Dialog>
  );
}

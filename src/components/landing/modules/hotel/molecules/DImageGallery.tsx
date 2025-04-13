'use client';

import 'swiper/css';
import '@/styles/swiper.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Navigation, Pagination } from 'swiper/modules';

import Image from 'next/image';
import { useMediaQuery } from '@/hooks';
import { useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type Props = {
  gallery: { title: string; pictures: string[] }[];
};

// ---------------------------------------

export default function DImageGallery(props: Props) {
  const { gallery } = props;

  const swiperRef = useRef<SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);

  const isDesktop = useMediaQuery('(min-width: 768px)');
  if (!isDesktop) return null;

  return (
    <Dialog>
      <DialogTrigger className="absolute bottom-4 left-4 bg-white/20 text-zinc-100 text-cs75 font-semibold px-5 py-2.5 backdrop-blur-lg rounded-lg transition-colors duration-200 ease-in-out hover:bg-white/30">
        مشاهده تصاویر هتل
      </DialogTrigger>

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
              {gallery[categoryIndex].pictures.length}
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
            {gallery[categoryIndex].pictures?.map((picture, index) => (
              <SwiperSlide key={index} className="select-none">
                <div className="bg-zinc-100 h-full overflow-hidden rounded-xl">
                  {picture && (
                    <Image
                      width={800}
                      height={600}
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

        {/* Categories */}
        <div className="h-36">
          <Swiper
            spaceBetween={10}
            breakpoints={{
              0: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="h-full"
          >
            {gallery?.map((picture, index) => (
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
                    className={`relative bg-zinc-100 h-[7rem] overflow-hidden border-2 rounded-xl transition-colors duration-200 ease-in-out hover:border-cs-red ${
                      categoryIndex === index
                        ? 'border-cs-red'
                        : 'border-transparent'
                    }`}
                  >
                    {picture.pictures[0] && (
                      <Image
                        alt="hotel-view"
                        width={300}
                        height={200}
                        src={picture.pictures[0]}
                        className="full-size object-cover"
                      />
                    )}

                    <div className="absolute top-2 left-2 w-8 h-6 pt-0.5 bg-white text-zinc-800 text-cs07 font-bold flex-center rounded-md">
                      {picture.pictures.length}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="text-zinc-700 text-cs75 font-bold mt-auto">
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

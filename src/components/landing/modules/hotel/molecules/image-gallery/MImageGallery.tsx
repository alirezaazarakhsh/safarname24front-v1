'use client';

import 'swiper/css';
import '@/styles/swiper.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';
import { useMediaQuery } from '@/hooks';
import { useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import {
  Sheet,
  SheetTitle,
  SheetClose,
  SheetTrigger,
  SheetContent,
} from '@/components/ui/sheet';

type Props = {
  city?: string;
  hotelName?: string;
  gallery: { title: string; pictures: string[] }[];
};

// ---------------------------------------

export default function MImageGallery(props: Props) {
  const { hotelName, city, gallery } = props;

  const swiperRef = useRef<SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);

  const isDesktop = useMediaQuery('(min-width: 768px)');
  if (isDesktop) return null;

  return (
    <Sheet>
      <SheetTrigger className="bg-zinc-100 text-zinc-700 text-cs08 font-bold px-5 flex-center gap-1 rounded-lg transition-colors duration-200 ease-in-out hover:bg-zinc-200/60 xl:px-6">
        مشاهده تصاویر هتل
      </SheetTrigger>

      <SheetContent
        side={'left'}
        aria-describedby={undefined}
        className="bg-[#0E0E0E] text-white w-full pt-12 pb-8 grid grid-rows-[3rem_19rem_5rem] content-between border-none"
      >
        <SheetTitle className="hidden"></SheetTitle>

        {/* === Hotel-Name & City | Image-Number | Close */}
        <div className="flex-between items-start gap-4">
          <div className="grid gap-2">
            {hotelName && city && (
              <p className="text-[clamp(0.85rem,2vw,0.95rem)] font-bold flex items-center gap-1">
                <span>هتل</span>
                <span>{hotelName}</span>
                <span>{city}</span>
              </p>
            )}

            <p className="text-zinc-300 text-cs08 font-medium flex items-center gap-0.5">
              <span>تصویر</span>
              <span className="w-3 inline-block text-center">
                {activeIndex + 1}
              </span>
              <span>از</span>
              <span className="w-3 inline-block text-center">
                {gallery[categoryIndex].pictures.length}
              </span>
            </p>
          </div>

          <SheetClose className="bg-[#181818] w-8 h-8 flex-center rounded-md">
            <IoClose size={20} color="#888" />
          </SheetClose>
        </div>

        {/* === Category-Pictures | Category-Title */}
        <div className="-mx-6 flex flex-col items-center gap-6 overflow-hidden">
          <span className="bg-[#181818] text-[clamp(0.8rem,2vw,0.85rem)] w-fit font-medium px-6 py-3 rounded-lg">
            {gallery[categoryIndex].title}
          </span>

          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            modules={[Pagination]}
            className="full-size MHotelGallery-swiper"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            pagination={{ clickable: true, dynamicBullets: true }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {gallery[categoryIndex].pictures?.map((picture, index) => (
              <SwiperSlide key={index} className="bg-zinc-600 select-none">
                {picture && (
                  <Image
                    width={800}
                    height={600}
                    src={picture}
                    alt="hotel-view"
                    className="full-size object-cover"
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* === Categories */}
        <div className="-mx-6 overflow-hidden">
          <Swiper
            spaceBetween={15}
            slidesPerView={'auto'}
            slidesOffsetAfter={22}
            slidesOffsetBefore={22}
            className="full-size"
          >
            {gallery?.map((picture, index) => (
              <SwiperSlide
                key={index}
                onClick={() => {
                  setCategoryIndex(index);
                  swiperRef.current?.slideTo(0);
                }}
                className={`relative max-w-32 bg-zinc-600 overflow-hidden border-2 rounded-cs-10 hover:border-white ${
                  categoryIndex === index
                    ? 'border-white'
                    : 'border-transparent'
                }`}
              >
                {picture.pictures[0] && (
                  <Image
                    width={300}
                    height={200}
                    alt="hotel-view"
                    src={picture.pictures[0]}
                    className="full-size object-cover"
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </SheetContent>
    </Sheet>
  );
}

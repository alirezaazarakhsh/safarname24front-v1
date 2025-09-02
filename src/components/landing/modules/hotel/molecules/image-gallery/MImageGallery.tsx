'use client';

import {
  Sheet,
  SheetTitle,
  SheetClose,
  SheetTrigger,
  SheetContent,
} from '@/components/ui/sheet';

import 'swiper/css';
import '@/styles/swiper.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';
import { useMediaQuery } from '@/hooks';
import { useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useQuery } from '@tanstack/react-query';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import { generalInstance, isEmptyOrInvalid } from '@/utils/services';

type Data = {
  title: string;
  images: { image: string }[];
};

type Props = { hotelSlug: string };
type ApiResponse = { data: Data[] };

// ---------------------------------------

export default function MImageGallery(props: Props) {
  const swiperRef = useRef<SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-gallery'],
    queryFn: () => generalInstance(`/hotel/hotels/${props.hotelSlug}/gallery`),
  });

  const isDesktop = useMediaQuery('(min-width: 768px)');
  if (isDesktop || isEmptyOrInvalid({ data, status })) return null;

  return (
    <Sheet>
      <SheetTrigger className="bg-zinc-100 text-zinc-700 text-cs08 font-bold flex-center gap-1 rounded-lg transition-colors duration-200 ease-in-out hover:bg-zinc-200/60 sm:px-6">
        تصاویر هتل
      </SheetTrigger>

      <SheetContent
        side={'left'}
        aria-describedby={undefined}
        className="bg-[#0E0E0E] text-white w-full py-8 grid grid-rows-[3rem_19rem_5rem] content-between border-none"
      >
        <SheetTitle className="hidden"></SheetTitle>

        {/* === Hotel-Name & City | Image-Number | Close */}
        <div className="flex-between items-start gap-4">
          <div className="grid gap-2">
            <p className="text-zinc-300 text-cs08 font-medium flex items-center gap-0.5">
              <span>تصویر</span>
              <span className="w-3 inline-block text-center">
                {activeIndex + 1}
              </span>
              <span>از</span>
              <span className="w-3 inline-block text-center">
                {data?.data[categoryIndex].images.length}
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
            {data?.data[categoryIndex].title}
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
            {data?.data[categoryIndex].images?.map((image, index) => (
              <SwiperSlide key={index} className="bg-zinc-600 select-none">
                {image.image && (
                  <Image
                    width={800}
                    height={600}
                    alt="hotel-view"
                    src={image.image}
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
            {data?.data?.map((picture, index) => (
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
                {picture.images[0].image && (
                  <Image
                    width={300}
                    height={200}
                    alt="hotel-view"
                    src={picture.images[0].image}
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

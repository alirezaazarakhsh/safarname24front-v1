'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';

import { useMediaQuery } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { generalInstance } from '@/utils/services';

import { Swiper as SwiperType } from 'swiper/types';
import { useEffect, useRef, useState } from 'react';
import { TGallery, THotelSlug } from '@/types/landing';

import TopBar from '../../atoms/pictures-gallery/large-screen/TopBar';
import Pictures from '../../atoms/pictures-gallery/large-screen/Pictures';
import Categories from '../../atoms/pictures-gallery/large-screen/Categories';
import { FaRegImages } from 'react-icons/fa6';

type Props = THotelSlug;
type TGalleryResponse = TGallery;
type TPicturesResponse = string[];

// ---------------------------------------

export default function DImageGallery(props: Props) {
  const { hotelSlug } = props;

  const [isOpen, setOpen] = useState(false);
  const swiperRef = useRef<SwiperType>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const { data: gallery } = useQuery<TGalleryResponse>({
    queryKey: ['hotel-gallery'],
    queryFn: () =>
      generalInstance(`/hotel/hotels/${hotelSlug}/gallery`).then(
        (data) => data.data,
      ),
  });

  const { data: pictures } = useQuery<TPicturesResponse>({
    queryKey: ['hotel-pictures'],
    queryFn: () =>
      generalInstance(`/hotel/hotels/${hotelSlug}/images`).then(
        (data) => data.data,
      ),
  });

  const formattedGallery: TGalleryResponse = [
    { title: 'پیشفرض', images: pictures ?? [] },
    ...(gallery ?? []),
  ];

  const handleSetActiveIndex = (index: number) => setActiveIndex(index);
  const handleSetCategoryIndex = (index: number) => {
    setCategoryIndex(index);
    swiperRef.current?.slideTo(0);
  };

  useEffect(() => {
    if (!isDesktop) setOpen(false);
  }, [isDesktop]);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {/* === Small-Screen */}
      <DialogTrigger className="md:flex-center hidden gap-1 rounded-cs-10 bg-zinc-100 text-cs08 font-bold text-zinc-700 xl:hidden">
        تصاویر هتل
      </DialogTrigger>

      {/* === Large-Screen */}
      <DialogTrigger className="xl:flex-center absolute bottom-4 left-4 hidden h-10 gap-2 rounded-cs-10 bg-zinc-100 px-5">
        <FaRegImages className="size-5" color="#444" />
        <span className="text-cs08 font-bold">مجموعه تصاویر هتل</span>
      </DialogTrigger>

      <DialogContent className="grid h-[30rem] w-full max-w-[70%] grid-rows-[1fr_auto] gap-4 rounded-3xl p-4 lg:h-[32rem] lg:max-w-[44rem]">
        <DialogTitle className="hidden"></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>

        <div className="relative overflow-hidden rounded-2xl">
          <TopBar
            activeIndex={activeIndex}
            categoryLength={
              formattedGallery?.[categoryIndex].images.length ?? 1
            }
          />

          <Pictures
            ref={swiperRef}
            setActiveIndex={handleSetActiveIndex}
            pictures={formattedGallery?.[categoryIndex].images ?? []}
          />
        </div>

        <Categories
          categoryIndex={categoryIndex}
          categories={formattedGallery ?? []}
          setCategoryIndex={handleSetCategoryIndex}
        />
      </DialogContent>
    </Dialog>
  );
}

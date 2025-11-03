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
      <DialogTrigger className="bg-zinc-100 text-zinc-700 text-cs08 font-bold gap-1 hidden rounded-cs-10 md:flex-center">
        تصاویر هتل
      </DialogTrigger>

      {/* === Large-Screen */}
      <DialogTrigger className="absolute bottom-4 left-4 bg-zinc-100 text-cs08 font-bold px-5 py-2.5 hidden backdrop-blur-lg rounded-cs-10 xl:block">
        مجموعه تصاویر هتل
      </DialogTrigger>

      <DialogContent className="max-w-[70%] w-full h-[30rem] flex flex-col gap-4 rounded-3xl lg:max-w-[42rem] lg:h-[32rem]">
        <DialogTitle className="hidden"></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>

        {/* Pictures */}
        <div className="relative flex-1 overflow-hidden rounded-2xl">
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

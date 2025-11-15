'use client';

import {
  Sheet,
  SheetTitle,
  SheetTrigger,
  SheetContent,
  SheetDescription,
} from '@/components/ui/sheet';

import { useMediaQuery } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { generalInstance } from '@/utils/services';

import { Swiper as SwiperType } from 'swiper/types';
import { useEffect, useRef, useState } from 'react';
import { TGallery, THotelSlug } from '@/types/landing';

import TopBar from '../../atoms/pictures-gallery/small-screen/TopBar';
import Pictures from '../../atoms/pictures-gallery/small-screen/Pictures';
import Categories from '../../atoms/pictures-gallery/small-screen/Categories';

type Props = THotelSlug;
type TGalleryResponse = TGallery;
type TPicturesResponse = string[];

// --------------------------------

export default function MImageGallery(props: Props) {
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
    if (isDesktop) setOpen(false);
  }, [isDesktop]);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger className="rounded-cs-10 bg-zinc-100 text-cs08 font-bold text-zinc-800 md:hidden">
        تصاویر هتل
      </SheetTrigger>

      <SheetContent
        side={'left'}
        className="grid w-full grid-rows-[auto_clamp(20rem,50vw,30rem)_5rem] content-between border-none bg-[#0E0E0E] text-white"
      >
        <SheetTitle className="hidden"></SheetTitle>
        <SheetDescription className="hidden"></SheetDescription>

        <TopBar
          activeIndex={activeIndex}
          categoryLength={formattedGallery?.[categoryIndex].images.length ?? 1}
        />

        <div className="-mx-6 flex flex-col items-center gap-6 overflow-hidden">
          <span className="w-fit rounded-lg bg-[#181818] px-6 py-3 text-[clamp(0.8rem,2vw,0.85rem)] font-medium">
            {formattedGallery?.[categoryIndex].title}
          </span>

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
      </SheetContent>
    </Sheet>
  );
}

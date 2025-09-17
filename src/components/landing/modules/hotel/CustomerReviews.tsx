'use client';

import { PiPlus } from 'react-icons/pi';
import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Cookies from 'js-cookie';
import { TopBarConfig } from '../../shared';
import { Section } from './molecules/Section';
import { HotelCustomerReview } from '@/types';
import { generalInstance } from '@/utils/services';
import { HiMiniExclamationCircle } from 'react-icons/hi2';

import { Swiper as SwiperType } from 'swiper/types';

import Reviews from './molecules/customer-reviews/Reviews';
import ReviewsAverage from './molecules/customer-reviews/ReviewsAverage';

import { Skeleton } from '@/components/ui/skeleton';
import { AddCommentProvider } from '@/context/AddCommentContext';
import AuthGuardReaction from '../../shared/auth/AuthGuardReaction';
import AddCommentWrapper from './molecules/customer-review/AddCommentWrapper';

type Props = { hotelSlug: string };
type ApiResponse = { data: HotelCustomerReview[] };

// --------------------------------------

export function CustomerReviews(props: Props) {
  const { hotelSlug } = props;
  const swiperRef = useRef<SwiperType>(null);

  const [isOpen, setOpen] = useState(false);
  const [addCommentIsOpen, setAddCommentIsOpen] = useState(false);

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-comments-list'],
    queryFn: () => generalInstance(`/hotel/hotels/${hotelSlug}/comments`),
  });

  return (
    <Section sectionID="customer-reviews" className="relative">
      <TopBarConfig
        maxLength={2}
        arraylength={data?.data?.length}
        subtitle={
          data?.data.length
            ? `${data?.data.length} دیدگاه از سوی کاربران به ثبت رسیده است`
            : undefined
        }
        title={{ type: 'single', text: 'نظرات محبت آمیز مشتریان' }}
        prevClickFunc={() => swiperRef.current?.slidePrev()}
        nextClickFunc={() => swiperRef.current?.slideNext()}
      />

      {/* === Add-Comment */}
      <button
        className="absolute bg-white/50 top-1 left-0 h-10 px-4 pr-3 flex-center gap-2 border rounded-lg"
        onClick={() => {
          const authToken = Cookies.get('auth');
          if (authToken) setAddCommentIsOpen(true);
          else setOpen(true);
        }}
      >
        <PiPlus size={14} />

        <span className="text-zinc-800 text-cs08 font-semibold">
          افزودن نظر
        </span>
      </button>

      {/* === Data-Content */}
      {status === 'pending' ? (
        <div className="grid gap-6 lg:h-[30rem] lg:grid lg:grid-cols-[1fr_2fr] lg:gap-8">
          <Skeleton className="h-[30rem] rounded-xl lg:h-auto" />
          <Skeleton className="h-96 rounded-xl lg:h-auto" />
        </div>
      ) : data?.data.length ? (
        <div className="grid gap-6 overflow-hidden lg:h-[30rem] lg:grid-cols-[1fr_2fr] lg:gap-8">
          <ReviewsAverage hotelSlug={hotelSlug} />
          <Reviews hotelSlug={hotelSlug} ref={swiperRef} />
        </div>
      ) : (
        <div className="bg-cs-blue/10 p-5 text-cs-blue text-cs85/6 font-semibold flex flex-col items-center justify-center gap-3 rounded-xl lg:text-cs09/5 lg:p-8">
          <div className="flex-center gap-1.5">
            <HiMiniExclamationCircle
              color="#4b5bce"
              className="size-5 lg:size-6"
            />

            <p className="font-bold">دیدگاهی برای این هتل ثبت نشده است</p>
          </div>

          <div className="w-[90%] border-b border-dashed border-cs-blue/20 md:w-1/3" />

          <p className="text-cs08/6 text-center lg:text-cs85/6">
            برای افزودن دیدگاه خود از دکمه "افزودن نظر" استفاده نمایید و اولین
            دیدگاه را شما ثبت کنید .
          </p>
        </div>
      )}

      {/* === Context-Provider */}
      <AddCommentProvider>
        <AddCommentWrapper
          hotelSlug={hotelSlug}
          isOpen={addCommentIsOpen}
          setOpen={setAddCommentIsOpen}
        />
      </AddCommentProvider>
      <AuthGuardReaction isOpen={isOpen} setOpen={setOpen} />
    </Section>
  );
}

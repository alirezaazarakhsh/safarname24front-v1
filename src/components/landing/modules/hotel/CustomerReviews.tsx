'use client';

import { PiPlus } from 'react-icons/pi';
import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

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
import { useCheckAuth } from '@/hooks';

type Props = { hotelSlug: string };
type ApiResponse = { data: HotelCustomerReview[] };

// --------------------------------------

export function CustomerReviews(props: Props) {
  const { hotelSlug } = props;
  const { isAuthenticated } = useCheckAuth();
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
        className="flex-center absolute left-0 top-1 h-10 gap-2 rounded-lg border bg-white/50 px-4 pr-3"
        onClick={() => {
          if (isAuthenticated) setAddCommentIsOpen(true);
          else setOpen(true);
        }}
      >
        <PiPlus size={14} />

        <span className="text-cs08 font-semibold text-zinc-800">
          افزودن نظر
        </span>
      </button>

      {/* === Data-Content */}
      {status === 'pending' ? (
        <div className="grid gap-6 lg:grid lg:h-[30rem] lg:grid-cols-[1fr_2fr] lg:gap-8">
          <Skeleton className="h-[30rem] rounded-xl lg:h-auto" />
          <Skeleton className="h-96 rounded-xl lg:h-auto" />
        </div>
      ) : data?.data.length ? (
        <div className="grid gap-6 overflow-hidden lg:h-[30rem] lg:grid-cols-[1fr_2fr] lg:gap-8">
          <ReviewsAverage hotelSlug={hotelSlug} />
          <Reviews hotelSlug={hotelSlug} ref={swiperRef} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-cs-blue/10 p-6 text-cs85/6 font-semibold text-cs-blue lg:p-8 lg:text-cs09/5">
          <div className="flex-center gap-1.5">
            <HiMiniExclamationCircle
              color="#4b5bce"
              className="size-5 lg:size-6"
            />

            <p className="font-bold">
              تاکنون دیدگاهی برای این هتل به ثبت نرسیده است !
            </p>
          </div>

          <div className="w-[90%] border-b border-dashed border-cs-blue/20 md:w-1/3" />

          <p className="text-center text-cs08/6 lg:text-cs85/6">
            * برای افزودن دیدگاه خود از دکمه "افزودن نظر" استفاده نمایید و اولین
            دیدگاه را ثبت کنید .
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

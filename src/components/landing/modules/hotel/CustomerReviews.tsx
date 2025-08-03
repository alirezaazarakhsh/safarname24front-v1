'use client';

import { useEffect, useState } from 'react';
import { PiPlus } from 'react-icons/pi';
import { useQuery } from '@tanstack/react-query';

import Cookies from 'js-cookie';
import { TopBarConfig } from '../../shared';
import { Section } from './molecules/Section';
import { HotelCustomerReview } from '@/types';
import { generalInstance } from '@/utils/services';

import Reviews from './molecules/customer-reviews/Reviews';
import ReviewsAverage from './molecules/customer-reviews/ReviewsAverage';

import { AddCommentProvider } from '@/context/AddCommentContext';
import AuthGuardReaction from '../../shared/auth/AuthGuardReaction';
import AddCommentWrapper from './molecules/customer-review/AddCommentWrapper';

type ApiResponse = {
  data: HotelCustomerReview[];
};

type Props = {
  hotelSlug: string;
};

// --------------------------------------

export function CustomerReviews(props: Props) {
  const { hotelSlug } = props;

  const [isOpen, setOpen] = useState(false);
  const [addCommentIsOpen, setAddCommentIsOpen] = useState(false);

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-comments-list'],
    queryFn: () => generalInstance(`/hotel/hotels/${hotelSlug}/comments`),
  });

  useEffect(() => {}, []);

  return (
    <Section sectionID="customer-reviews" className="relative">
      <TopBarConfig
        className="mb-3 lg:mb-4"
        subtitle={`${data?.data.length ? data?.data.length : '...'} نظر از سوی کاربران به ثبت رسیده است`}
        title={{ type: 'single', text: 'نظرات محبت آمیز مشتریان' }}
      />

      <button
        className="absolute top-0 left-0 h-10 px-4 pr-3 flex-center gap-2 border rounded-lg"
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

      {status !== 'pending' && data?.data.length !== 0 && (
        <div className="flex bg-red-100 flex-col gap-6 overflow-hidden lg:h-[30rem] lg:flex-row lg:gap-8">
          <div className="lg:w-4/12">
            <ReviewsAverage hotelSlug={hotelSlug} />
          </div>

          <div className="overflow-hidden lg:w-8/12">
            <Reviews hotelSlug={hotelSlug} />
          </div>
        </div>
      )}

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

'use client';

import { useState } from 'react';
import { PiPlus } from 'react-icons/pi';

import { TopBarConfig } from '../../shared';
import Reviews from './molecules/customer-reviews/Reviews';
import { HotelCustomerReview, HotelReviewsAverage } from '@/types';
import ReviewsAverage from './molecules/customer-reviews/ReviewsAverage';

import { AddCommentProvider } from '@/context/AddCommentContext';
import AddCommentWrapper from './molecules/customer-review/AddCommentWrapper';

type Props = {
  customerReviews: {
    reviewsAverage: HotelReviewsAverage;
    reviews: Array<HotelCustomerReview>;
  };
};

// --------------------------------------

export function CustomerReviews(props: Props) {
  const {
    customerReviews: { reviewsAverage, reviews },
  } = props;

  const [addCommentIsOpen, setAddCommentIsOpen] = useState(false);

  return (
    <div id="passengers-viewpoint" className="relative">
      <TopBarConfig
        className="mb-3 lg:mb-4"
        subtitle={`${16} نظر از سوی کاربران ثبت شد`}
        title={{ type: 'single', text: 'نظرات محبت آمیز مشتریان' }}
      />

      <button
        className="absolute top-0 left-0 h-10 px-4 pr-3 flex-center gap-2 border rounded-lg"
        onClick={() => setAddCommentIsOpen(true)}
      >
        <PiPlus size={14} />

        <span className="text-zinc-800 text-cs08 font-semibold">
          افزودن نظر
        </span>
      </button>

      <div className="flex flex-col gap-8 lg:flex-row lg:h-[30rem]">
        <ReviewsAverage reviewsAverage={reviewsAverage} />
        <Reviews reviews={reviews} />
      </div>

      <AddCommentProvider>
        <AddCommentWrapper
          isOpen={addCommentIsOpen}
          setOpen={setAddCommentIsOpen}
        />
      </AddCommentProvider>
    </div>
  );
}

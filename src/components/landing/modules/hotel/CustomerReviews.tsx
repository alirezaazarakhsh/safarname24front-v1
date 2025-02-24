'use client';

import Reviews from './molecules/customer-reviews/Reviews';
import { HotelCustomerReview, HotelReviewsAverage } from '@/types';
import ReviewsAverage from './molecules/customer-reviews/ReviewsAverage';
import { TopBarConfig } from '../../shared';

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

  return (
    <div className='relative'>
      <TopBarConfig title='نظرات محبت آمیز مشتریان' subtitle={`${16} نظر ثبت شد`} className='mb-3 lg:mb-4' />

      <button className='absolute top-0 left-0 h-10 px-4 pr-3 flex-center gap-1.5 border rounded-lg'>
        <svg
          width='25'
          height='25'
          className='w-4 h-4'
          viewBox='0 0 25 25'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M18.5 13.25H6.5C6.09 13.25 5.75 12.91 5.75 12.5C5.75 12.09 6.09 11.75 6.5 11.75H18.5C18.91 11.75 19.25 12.09 19.25 12.5C19.25 12.91 18.91 13.25 18.5 13.25Z'
            fill='#2B2B2B'
          />
          <path
            d='M12.5 19.25C12.09 19.25 11.75 18.91 11.75 18.5V6.5C11.75 6.09 12.09 5.75 12.5 5.75C12.91 5.75 13.25 6.09 13.25 6.5V18.5C13.25 18.91 12.91 19.25 12.5 19.25Z'
            fill='#2B2B2B'
          />
        </svg>

        <span className='text-zinc-800 text-cs08 font-semibold'>افزودن نظر</span>
      </button>

      <div className='flex flex-col gap-8 lg:flex-row lg:h-[30rem]'>
        <ReviewsAverage reviewsAverage={reviewsAverage} />
        <Reviews reviews={reviews} />
      </div>
    </div>
  );
}

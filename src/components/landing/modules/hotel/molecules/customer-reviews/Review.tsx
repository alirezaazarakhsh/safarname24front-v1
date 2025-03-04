import Image from 'next/image';

import { ICStar } from '@/components/icons';
import { HotelCustomerReview } from '@/types';

type Props = {
  review: HotelCustomerReview;
};

// -----------------------------------------

export default function Review(props: Props) {
  const {
    review: { avatar, fullname, date, time, rate, comment, points },
  } = props;

  return (
    <div className='relative h-full bg-white p-5 border rounded-xl'>
      {/* Avatar | FullName | Date */}
      <div className='flex items-center gap-3 lg:gap-4'>
        <div className='bg-zinc-100 w-12 h-12 overflow-hidden rounded-full lg:w-12 lg:h-12'>
          {avatar && (
            <Image src={avatar} alt={'customer-avatar'} width={100} height={100} className='full-size object-contain' />
          )}
        </div>

        <div className='flex-1 flex flex-col items-start space-y-1'>
          <div className='w-40 text-zinc-800 text-cs85 font-extrabold truncate lg:text-cs09 lg:max-w-48 xl:max-w-72'>
            {fullname}
          </div>

          <div className='text-zinc-600 text-cs08 font-semibold flex-center gap-1'>
            <span>تاریخ اقامت</span>
            <span>:</span>
            <span>{date}</span>
          </div>
        </div>
      </div>

      {/* Comment */}
      <div className='h-[3.9rem] text-zinc-600 text-cs08/5 text-justify font-semibold pl-4 my-5 overflow-auto custom-scrollbar lg:h-10'>
        {comment}
      </div>

      {/* Points */}
      <div className='h-[7.8rem] overflow-auto custom-scrollbar lg:h-14'>
        <div className='w-fit grid gap-3 lg:grid-cols-2 lg:gap-12'>
          {/* Positive */}
          <div className='space-y-3 truncate'>
            {points.positive?.map((point, id) => (
              <div key={id} className='-mr-0.5 flex items-center gap-2'>
                <svg
                  width='24'
                  height='24'
                  className='w-5 h-5'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                    fill='#39B533'
                  />
                  <path
                    d='M16 11.25H12.75V8C12.75 7.59 12.41 7.25 12 7.25C11.59 7.25 11.25 7.59 11.25 8V11.25H8C7.59 11.25 7.25 11.59 7.25 12C7.25 12.41 7.59 12.75 8 12.75H11.25V16C11.25 16.41 11.59 16.75 12 16.75C12.41 16.75 12.75 16.41 12.75 16V12.75H16C16.41 12.75 16.75 12.41 16.75 12C16.75 11.59 16.41 11.25 16 11.25Z'
                    fill='#F8F8F8'
                  />
                </svg>

                <span className='flex-1 text-zinc-600 text-cs08 font-semibold pl-4 truncate'>{point}</span>
              </div>
            ))}
          </div>

          {/* Negative */}
          <div className='space-y-3 truncate'>
            {points.negative?.map((point, id) => (
              <div key={id} className='-mr-0.5 flex items-center gap-2'>
                <svg
                  width='24'
                  height='24'
                  className='w-5 h-5'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                    fill='#FF4949'
                  />
                  <path
                    d='M15.9199 12.75H7.91992C7.50992 12.75 7.16992 12.41 7.16992 12C7.16992 11.59 7.50992 11.25 7.91992 11.25H15.9199C16.3299 11.25 16.6699 11.59 16.6699 12C16.6699 12.41 16.3399 12.75 15.9199 12.75Z'
                    fill='#F8F8F8'
                  />
                </svg>

                <span className='flex-1 text-zinc-600 text-cs08 font-semibold pl-4 truncate'>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Time | Rate (Small-Screen) */}
      <div className='h-9 top-5 left-5 text-zinc-100 text-cs08 font-semibold flex justify-end gap-3 mt-6 lg:mt-0 lg:absolute'>
        <div className='bg-cs-dark-blue px-4 flex-center gap-1.5 rounded-lg'>
          <span>ساعت</span>
          <span>{time}</span>
        </div>

        <div className='bg-cs-red px-4 flex-center gap-2 rounded-lg'>
          <ICStar />
          <span className='pt-0.5'>{rate}</span>
        </div>
      </div>
    </div>
  );
}

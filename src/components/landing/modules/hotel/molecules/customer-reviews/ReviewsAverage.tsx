import { HotelReviewsAverage } from '@/types';

type Props = {
  reviewsAverage: HotelReviewsAverage;
};

// --------------------------------------

export default function ReviewsAverage(props: Props) {
  const {
    reviewsAverage: { rate, comment, standards },
  } = props;

  return (
    <div className='bg-white p-5 pb-8 flex flex-col border rounded-xl lg:w-4/12'>
      {/* Rate | Comment */}
      <div className='flex-between items-center'>
        <div className='text-zinc-800 text-lg font-black flex-center gap-2'>
          <span>{rate}</span>
          <span>امتیاز</span>
        </div>

        <div className='bg-green-500/10 text-green-500 text-cs08 font-semibold px-4 py-2 rounded-md'>{comment}</div>
      </div>

      {/* Standards */}
      <div className='mt-6 space-y-6'>
        {standards?.map((standard, id) => (
          <div key={id} className='space-y-2'>
            {/* Title | Value */}
            <div className='text-zinc-800 text-cs75 font-bold flex-between'>
              <span>{standard.title}</span>
              <span>{standard.value}</span>
            </div>

            {/* Progress-Bar */}
            <div className='relative bg-zinc-200 h-[4px] overflow-hidden rounded-full'>
              <div
                style={{ width: `${(standard.value / 5) * 100}%` }}
                className='absolute inset-y-0 left-0 bg-cs-dark-blue rounded-full'
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

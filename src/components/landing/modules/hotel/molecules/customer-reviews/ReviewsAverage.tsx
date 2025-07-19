'use client';

import { HotelReviewsAverage } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

type ApiResponse = {
  data: HotelReviewsAverage;
};

type Props = {
  hotelSlug: string;
};

// --------------------------------------

export default function ReviewsAverage(props: Props) {
  const { hotelSlug } = props;

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-comments-average'],
    queryFn: () =>
      generalInstance(`/hotel/hotels/${hotelSlug}/comments/points-summary`),
  });

  return (
    <>
      {status === 'pending' ? (
        <Skeleton className="ٌw-full h-[30rem] rounded-xl" />
      ) : (
        <div className="bg-white p-5 pb-8 flex flex-col border overflow-hidden h-full rounded-xl">
          {/* Rate | Comment */}
          <div className="flex-between items-center">
            <div className="text-zinc-800 text-lg font-black flex-center gap-2">
              <span>{data?.data.average_score}</span>
              <span>امتیاز</span>
            </div>

            <div
              className={`text-cs08 font-semibold px-4 py-2 rounded-md ${
                data?.data.average_score && data?.data.average_score < 3
                  ? 'bg-red-500/10 text-red-500'
                  : data?.data.average_score && data?.data.average_score >= 3
                    ? 'bg-green-500/10 text-green-500'
                    : ''
              }`}
            >
              {data?.data.average_score && data?.data.average_score < 3
                ? 'ضعیف'
                : data?.data.average_score &&
                    data?.data.average_score >= 3 &&
                    data?.data.average_score <= 4
                  ? 'خوب'
                  : data?.data.average_score &&
                      data?.data.average_score > 4 &&
                      data?.data.average_score < 5
                    ? 'خیلی خوب'
                    : 'عالی'}
            </div>
          </div>

          {/* Standards */}
          <div className="mt-6 space-y-6">
            {data?.data?.items?.map((standard, index) => (
              <div key={index} className="space-y-2.5">
                <div className="text-zinc-800 text-cs08 font-bold flex-between">
                  <span>{standard.title}</span>
                  <span>{standard.average}</span>
                </div>

                <div className="relative bg-zinc-200 h-[4px] overflow-hidden rounded-full">
                  <div
                    style={{ width: `${(standard.average / 5) * 100}%` }}
                    className="absolute inset-y-0 left-0 bg-cs-dark-blue rounded-full"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

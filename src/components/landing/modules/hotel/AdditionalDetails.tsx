'use client';

import { useQuery } from '@tanstack/react-query';

import { TopBarConfig } from '../../shared';
import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

type Data = {
  further_description: string;
};

type ApiResponse = {
  data: Data;
};

type Props = {
  hotelSlug: string;
};

// -----------------------------------------

export function AdditionalDetails(props: Props) {
  const { hotelSlug } = props;

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-further-description'],
    queryFn: () =>
      generalInstance(`/hotel/hotels/${hotelSlug}/further-description`),
  });

  const description = data?.data.further_description;
  if (status !== 'pending' && (!data || !data?.data)) return null;

  return (
    <div id="additional-detail">
      <TopBarConfig
        className="mb-1 lg:mb-2"
        title={{ type: 'single', text: 'توضیحات تکمیلی' }}
      />

      {status === 'pending' ? (
        <>
          <div className="grid gap-2 lg:hidden">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="h-6" />
              ))}
          </div>

          <div className="hidden gap-2 lg:grid">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="h-6" />
              ))}
          </div>
        </>
      ) : (
        <p className="text-zinc-600 text-cs08/6 text-justify font-semibold overflow-hidden lg:text-cs85/7">
          {description}
        </p>
      )}
    </div>
  );
}

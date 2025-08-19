'use client';

import { TopBarConfig } from '../../shared';
import { Section } from './molecules/Section';

import { useQuery } from '@tanstack/react-query';

import { Skeleton } from '@/components/ui/skeleton';
import { generalInstance, isEmptyOrInvalid } from '@/utils/services';

import DImportantPlaces from './molecules/important-places/DImportantPlaces';
import MImportantPlaces from './molecules/important-places/MImportantPlaces';

export type Data = {
  image: string;
  title: string;
  distance: number;
  latitude: string;
  longitude: string;
  driving_time: number;
  walking_time: number;
};

type ApiResponse = {
  data: Data[];
};

type Props = {
  hotelSlug: string;
};

// -----------------------------------------

export function ImportantPlaces(props: Props) {
  const { hotelSlug } = props;

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-nearby-places'],
    queryFn: () => generalInstance(`/hotel/hotels/${hotelSlug}/nearby-places`),
  });

  if (isEmptyOrInvalid({ data, status })) return null;

  return (
    <Section sectionID="important-places">
      <TopBarConfig
        className="mb-3 lg:mb-4"
        title={{ type: 'single', text: 'اماکن مهم اطراف هتل' }}
      />

      {status === 'pending' ? (
        <>
          <Skeleton className="h-24 rounded-xl lg:hidden" />

          <div className="h-[22rem] hidden grid-cols-2 gap-10 lg:grid">
            <div className="grid grid-rows-3 gap-6">
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} className="rounded-xl" />
                ))}
            </div>

            <Skeleton className="rounded-xl" />
          </div>
        </>
      ) : (
        <>
          <MImportantPlaces importantPlaces={data?.data} />
          <DImportantPlaces importantPlaces={data?.data} />
        </>
      )}
    </Section>
  );
}

'use client';

import { TopBarConfig } from '../../shared';
import { Section } from './molecules/Section';

import { useQuery } from '@tanstack/react-query';

import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

import MFacilities from './molecules/facilities/MFacilities';
import { DFacilities } from './molecules/facilities/DFacilities';

type Data = {
  name: string;
  facilities: { title: string }[];
  room_facilities: { title: string }[];
};

type ApiResponse = { data: Data };

type Props = {
  hotelSlug: string;
};

// ---------------------------------------

export function Facilities(props: Props) {
  const { hotelSlug } = props;

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-services'],
    queryFn: () => generalInstance(`/hotel/hotels/${hotelSlug}/all-facilities`),
  });

  if (
    status !== 'pending' &&
    (!data ||
      !data?.data ||
      !data?.data?.facilities?.length ||
      !data?.data?.room_facilities?.length)
  )
    return null;

  return (
    <Section sectionID="facilities-services" className="relative">
      <TopBarConfig title={{ type: 'single', text: 'امکانات هتل' }} />

      {status === 'pending' ? (
        <>
          <Skeleton className="h-64 md:hidden" />

          <div className="hidden md:block">
            <Skeleton className="absolute top-0 left-0 w-80 h-10" />
            <Skeleton className="h-56 rounded-xl lg:h-48" />
          </div>
        </>
      ) : (
        <>
          <MFacilities facilities={data?.data} />
          <DFacilities facilities={data?.data} />
        </>
      )}
    </Section>
  );
}

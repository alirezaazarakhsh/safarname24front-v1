'use client';

import { TopBarConfig } from '../../shared';
import { Section } from './molecules/Section';

import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { generalInstance } from '@/utils/services';

import MFacilities from './molecules/facilities/MFacilities';
import { DFacilities } from './molecules/facilities/DFacilities';

type Data = {
  count: number;
  total_pages: number;
  current_page: number;
  results: { title: string }[];
};

type ApiResponse = [{ data: Data }, { data: Data }];

type Props = {
  hotelSlug: string;
};

export type PNAction = 'inc' | 'dec';
export type PageNumber = 'hotel' | 'room';

const pageNumberState = { hotel: 1, room: 1 };

// ---------------------------------------

export function Facilities(props: Props) {
  const { hotelSlug } = props;
  const [pageNumber, setPageNumber] = useState(pageNumberState);

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-services', pageNumber],
    queryFn: () =>
      Promise.all([
        generalInstance(
          `/hotel/hotels/${hotelSlug}/facilities?p${pageNumber.hotel}`,
        ),
        generalInstance(
          `/hotel/hotels/${hotelSlug}/room-facilities?p=${pageNumber.room}`,
        ),
      ]),
  });

  const handleSetPageNumber = useCallback(
    (type: PageNumber, action: PNAction) => {
      if (!data) return;

      const maxPageNumber = {
        room: data[1].data.total_pages,
        hotel: data[0]?.data.total_pages,
      };

      setPageNumber((prevValue) => ({
        ...prevValue,
        [type]:
          action === 'inc'
            ? prevValue[type] < maxPageNumber[type]
              ? prevValue[type] + 1
              : prevValue[type]
            : prevValue[type] > 1
              ? prevValue[type] - 1
              : prevValue[type],
      }));
    },
    [data],
  );

  return (
    <Section sectionID="facilities-services" className="relative">
      <TopBarConfig
        className="mb-2 md:mb-6"
        title={{ type: 'single', text: 'امکانات هتل' }}
      />

      {/* <MFacilities facilities={facilities} hotelName={hotelName} /> */}
      <DFacilities
        facilities={data}
        isPending={status === 'pending'}
        setPageNumber={handleSetPageNumber}
      />
    </Section>
  );
}

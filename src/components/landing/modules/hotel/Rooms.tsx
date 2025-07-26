'use client';

import { Room } from '@/types/landing';
import { TopBarConfig } from '../../shared';
import { Section } from './molecules/Section';
import { generalInstance } from '@/utils/services';

import { useDatePickerContext } from '@/context';
import RoomsArea from './molecules/rooms/RoomsArea';

import DateObject from 'react-date-object';
import { useEffect, useState } from 'react';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';

import persianCalendar from 'react-date-object/calendars/persian';
import persianLanguage from 'react-date-object/locales/persian_en';

import { useRouter, useSearchParams } from 'next/navigation';
import NumberOfRooms from './molecules/rooms/atoms/NumberOfRooms';
import NumberOfNights from '../../shared/search/molecules/NumberOfNights';
import { DDatePicker } from '@/components/landing/shared/search/date-picker';
import Passengers from '../../shared/search/molecules/passengers/Passengers';

type Props = {
  hotelSlug: string;
  hotelName: string;
};

type ApiResponse = {
  data: Room[];
};

const dateInfo = {
  calendar: persianCalendar,
  locale: persianLanguage,
};

// --------------------------------

export function Rooms(props: Props) {
  const { hotelName, hotelSlug } = props;

  const router = useRouter();
  const params = new URLSearchParams();
  const searchParams = useSearchParams();

  const { confirmedValue } = useDatePickerContext();

  const [queryOptions, setQueryOptions] = useState({
    startDate: '',
    endDate: '',
  });

  const query = `start_date=${queryOptions.startDate}&end_date=${queryOptions.endDate}`;

  const queryClient = useQueryClient();
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-rooms', query],
    enabled: Boolean(queryOptions.startDate && queryOptions.endDate),
    queryFn: () => generalInstance(`/hotel/hotels/${hotelSlug}/rooms?${query}`),
  });

  useEffect(() => {
    const startDate = searchParams.get('start-date');
    const endDate = searchParams.get('end-date');

    const defaultValues = {
      startDate: new DateObject({ ...dateInfo }).format('YYYY-MM-DD'),
      endDate: new DateObject({ ...dateInfo })
        .add(1, 'days')
        .format('YYYY-MM-DD'),
    };

    setQueryOptions({
      startDate: startDate || defaultValues.startDate,
      endDate: endDate || defaultValues.endDate,
    });
  }, [searchParams]);

  useEffect(() => {
    const startDate = searchParams.get('start-date');
    const endDate = searchParams.get('end-date');

    if (startDate && endDate) {
      if (!confirmedValue?.[0] && !confirmedValue?.[1]) return;

      params.set(
        'start-date',
        confirmedValue?.[0]
          .convert(dateInfo.calendar, dateInfo.locale)
          .format('YYYY-MM-DD'),
      );
      params.set(
        'end-date',
        confirmedValue?.[1]
          .convert(dateInfo.calendar, dateInfo.locale)
          .format('YYYY-MM-DD'),
      );
    } else {
      params.set('start-date', new DateObject(dateInfo).format('YYYY-MM-DD'));
      params.set(
        'end-date',
        new DateObject(dateInfo).add(1, 'days').format('YYYY-MM-DD'),
      );
    }

    router.push(`?${params.toString()}`, { scroll: false });
  }, [confirmedValue]);

  return (
    <Section sectionID="rooms">
      {/* === TopBar */}
      <div className="flex-between">
        <TopBarConfig
          title={{
            type: 'single',
            text: `${hotelName ? `اتاق های هتل ${hotelName}` : 'اتاق ها'}`,
          }}
        />

        <div className="lg:hidden">
          <NumberOfRooms NumberOfRooms={data?.data.length} />
        </div>
      </div>

      <div className="space-y-2 lg:space-y-10">
        {/* === Settings */}
        <div className="text-cs08 font-bold items-end grid-cols-[65%_auto] gap-4 hidden lg:grid">
          <div className="grid grid-cols-[1.6fr_1fr_1fr] gap-4">
            <DDatePicker sideOffset={15} triggerType="else" />
            <NumberOfNights type="else" />
            {/* <Passengers sideOffset={15} triggerType="else" /> */}
          </div>

          <div className="flex gap-4 mr-auto">
            <NumberOfRooms NumberOfRooms={data?.data.length} />
            <button
              className="bg-cs-red w-32 text-zinc-100 h-12 hidden lg:rounded-[10px] lg:block"
              onClick={() =>
                queryClient.invalidateQueries({ queryKey: ['hotel-rooms'] })
              }
            >
              جستجو اتاق
            </button>
          </div>
        </div>

        {/* <MDatePicker /> */}
        <RoomsArea data={data?.data} status={status} />
      </div>
    </Section>
  );
}

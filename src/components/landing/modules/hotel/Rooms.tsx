'use client';

import { useEffect, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import DateObject from 'react-date-object';
import persianCalendar from 'react-date-object/calendars/persian';
import persianLanguage from 'react-date-object/locales/persian_en';

import { Room } from '@/types/landing';
import { generalInstance } from '@/utils/services';
import {
  useDatePickerContext,
  usePassengersContext,
  useSearchContext,
} from '@/context';
import { Section } from './molecules/Section';
import { TopBarConfig } from '../../shared';
import RoomsArea from './molecules/rooms/RoomsArea';
import NumberOfRooms from './molecules/rooms/atoms/NumberOfRooms';
import NumberOfNights from '../../shared/search/molecules/NumberOfNights';
import { DDatePicker } from '@/components/landing/shared/search/date-picker';
import Passengers from '../../shared/search/passengers/Passengers';

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

// Utility functions
const getDefaultDates = () => ({
  startDate: new DateObject(dateInfo).format('YYYY-MM-DD'),
  endDate: new DateObject(dateInfo).add(1, 'days').format('YYYY-MM-DD'),
});

const buildQueryString = (options: {
  startDate: string;
  endDate: string;
  passengers: number;
  rooms: number;
}) =>
  `start_date=${options.startDate}&end_date=${options.endDate}&passenger_count=${options.passengers}&room_count=${options.rooms}`;

export function Rooms({ hotelName, hotelSlug }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { confirmedValue } = useDatePickerContext();
  const { confirmedPassengers } = usePassengersContext();
  const { triggerMobileSearch, resetMobileSearch } = useSearchContext();

  const [queryOptions, setQueryOptions] = useState({
    startDate: '',
    endDate: '',
    passengers: 1,
    rooms: 1,
  });
  const [shouldFetchMobile, setShouldFetchMobile] = useState(false);

  const queryString = useMemo(
    () => buildQueryString(queryOptions),
    [queryOptions],
  );

  const { data, status, error } = useQuery<ApiResponse>({
    queryKey: ['hotel-rooms', queryString],
    queryFn: () =>
      generalInstance(`/hotel/hotels/${hotelSlug}/rooms?${queryString}`),
    enabled:
      !!queryOptions.startDate &&
      !!queryOptions.endDate &&
      (window.innerWidth >= 1024 || shouldFetchMobile),
  });

  // Initialize query options from URL or defaults
  useEffect(() => {
    const passengers = searchParams.get('passengers');
    const startDate = searchParams.get('start-date');
    const endDate = searchParams.get('end-date');
    const rooms = searchParams.get('rooms');
    const defaults = getDefaultDates();

    setQueryOptions({
      startDate: startDate || defaults.startDate,
      endDate: endDate || defaults.endDate,
      passengers: Number(passengers) || 1,
      rooms: Number(rooms) || 1,
    });
  }, [searchParams]);

  // Update URL parameters and trigger fetch for desktop
  useEffect(() => {
    const params = new URLSearchParams();
    const defaults = getDefaultDates();

    params.set(
      'start-date',
      confirmedValue?.[0]
        ?.convert(dateInfo.calendar, dateInfo.locale)
        .format('YYYY-MM-DD') || defaults.startDate,
    );
    params.set(
      'end-date',
      confirmedValue?.[1]
        ?.convert(dateInfo.calendar, dateInfo.locale)
        .format('YYYY-MM-DD') || defaults.endDate,
    );
    params.set('passengers', confirmedPassengers.passengers.toString() || '1');
    params.set('rooms', confirmedPassengers.rooms.toString() || '1');

    router.push(`?${params.toString()}`, { scroll: false });

    // Auto-fetch on desktop
    if (window.innerWidth >= 1024) {
      queryClient.invalidateQueries({ queryKey: ['hotel-rooms'] });
    } else {
      resetMobileSearch(); // Reset mobile fetch state after search
    }
  }, [
    confirmedValue,
    confirmedPassengers,
    queryClient,
    router,
    resetMobileSearch,
  ]);

  // Trigger fetch on mobile when context changes
  useEffect(() => {
    if (
      window.innerWidth < 1024 &&
      queryOptions.startDate &&
      queryOptions.endDate
    ) {
      setShouldFetchMobile(true);
      queryClient.invalidateQueries({ queryKey: ['hotel-rooms'] });
    }
  }, [triggerMobileSearch, queryClient, queryOptions]);

  return (
    <Section sectionID="rooms">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <TopBarConfig
          title={{
            type: 'single',
            text: hotelName ? `اتاق‌های هتل ${hotelName}` : 'اتاق‌ها',
          }}
        />
        <div className="lg:hidden">
          <NumberOfRooms
            NumberOfRooms={status === 'success' ? data?.data.length : 0}
          />
        </div>
      </div>

      {/* Settings and Rooms */}
      <div className="space-y-4 lg:space-y-10">
        {/* Search Settings */}
        <div className="hidden lg:grid text-cs08 font-bold items-end grid-cols-[65%_auto] gap-4">
          <div className="grid grid-cols-[1.6fr_1fr_1fr] gap-4">
            <DDatePicker sideOffset={15} triggerType="else" />
            <NumberOfNights type="else" />
            <Passengers sideOffset={15} triggerType="else" />
          </div>

          <div className="flex gap-4 mr-auto">
            <NumberOfRooms
              NumberOfRooms={status === 'success' ? data?.data.length : 0}
            />
          </div>
        </div>

        <RoomsArea data={data?.data} status={status} />
      </div>
    </Section>
  );
}

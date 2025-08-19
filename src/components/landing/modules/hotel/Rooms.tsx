'use client';

import DateObject from 'react-date-object';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import persianCalendar from 'react-date-object/calendars/persian';
import persianLanguage from 'react-date-object/locales/persian_en';

import { Room } from '@/types/landing';
import { Section } from './molecules/Section';
import { generalInstance } from '@/utils/services';
import { RoomsContent } from './molecules/rooms/RoomsContent';
import { useDatePickerContext, usePassengersContext } from '@/context';

type Props = { hotelSlug: string };
type ApiResponse = { data: Room[] };

const dateInfo = {
  calendar: persianCalendar,
  locale: persianLanguage,
};

const getDefaultDates = () => ({
  startDate: new DateObject(dateInfo).format('YYYY-MM-DD'),
  endDate: new DateObject(dateInfo).add(1, 'days').format('YYYY-MM-DD'),
});

const buildQueryString = (options: {
  startDate: string;
  endDate: string;
  passengers: number;
  rooms: number;
}) => {
  return `start_date=${options.startDate}&end_date=${options.endDate}&passenger_count=${options.passengers}&room_count=${options.rooms}`;
};

export function Rooms({ hotelSlug }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { confirmedValue } = useDatePickerContext();
  const { confirmedPassengers } = usePassengersContext();

  const [queryOptions, setQueryOptions] = useState({
    startDate: '',
    endDate: '',
    passengers: 1,
    rooms: 1,
  });

  const queryString = useMemo(
    () => buildQueryString(queryOptions),
    [queryOptions],
  );

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-rooms', queryString],
    queryFn: () =>
      generalInstance(`/hotel/hotels/${hotelSlug}/rooms?${queryString}`),
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

  // Update URL parameters and trigger fetch
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
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
  }, [confirmedValue, confirmedPassengers, router]);

  return (
    <Section sectionID="rooms">
      <RoomsContent data={data?.data} status={status} />
    </Section>
  );
}

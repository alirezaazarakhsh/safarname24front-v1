'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

import persianCalendar from 'react-date-object/calendars/persian';
import persianLanguage from 'react-date-object/locales/persian_en';
import gregorianCalendar from 'react-date-object/calendars/gregorian';
import gregorianLanguage from 'react-date-object/locales/gregorian_en';

import { Room } from '@/types/landing';
import { Section } from './molecules/Section';
import { generalInstance } from '@/utils/services';
import { DateObject } from 'react-multi-date-picker';
import { RoomsContent } from './molecules/rooms/RoomsContent';
import { useDatePickerContext, usePassengersContext } from '@/context';

type Props = { hotelSlug: string };
type Rooms = { adults: number; children: number }[];

const dateInfo = {
  calendar: persianCalendar,
  locale: persianLanguage,
};

const buildQueryString = (options: {
  endDate: string;
  startDate: string;
  passengers: string;
}) => {
  return `start-date=${options.startDate}&end-date=${options.endDate}&passengers=${options.passengers}`;
};

export function Rooms({ hotelSlug }: Props) {
  const router = useRouter();

  const { confirmedValue: dates, calendarType } = useDatePickerContext();
  const { rooms, confirmedPassengers } = usePassengersContext();

  const [queryOptions, setQueryOptions] = useState({
    endDate: '',
    startDate: '',
    passengers: '',
  });

  const calendarDetail = {
    calendar: calendarType === 'persian' ? persianCalendar : gregorianCalendar,
    locale: calendarType === 'persian' ? persianLanguage : gregorianLanguage,
  };

  const queryString = useMemo(
    () => buildQueryString(queryOptions),
    [queryOptions],
  );

  const { data, status } = useQuery<{ data: Room[] }>({
    queryKey: ['hotel-rooms', queryString],
    queryFn: () =>
      generalInstance(`/hotel/hotels/${hotelSlug}/rooms?${queryString}`),
  });

  // === Update query-options & url
  useEffect(() => {
    const dateInfo = {
      locale: calendarDetail.locale,
      calendar: calendarDetail.calendar,
    };

    const startDate =
      dates?.[0]
        ?.convert(dateInfo.calendar, dateInfo.locale)
        .format('YYYY-MM-DD') || new DateObject(dateInfo).format('YYYY-MM-DD');

    const endDate =
      dates?.[1]
        ?.convert(dateInfo.calendar, dateInfo.locale)
        .format('YYYY-MM-DD') ||
      new DateObject(dateInfo).add(1, 'days').format('YYYY-MM-DD');

    let passengers;
    if (!confirmedPassengers.rooms) passengers = '0';
    else {
      passengers = rooms.map((item) => item.adults + item.children).toString();
    }

    setQueryOptions({
      endDate,
      startDate,
      passengers,
    });

    function encodeRooms(rooms: Rooms) {
      return rooms.map((r) => `${r.adults},${r.children}`).join('-');
    }

    router.push(
      `/best-hotels/${hotelSlug}?start-date=${startDate}&end-date=${endDate}${passengers === '0' ? '' : `&passengers=${encodeRooms(rooms)}`}`,
      {
        scroll: false,
      },
    );
  }, [dates, confirmedPassengers, router]);

  return (
    <Section sectionID="rooms">
      <RoomsContent data={data?.data} status={status} />
    </Section>
  );
}

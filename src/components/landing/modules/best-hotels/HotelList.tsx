'use client';

import { TopBarConfig } from '../../shared';
import { MHotelCard, DHotelCard } from './molecules/hotel-card';
import { useQuery } from '@tanstack/react-query';
import { generalInstance } from '@/utils/services';
import { Hotel } from '@/types/landing/best-hotels';
import {
  useDatePickerContext,
  useHotelOrCityContext,
  usePassengersContext,
} from '@/context';
import persianCalendar from 'react-date-object/calendars/persian';
import persianLanguage from 'react-date-object/locales/persian_en';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { DateObject } from 'react-multi-date-picker';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs';
import { Pagination } from './Pagination';
import { Skeleton } from '@/components/ui/skeleton';

const parseAsShowToggle = parseAsStringEnum(['show', 'hide']).withDefault(
  'hide',
);

type ApiResponse = {
  data: {
    count: number;
    results: Hotel[];
  };
};

type Rooms = { adults: number; children: number }[];

const dateInfo = {
  locale: persianLanguage,
  calendar: persianCalendar,
};

type Options = {
  page: string;
  star: string;
  city: string;
  endDate: string;
  province: string;
  startDate: string;
  passengers: string;
  residenceType: string;
  roomFacilities: string;
  hotelFacilities: string;
};

const buildQueryString = (options: Options) => {
  return `start-date=${options.startDate}&end-date=${options.endDate}&passengers=${options.passengers}&city=${options.city}&star=${options.star}&residence-type=${options.residenceType}&hotel-facilities=${options.hotelFacilities}&room-facilities=${options.roomFacilities}&page=${options.page}`;
};

// ------------------------------

export function HotelList() {
  const router = useRouter();

  const [
    {
      page,
      star,
      amazingHotels,
      residenceType,
      roomFacilities,
      suggestedHotels,
      hotelFacilities,
    },
  ] = useQueryStates({
    page: parseAsInteger,
    amazingHotels: parseAsShowToggle,
    suggestedHotels: parseAsShowToggle,
    star: parseAsArrayOf(parseAsInteger),
    residenceType: parseAsArrayOf(parseAsInteger),
    roomFacilities: parseAsArrayOf(parseAsInteger),
    hotelFacilities: parseAsArrayOf(parseAsInteger),
  });

  const { confirmedValue: dates } = useDatePickerContext();
  const { confirmedValue: hotelOrCity } = useHotelOrCityContext();
  const { rooms, confirmedPassengers: passengers } = usePassengersContext();

  const [queryOptions, setQueryOptions] = useState({
    city: '',
    star: '',
    page: '',
    endDate: '',
    province: '',
    startDate: '',
    passengers: '',
    residenceType: '',
    roomFacilities: '',
    hotelFacilities: '',
  });

  const queryString = useMemo(
    () => buildQueryString(queryOptions),
    [queryOptions],
  );

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-list', queryString],
    queryFn: () =>
      generalInstance(`/hotel/best-hotels/best-filter?${queryString}`),
  });

  // === Update query-options & url
  useEffect(() => {
    const startDate =
      dates?.[0]
        ?.convert(dateInfo.calendar, dateInfo.locale)
        .format('YYYY-MM-DD') || new DateObject(dateInfo).format('YYYY-MM-DD');

    const endDate =
      dates?.[1]
        ?.convert(dateInfo.calendar, dateInfo.locale)
        .format('YYYY-MM-DD') ||
      new DateObject(dateInfo).add(1, 'days').format('YYYY-MM-DD');

    let queryPassengers;
    if (!passengers.rooms) queryPassengers = '0';
    else {
      queryPassengers = rooms
        .map((item) => item.adults + item.children)
        .toString();
    }

    setQueryOptions({
      endDate,
      startDate,
      city: hotelOrCity.city,
      passengers: queryPassengers,
      star: star?.join(',') ?? '',
      page: page?.toString() ?? '1',
      province: hotelOrCity.province,
      residenceType: residenceType?.join(',') ?? '',
      roomFacilities: roomFacilities?.join(',') ?? '',
      hotelFacilities: hotelFacilities?.join(',') ?? '',
    });

    function encodeRooms(rooms: Rooms) {
      return rooms.map((r) => `${r.adults},${r.children}`).join('-');
    }

    if (hotelOrCity.hotel) return;
    else {
      router.push(
        `/best-hotels?start-date=${startDate}&end-date=${endDate}${hotelOrCity.city ? `&city=${hotelOrCity.city}` : ''}${hotelOrCity.province ? `&province=${hotelOrCity.province}` : ''}${star?.length ? `&star=${star.join(',')}` : ''}${!passengers.rooms ? '' : `&passengers=${encodeRooms(rooms)}`}${residenceType?.length ? `&residence-type=${residenceType.join(',')}` : ''}${page ? `&page=${page}` : ''}${suggestedHotels === 'show' ? `&suggested-hotels=${suggestedHotels}` : ''}${amazingHotels === 'show' ? `&amazing-hotels=${amazingHotels}` : ''}${hotelFacilities?.length ? `&hotel-facilities=${hotelFacilities.join(',')}` : ''}${roomFacilities?.length ? `&room-facilities=${roomFacilities.join(',')}` : ''}`,
        {
          scroll: true,
        },
      );
    }
  }, [
    star,
    page,
    dates,
    router,
    passengers,
    hotelOrCity,
    residenceType,
    roomFacilities,
    hotelFacilities,
  ]);

  return (
    <div>
      <TopBarConfig
        className="mb-3"
        title={{
          type: 'single',
          text: `هتل های شهر ${hotelOrCity.city ? hotelOrCity.city : 'های مختلف ایران'}`,
        }}
      />

      {/* === Small-Screen */}
      <div className="grid gap-6 md:grid-cols-2 xl:hidden">
        {status === 'pending'
          ? Array(8)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="h-[23.5rem] rounded-xl" />
              ))
          : data?.data.results.map((hotel, index) => (
              <MHotelCard key={index} {...hotel} />
            ))}
      </div>

      {/* === Large-Screen */}
      <div className="hidden gap-8 xl:grid">
        {status === 'pending'
          ? Array(8)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="h-[14rem] rounded-2xl" />
              ))
          : data?.data.results.map((hotel, index) => (
              <DHotelCard key={index} {...hotel} />
            ))}
      </div>

      <Pagination pageCount={data?.data.count} />
    </div>
  );
}

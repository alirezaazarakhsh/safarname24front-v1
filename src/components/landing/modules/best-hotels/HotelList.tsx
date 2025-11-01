'use client';

import {
  useHotelQuery,
  useDatePickerContext,
  usePassengersContext,
  useHotelOrCityContext,
} from '@/context';

import {
  options,
  getDates,
  ApiResponse,
  encodeRooms,
  buildQueryString,
  parseAsShowToggle,
} from './helpers/hotel-list';

import { HotelListContent } from './HotelListContent';

import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useQueryState, parseAsArrayOf, parseAsInteger } from 'nuqs';

// ------------------------------

export function HotelList() {
  const router = useRouter();
  const { handleSetQueryState } = useHotelQuery();

  const [page] = useQueryState('page', parseAsInteger);
  const [star] = useQueryState('star', parseAsArrayOf(parseAsInteger));

  const [amazingHotels] = useQueryState('amazing-hotels', parseAsShowToggle);
  const [suggestedHotels] = useQueryState(
    'suggested-hotels',
    parseAsShowToggle,
  );

  const [minPrice] = useQueryState('min-price', parseAsInteger.withDefault(0));
  const [maxPrice] = useQueryState('max-price', parseAsInteger.withDefault(0));

  const [residenceType] = useQueryState(
    'residence-type',
    parseAsArrayOf(parseAsInteger),
  );
  const [hotelFacilities] = useQueryState(
    'hotel-facilities',
    parseAsArrayOf(parseAsInteger),
  );
  const [roomFacilities] = useQueryState(
    'room-facilities',
    parseAsArrayOf(parseAsInteger),
  );

  const { confirmedValue: dates } = useDatePickerContext();
  const { confirmedValue: hotelOrCity } = useHotelOrCityContext();
  const { rooms, confirmedPassengers: passengers } = usePassengersContext();

  const [queryOptions, setQueryOptions] = useState(options);
  const queryString = useMemo(
    () => buildQueryString(queryOptions),
    [queryOptions],
  );

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-list', queryString],
    queryFn: () =>
      axiosInstance(`/hotel/best-hotels/best-filter?${queryString}`),
  });

  // === Update query-state context
  useEffect(() => {
    handleSetQueryState(
      status === 'pending',
      data?.data ? data?.data.results.length : null,
    );
  }, [data]);

  // === Update query-options & url
  useEffect(() => {
    const { startDate, endDate } = getDates(dates);
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
      minPrice: minPrice ? minPrice.toString() : '',
      maxPrice: maxPrice ? maxPrice.toString() : '',
      residenceType: residenceType?.join(',') ?? '',
      roomFacilities: roomFacilities?.join(',') ?? '',
      hotelFacilities: hotelFacilities?.join(',') ?? '',
    });

    router.replace(
      `/best-hotels?${startDate ? `&start-date=${startDate}` : ''}${endDate ? `&end-date=${endDate}` : ''}${hotelOrCity.city ? `&city=${hotelOrCity.city}` : ''}${hotelOrCity.province ? `&province=${hotelOrCity.province}` : ''}${star?.length ? `&star=${star.join(',')}` : ''}${minPrice ? `&min-price=${minPrice}` : ''}${maxPrice ? `&max-price=${maxPrice}` : ''}${!passengers.rooms ? '' : `&passengers=${encodeRooms(rooms)}`}${residenceType?.length ? `&residence-type=${residenceType.join(',')}` : ''}${page ? `&page=${page}` : ''}${suggestedHotels === 'show' ? `&suggested-hotels=${suggestedHotels}` : ''}${amazingHotels === 'show' ? `&amazing-hotels=${amazingHotels}` : ''}${hotelFacilities?.length ? `&hotel-facilities=${hotelFacilities.join(',')}` : ''}${roomFacilities?.length ? `&room-facilities=${roomFacilities.join(',')}` : ''}`,
      { scroll: true },
    );
  }, [
    star,
    page,
    dates,
    router,
    minPrice,
    maxPrice,
    passengers,
    hotelOrCity,
    residenceType,
    amazingHotels,
    roomFacilities,
    suggestedHotels,
    hotelFacilities,
  ]);

  return (
    <HotelListContent
      status={status}
      city={hotelOrCity.city}
      data={data?.data.results}
      totalPages={data?.data.results.length ? data?.data.total_pages : 0}
    />
  );
}

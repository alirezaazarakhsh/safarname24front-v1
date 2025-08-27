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

import { TopBarConfig } from '../../shared';
import { generalInstance } from '@/utils/services';
import { MHotelCard, DHotelCard } from './molecules/hotel-card';

import { Pagination } from './Pagination';
import { Skeleton } from '@/components/ui/skeleton';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useQueryState, parseAsArrayOf, parseAsInteger } from 'nuqs';

// ------------------------------

export function HotelList() {
  const router = useRouter();
  const { handleSetQueryState } = useHotelQuery();
  const [isFirstRender, setIsFirstRender] = useState(true);

  const [page] = useQueryState('page', parseAsInteger);
  const [star] = useQueryState('star', parseAsArrayOf(parseAsInteger));

  const [amazingHotels] = useQueryState('amazing-hotels', parseAsShowToggle);
  const [suggestedHotels] = useQueryState(
    'suggested-hotels',
    parseAsShowToggle,
  );

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
      generalInstance(`/hotel/best-hotels/best-filter?${queryString}`),
  });

  console.log(data?.data);
  // console.log(queryOptions);
  // console.log(isFirstRender);

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
      residenceType: residenceType?.join(',') ?? '',
      roomFacilities: roomFacilities?.join(',') ?? '',
      hotelFacilities: hotelFacilities?.join(',') ?? '',
    });

    if (!isFirstRender) {
      router.push(
        `/best-hotels?${startDate ? `&start-date=${startDate}` : ''}${endDate ? `&end-date=${endDate}` : ''}${hotelOrCity.city ? `&city=${hotelOrCity.city}` : ''}${hotelOrCity.province ? `&province=${hotelOrCity.province}` : ''}${star?.length ? `&star=${star.join(',')}` : ''}${!passengers.rooms ? '' : `&passengers=${encodeRooms(rooms)}`}${residenceType?.length ? `&residence-type=${residenceType.join(',')}` : ''}${page ? `&page=${page}` : ''}${suggestedHotels === 'show' ? `&suggested-hotels=${suggestedHotels}` : ''}${amazingHotels === 'show' ? `&amazing-hotels=${amazingHotels}` : ''}${hotelFacilities?.length ? `&hotel-facilities=${hotelFacilities.join(',')}` : ''}${roomFacilities?.length ? `&room-facilities=${roomFacilities.join(',')}` : ''}`,
        { scroll: true },
      );
    } else setIsFirstRender(false);
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

      <Pagination pageCount={data?.data.total_pages} />
    </div>
  );
}

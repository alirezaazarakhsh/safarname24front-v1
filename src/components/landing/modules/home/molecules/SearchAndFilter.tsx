import {
  useDatePickerContext,
  useHotelOrCityContext,
  usePassengersContext,
} from '@/context';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import NumberOfNights from '@/components/landing/shared/search/NumberOfNights';
import Passengers from '@/components/landing/shared/search/passengers/Passengers';
import CityOrHotel from '@/components/landing/shared/search/city-hotel/CityOrHotel';
import { DDatePicker } from '@/components/landing/shared/search/date-picker/DDatePicker';

import persianCalendar from 'react-date-object/calendars/persian';
import persianLanguage from 'react-date-object/locales/persian_en';

const dateInfo = {
  calendar: persianCalendar,
  locale: persianLanguage,
};

// -----------------------------------

export default function SearchAndFilter() {
  const router = useRouter();
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { confirmedValue: dates } = useDatePickerContext();
  const { confirmedValue: cityOrHotel } = useHotelOrCityContext();
  const { confirmedPassengers: passengers } = usePassengersContext();

  function handleClickSearch() {
    const stopCondition = !cityOrHotel.city || !dates?.[0] || !dates?.[1];
    if (stopCondition) {
      setError(true);
      return;
    }

    setLoading(true);
    const params = new URLSearchParams();

    params.set(
      'start-date',
      dates?.[0]
        ?.convert(dateInfo.calendar, dateInfo.locale)
        .format('YYYY-MM-DD'),
    );
    params.set(
      'end-date',
      dates?.[1]
        ?.convert(dateInfo.calendar, dateInfo.locale)
        .format('YYYY-MM-DD'),
    );

    params.set('passengers', passengers.passengers.toString());
    params.set('rooms', passengers.rooms.toString());

    if (cityOrHotel.hotel) {
      router.push(
        `/best-hotels/${cityOrHotel.hotelSlug}/?${params.toString()}`,
        { scroll: true },
      );
    }
    // ---
    else {
      params.set('city', cityOrHotel.city);
      params.set('province', cityOrHotel.province);
      router.push(`/best-hotels/?${params.toString()}`, { scroll: true });
    }
  }

  // === Setting Error-State
  useEffect(() => {
    if (cityOrHotel.city) setError(false);
  }, [cityOrHotel]);

  return (
    <div className="absolute z-10 bottom-6 inset-x-6 bg-[--clr-main-light] h-32 px-8 flex items-center gap-6 rounded-2xl xl:bottom-10 xl:inset-x-24 xl:gap-8">
      <CityOrHotel
        scrollBehavior
        sideOffset={50}
        alignOffset={-30}
        triggerType="home"
        scrollPosition={300}
      />

      <span className="w-[2px] h-6 bg-zinc-300 rounded"></span>

      <DDatePicker
        scrollBehavior
        sideOffset={50}
        alignOffset={-30}
        triggerType="home"
        scrollPosition={300}
      />

      <span className="w-[2px] h-6 bg-zinc-300 rounded"></span>

      <NumberOfNights type="home" />

      <span className="w-[2px] h-6 bg-zinc-300 rounded"></span>

      <Passengers
        scrollBehavior
        sideOffset={50}
        alignOffset={-30}
        triggerType="home"
        scrollPosition={300}
      />

      <button
        className="w-36 h-14 bg-cs-red text-zinc-100 text-cs08 font-bold mr-auto flex-center rounded-cs-10"
        onClick={handleClickSearch}
      >
        {isLoading ? <div className="loader-dots" /> : <span>جستجو</span>}
      </button>

      <div
        className={`absolute right-0 bg-[--clr-main-light] h-8 px-8 flex items-end rounded-t-xl transition-all ease-in-out duration-200 ${isError ? '-top-4' : 'top-0'}`}
      >
        <span
          className={`text-cs-red text-cs75 font-semibold transition-all ease-in-out duration-200 ${isError ? 'opacity-100' : 'opacity-0'}`}
        >
          * انتخاب شهر یا هتل مقصد اجباری است
        </span>
      </div>
    </div>
  );
}

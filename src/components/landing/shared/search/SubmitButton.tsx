import {
  useDatePickerContext,
  usePassengersContext,
  useHotelOrCityContext,
} from '@/context';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import persianCalendar from 'react-date-object/calendars/persian';
import persianLanguage from 'react-date-object/locales/persian_en';

const dateInfo = {
  calendar: persianCalendar,
  locale: persianLanguage,
};

type Props = { handleClose: () => void };

// -----------------------------

export default function SubmitButton(props: Props) {
  const { handleClose } = props;

  const router = useRouter();
  const pathname = usePathname();

  const isHotelDetailPage = pathname.startsWith('/best-hotels/');

  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { confirmedValue: dates } = useDatePickerContext();
  const { confirmedValue: cityOrHotel } = useHotelOrCityContext();
  const { confirmedPassengers: passengers } = usePassengersContext();

  function handleSubmit() {
    if (!isHotelDetailPage) {
      const stopCondition =
        !dates?.[0] ||
        !dates?.[1] ||
        !passengers.rooms ||
        !cityOrHotel.city ||
        !passengers.passengers;

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
        router.replace(
          `/best-hotels/${cityOrHotel.hotelSlug}/?${params.toString()}`,
          { scroll: true },
        );
      }
      // ---
      else {
        params.set('city', cityOrHotel.city);
        params.set('province', cityOrHotel.province);
        router.replace(`/best-hotels/?${params.toString()}`, { scroll: true });
      }
    }

    handleClose();
  }

  // === Setting Error-State
  useEffect(() => {
    if (
      dates?.[0] &&
      dates?.[1] &&
      passengers.rooms &&
      cityOrHotel.city &&
      passengers.passengers
    )
      setError(false);
  }, [cityOrHotel, passengers, dates]);

  return (
    <button
      onClick={handleSubmit}
      className={`text-white text-cs85 font-semibold h-12 mt-auto flex-center rounded-cs-10 transition-colors duration-200 ease-in-out ${!isHotelDetailPage && isError ? 'bg-cs-red' : 'bg-cs-dark-blue'}`}
    >
      {isLoading ? (
        <div className="loader-dots" />
      ) : isHotelDetailPage ? (
        'مشاهده اتاق ها'
      ) : isError ? (
        'فیلتر های جستجو خالی میباشد !'
      ) : (
        'جستجو شهر یا هتل مقصد'
      )}
    </button>
  );
}

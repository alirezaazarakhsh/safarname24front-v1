import { weekDays } from '@/constants/landing';
import { DateObject } from 'react-multi-date-picker';

import persianCalendar from 'react-date-object/calendars/persian';
import persianLanguage from 'react-date-object/locales/persian_fa';
import persianEnLanguage from 'react-date-object/locales/persian_en';
import gregorianCalendar from 'react-date-object/calendars/gregorian';
import gregorianLanguage from 'react-date-object/locales/gregorian_en';

// --------------------------------

type CalendarType = 'persian' | 'gregorian';
type DefaultRange = Array<DateObject> | undefined;

// --------------------------------

const dateInfo = {
  calendar: persianCalendar,
  locale: persianEnLanguage,
};

function getCalendarDetail(calendarType: CalendarType) {
  return {
    calendar: calendarType === 'persian' ? persianCalendar : gregorianCalendar,
    locale: calendarType === 'persian' ? persianLanguage : gregorianLanguage,
    weekendDays: calendarType === 'persian' ? [6] : [0],
    weekDays:
      calendarType === 'persian' ? weekDays.persian : weekDays.gregorian,
  };
}

function handleSetDatepicker(
  dispatchAll: (defaultRange: DefaultRange) => void,
) {
  const params = new URLSearchParams(window.location.search);
  const startDate = params.get('start-date');
  const endDate = params.get('end-date');

  const calendarType =
    (sessionStorage.getItem('calendar-type') as CalendarType) || 'persian';

  const calendarDetail = getCalendarDetail(calendarType);

  let defaultRange: DefaultRange;
  const dateInfo = {
    locale: calendarDetail.locale,
    calendar: calendarDetail.calendar,
  };

  if (startDate && endDate) {
    defaultRange = [
      new DateObject({
        ...dateInfo,
        date: startDate.replaceAll('-', '/'),
      }),

      new DateObject({
        ...dateInfo,
        date: endDate.replaceAll('-', '/'),
      }),
    ];
  }
  // ===
  else {
    if (window.location.pathname !== '/') {
      defaultRange = [
        new DateObject(dateInfo),
        new DateObject(dateInfo).add(1, 'days'),
      ];
    }
  }

  dispatchAll(defaultRange);
}

// --------------------------------

export type { DefaultRange, CalendarType };
export { dateInfo, getCalendarDetail, handleSetDatepicker };

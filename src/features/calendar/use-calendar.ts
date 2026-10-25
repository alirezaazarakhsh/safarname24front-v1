import { useState, useCallback } from 'react';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import { CalendarType } from './types';
import { calculateNights } from './helpers';

export const useCalendar = (
  initialRange?: [DateObject | null, DateObject | null],
  onChangeCallback?: (data: {
    startDate: DateObject | null;
    endDate: DateObject | null;
    nights: number;
  }) => void,
) => {
  const [calendarType, setCalendarType] = useState<CalendarType>('persian');
  const [selectedDates, setSelectedDates] = useState<DateObject[]>(
    initialRange ? (initialRange.filter(Boolean) as DateObject[]) : [],
  );
  // استیت موقت مخصوص نسخه موبایل
  const [tempMobileDates, setTempMobileDates] = useState<DateObject[]>([]);

  // تغییر نوع تقویم
  const toggleCalendarType = useCallback(() => {
    setCalendarType((prev) => (prev === 'persian' ? 'gregorian' : 'persian'));
  }, []);

  // هندلر دسکتاپ: با انتخاب تاریخ دوم بلافاصله استیت بیرونی ست می‌شود
  const handleDesktopChange = (dates: DateObject[]) => {
    setSelectedDates(dates);

    if (dates.length === 2 && onChangeCallback) {
      const nights = calculateNights(dates[0], dates[1]);
      onChangeCallback({
        startDate: dates[0],
        endDate: dates[1],
        nights,
      });
    }
  };

  // پاک کردن تاریخ‌ها
  const handleClear = () => {
    setSelectedDates([]);
    setTempMobileDates([]);
    if (onChangeCallback) {
      onChangeCallback({ startDate: null, endDate: null, nights: 0 });
    }
  };

  // تایید نهایی در موبایل
  const handleMobileConfirm = () => {
    setSelectedDates(tempMobileDates);
    if (onChangeCallback && tempMobileDates.length > 0) {
      const startDate = tempMobileDates[0];
      const endDate = tempMobileDates[1] || null;
      const nights = calculateNights(startDate, endDate);

      onChangeCallback({ startDate, endDate, nights });
    }
  };

  return {
    calendarType,
    toggleCalendarType,
    selectedDates,
    tempMobileDates,
    setTempMobileDates,
    handleDesktopChange,
    handleMobileConfirm,
    handleClear,
    currentCalendar: calendarType === 'persian' ? persian : gregorian,
    currentLocale: calendarType === 'persian' ? persian_fa : gregorian_en,
  };
};

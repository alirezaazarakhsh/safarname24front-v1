import { useState, useCallback, useMemo } from 'react';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import { CalendarType } from './types';
import { calculateNights } from './helpers';

export type DateRange = [DateObject | null, DateObject | null];

// ------------------------------

export const useCalendar = (
  initialRange?: DateRange,
  onChange?: (dates: DateRange) => void,
) => {
  const [calendarType, setCalendarType] = useState<CalendarType>('persian');

  // استیت قطعی و تایید شده
  const [selectedDates, setSelectedDates] = useState<DateObject[]>(() =>
    initialRange ? (initialRange.filter(Boolean) as DateObject[]) : [],
  );

  // استیت پیش‌نویس (Draft)
  const [draftDates, setDraftDates] = useState<DateObject[]>(() =>
    initialRange ? (initialRange.filter(Boolean) as DateObject[]) : [],
  );

  // سوییچ شمسی / میلادی
  const toggleCalendarType = useCallback(() => {
    setCalendarType((prev) => (prev === 'persian' ? 'gregorian' : 'persian'));
  }, []);

  // فقط برای استفاده نمایشی در دکمه دراور موبایل (اختیاری)
  const draftNights = useMemo(() => {
    if (draftDates.length < 2) return 0;
    return calculateNights(draftDates[0], draftDates[1]);
  }, [draftDates]);

  // ثبت قطعی و ارسال آرایه به والد
  const commitDates = useCallback(
    (datesToCommit: DateObject[]) => {
      setSelectedDates(datesToCommit);

      if (!onChange) return;

      const startDate = datesToCommit[0] || null;
      const endDate = datesToCommit[1] || null;

      // خروجی تمیز و استاندارد به صورت آرایه
      onChange([startDate, endDate]);
    },
    [onChange],
  );

  // انتخاب تاریخ
  const handleSelectDates = useCallback(
    (dates: DateObject[], autoCommit = false) => {
      setDraftDates(dates);

      if (autoCommit && dates.length === 2) {
        commitDates(dates);
      }
    },
    [commitDates],
  );

  // تایید دستی دراور موبایل
  const confirmDraft = useCallback(() => {
    commitDates(draftDates);
  }, [commitDates, draftDates]);

  // ریست کردن به حالت قبل در صورت بستن دراور
  const resetDraft = useCallback(() => {
    setDraftDates(selectedDates);
  }, [selectedDates]);

  // پاک کردن
  const handleClear = useCallback(() => {
    setDraftDates([]);
    setSelectedDates([]);
    if (onChange) {
      onChange([null, null]);
    }
  }, [onChange]);

  return {
    calendarType,
    toggleCalendarType,
    // استیت‌ها
    selectedDates,
    draftDates,
    draftNights,
    // متدها
    handleSelectDates,
    confirmDraft,
    resetDraft,
    handleClear,
    // زبان و تقویم
    currentCalendar: calendarType === 'persian' ? persian : gregorian,
    currentLocale: calendarType === 'persian' ? persian_fa : gregorian_en,
  };
};

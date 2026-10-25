import DateObject from 'react-date-object';

// محاسبه تعداد شب‌های اقامت
export const calculateNights = (
  start: DateObject | null,
  end: DateObject | null,
): number => {
  if (!start || !end) return 0;
  const startMs = start.toUnix() * 1000;
  const endMs = end.toUnix() * 1000;
  const diffTime = Math.abs(endMs - startMs);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// تشخیص جمعه یا یکشنبه بر اساس تقویم
export const isWeekendDay = (
  date: DateObject,
  calendarType: 'persian' | 'gregorian',
): boolean => {
  if (calendarType === 'persian') {
    // در شمسی، جمعه تعطیل است (index = 6 در react-date-object)
    return date.weekDay.index === 6;
  } else {
    // در میلادی، یکشنبه تعطیل هفتگی است
    return date.weekDay.index === 0;
  }
};

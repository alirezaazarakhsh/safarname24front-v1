// features/calendar/ui/molecules/check-in-out-bar.tsx

import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import { CalendarType } from '../../model/types';
import { Moon } from 'lucide-react';

type Props = {
  startDate: DateObject | null;
  endDate: DateObject | null;
  nights?: number;
  calendarType: CalendarType;
  className?: string;
};

export default function CheckInOutBar({
  startDate,
  endDate,
  nights = 0,
  calendarType,
  className = '',
}: Props) {
  const isPersian = calendarType === 'persian';

  // تابع فرمت هوشمند با تبدیل خودکار تقویم
  const formatDate = (date: DateObject | null) => {
    if (!date) return null;

    // ۱. تقویم و لوکال مقصد بر اساس سوییچ فعال
    const targetCalendar = isPersian ? persian : gregorian;
    const targetLocale = isPersian ? persian_fa : gregorian_en;

    // ۲. کپی کردن تاریخ و تبدیل آن به تقویم مقصد
    const convertedDate = new DateObject(date).convert(
      targetCalendar,
      targetLocale,
    );

    // ۳. فرمت خروجی
    if (isPersian) {
      return convertedDate.format('dddd DD MMMM'); // مثلاً: «چهارشنبه ۱۴ آبان»
    }

    return convertedDate.format('ddd, DD MMM'); // مثلاً: «Wed, 04 Nov»
  };

  const isSelectingCheckout = startDate && !endDate;

  return (
    <div
      className={`bg-secondary/80 relative grid h-15 grid-cols-2 rounded-xl border text-center transition-all divide-x-reverse sm:flex sm:h-auto sm:items-center sm:gap-4 sm:border-none sm:bg-transparent sm:text-start ${className}`}
    >
      {/* باکس تاریخ ورود */}
      <div
        className={`flex flex-col items-center justify-center gap-1.5 rounded-s-xl transition-colors sm:flex-row sm:gap-2 sm:rounded-none sm:border-none ${
          !startDate ? 'border-2 sm:border-none' : ''
        }`}
      >
        <div className="text-muted-foreground flex-center gap-0.5 text-xs font-medium sm:text-sm">
          <span>تاریخ ورود</span>
          <span className="hidden sm:block">:</span>
        </div>

        <span className="text-primary text-sm font-bold">
          {formatDate(startDate) ?? 'انتخاب کنید'}
        </span>
      </div>

      {/* بج شب‌های اقامت */}
      {nights > 0 && (
        <div className="bg-primary absolute top-1.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full px-2 py-1 sm:static sm:translate-x-0 sm:px-2.5">
          <Moon className="size-3 fill-amber-500 text-amber-500" />

          <span className="text-primary-foreground text-xs font-bold whitespace-nowrap">
            {nights} شب
          </span>
        </div>
      )}

      {/* باکس تاریخ خروج */}
      <div
        className={`flex flex-col items-center justify-center gap-1.5 rounded-e-xl transition-colors sm:flex-row sm:gap-2 sm:rounded-none sm:border-none ${
          isSelectingCheckout ? 'border-2 sm:border-none' : ''
        }`}
      >
        <div className="text-muted-foreground flex-center gap-0.5 text-xs font-medium sm:text-sm">
          <span>تاریخ خروج</span>
          <span className="hidden sm:block">:</span>
        </div>

        <span
          className={`text-sm font-bold ${
            endDate
              ? 'text-primary'
              : isSelectingCheckout
                ? 'text-primary animate-pulse'
                : 'text-muted-foreground'
          }`}
        >
          {formatDate(endDate) ??
            (isSelectingCheckout ? 'انتخاب خروج ...' : '---')}
        </span>
      </div>
    </div>
  );
}

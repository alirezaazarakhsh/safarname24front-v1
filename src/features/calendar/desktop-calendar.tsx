import React from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import { CalendarType } from './types';
import { isWeekendDay } from './helpers';
import CalendarTrigger from './calendar-trigger';

interface DesktopCalendarProps {
  calendarType: CalendarType;
  toggleCalendarType: () => void;
  selectedDates: DateObject[];
  onDatesChange: (dates: DateObject[]) => void;
  onClear: () => void;
  calendar: any;
  locale: any;
}

export const DesktopCalendar: React.FC<DesktopCalendarProps> = ({
  calendarType,
  toggleCalendarType,
  selectedDates,
  onDatesChange,
  onClear,
  calendar,
  locale,
}) => {
  return (
    <div
      className="hidden w-[720px] flex-col rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl select-none md:flex"
      dir="rtl"
    >
      {/* تقویم ۲ ماهه ری‌اکت */}
      <div className="calendar-desktop-wrapper">
        <Calendar
          range
          rangeHover
          numberOfMonths={2}
          value={selectedDates}
          onChange={onDatesChange}
          calendar={calendar}
          locale={locale}
          className="custom-hotel-theme"
          mapDays={({ date, isSameDate, selectedDate }) => {
            const isWeekend = isWeekendDay(date, calendarType);
            const props: any = {};

            // اعمال رنگ قرمز روی تعطیلات
            if (isWeekend) {
              props.className = 'text-rose-500 font-semibold';
            }
            return props;
          }}
        />
      </div>

      {/* نوار اکشن پایین دسکتاپ */}
      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
        <button
          onClick={onClear}
          type="button"
          className="rounded-xl bg-[#E61937] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#c9122c] active:scale-95"
        >
          پاک کردن
        </button>

        <button
          onClick={toggleCalendarType}
          type="button"
          className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-800 transition-all hover:bg-gray-50 active:scale-95"
        >
          {calendarType === 'persian'
            ? 'تبدیل به تقویم میلادی'
            : 'تبدیل به تقویم شمسی'}
        </button>
      </div>
    </div>
  );
};

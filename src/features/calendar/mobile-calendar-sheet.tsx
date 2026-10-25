import React from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import { CalendarType } from './types';
import { calculateNights, isWeekendDay } from './helpers';

interface MobileCalendarSheetProps {
  isOpen: boolean;
  onClose: () => void;
  calendarType: CalendarType;
  toggleCalendarType: () => void;
  tempDates: DateObject[];
  onTempDatesChange: (dates: DateObject[]) => void;
  onConfirm: () => void;
  calendar: any;
  locale: any;
}

export const MobileCalendarSheet: React.FC<MobileCalendarSheetProps> = ({
  isOpen,
  onClose,
  calendarType,
  toggleCalendarType,
  tempDates,
  onTempDatesChange,
  onConfirm,
  calendar,
  locale,
}) => {
  if (!isOpen) return null;

  const nights =
    tempDates.length === 2 ? calculateNights(tempDates[0], tempDates[1]) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm md:hidden">
      {/* بدنه Bottom Sheet */}
      <div
        className="animate-in slide-in-from-bottom flex max-h-[90vh] w-full flex-col overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl duration-200"
        dir="rtl"
      >
        {/* دستگیره Sheet */}
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-300" />

        {/* دکمه تبدیل تقویم */}
        <div className="flex justify-end pb-3">
          <button
            onClick={toggleCalendarType}
            type="button"
            className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 active:bg-gray-100"
          >
            {calendarType === 'persian'
              ? 'تبدیل به تقویم میلادی'
              : 'تبدیل به تقویم شمسی'}
          </button>
        </div>

        <div className="mb-4 w-full border-b border-dashed border-gray-300" />

        {/* تقویم تک ماهه */}
        <div className="mobile-calendar-wrapper flex justify-center">
          <Calendar
            range
            rangeHover
            numberOfMonths={1}
            value={tempDates}
            onChange={onTempDatesChange}
            calendar={calendar}
            locale={locale}
            className="custom-hotel-theme mobile-view"
            mapDays={({ date }) => {
              if (isWeekendDay(date, calendarType)) {
                return { className: 'text-rose-500 font-semibold' };
              }
            }}
          />
        </div>

        {/* دکمه تایید رزرو */}
        <div className="mt-6 pt-3">
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full rounded-xl bg-[#181A20] py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-black active:scale-[0.98]"
          >
            {nights > 0 ? `تایید، ${nights} شب اقامت` : 'تایید و ادامه فرآیند'}
          </button>
        </div>
      </div>
    </div>
  );
};

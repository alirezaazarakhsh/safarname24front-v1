// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { DatePickerComponentPropsType } from '@/types/dashboard/component';
import { handleZeroBeforeNumber } from '@/utils/string';
import { cn } from '@/utils/utils';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import moment from 'jalali-moment';

// Creating and exporting DatePicker component as default
export default function DatePicker({
  closeFn,
  isOpened,
  className,
  onSubmit,
  disableFuture = false,
  disablePast = false,
}: DatePickerComponentPropsType): ReactNode {
  // Defining hooks
  const [currentMonth, setCurrentMonth] = useState<moment.Moment>(moment());
  const [useJalali, setUseJalali] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<moment.Moment | undefined>(undefined);

  // Defining variables
  const today = moment();
  const jalaliToday = moment().locale('fa');
  const weekDayNamesJalali = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
  const weekDayNamesGregorian = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Current month helpers
  const startOfCurrentMonth = currentMonth
    .clone()
    .startOf(useJalali ? 'jMonth' : 'month');
  const daysInCurrentMonth = useJalali
    ? currentMonth.jDaysInMonth()
    : currentMonth.daysInMonth();

  // Build days array for current month
  const daysToRender: moment.Moment[] = Array.from(
    { length: daysInCurrentMonth },
    (_, i) => startOfCurrentMonth.clone().add(i, 'day'),
  );

  // First weekday offset (0 = Saturday in Jalali, 0 = Sunday in Gregorian)
  const firstDayOffset = startOfCurrentMonth.day();
  // Toggle Jalali to Gregorian
  const toggleCalendar = () => {
    setUseJalali(prev => {
      const newMode = !prev;
      // Keep the same approximate date when switching
      const newMonth = newMode
        ? currentMonth.clone().locale('fa')
        : currentMonth.clone().locale('en');
      setCurrentMonth(newMonth);
      return newMode;
    });
  };
  // Month navigation (always uses Jalali months when in Jalali mode)
  const handleMonthChange = (direction: 'previous' | 'next') => {
    setCurrentMonth(prev =>
      direction === 'previous'
        ? prev.clone().subtract(1, useJalali ? 'jMonth' : 'month')
        : prev.clone().add(1, useJalali ? 'jMonth' : 'month'),
    );
  };

  // Check state of a day
  const getDayState = (
    day: moment.Moment,
  ): {
    role: 'passed' | 'future' | 'today' | 'selected' | 'normal';
    disabled: boolean;
  } => {
    const isSelected = selectedDate?.isSame(day, 'day');
    const isToday = useJalali
      ? day.isSame(jalaliToday, 'day')
      : day.isSame(today, 'day');
    const isPast = useJalali
      ? day.isBefore(jalaliToday, 'day')
      : day.isBefore(today, 'day');

    const isFuture = useJalali
      ? day.isAfter(jalaliToday, 'day')
      : day.isAfter(today, 'day');

    const disabled =
      (disablePast && isPast) ||
      (disableFuture && isFuture) ||
      (disablePast && disableFuture && !isToday); // edge case: both true

    let role: 'passed' | 'future' | 'today' | 'selected' | 'normal' = 'normal';

    if (isToday) role = 'today';
    else if (isSelected) role = 'selected';
    else if (isPast) role = 'passed';
    else if (isFuture) role = 'future';
    return { role, disabled };
  };

  // Disable body scroll when opened
  useEffect(() => {
    document.body.style.overflow = isOpened ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpened]);

  // Returning JSX
  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-500 data-[opened=true]:opacity-100 data-[opened=false]:opacity-0 data-[opened=false]:pointer-events-none data-[opened=true]:pointer-events-auto"
        data-opened={isOpened}
        onClick={closeFn}
      />
      <div
        data-opened={isOpened}
        className={cn(
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[300px] max-h-[85dvh] overflow-y-auto rounded-xl bg-white p-5 shadow-2xl transition-all duration-500',
          'data-[opened=true]:scale-100 data-[opened=true]:opacity-100 data-[opened=true]:visible',
          'data-[opened=false]:scale-95 data-[opened=false]:opacity-0 data-[opened=false]:invisible',
          className,
        )}
      >
        <div className="mb-4 flex items-center justify-between gap-10">
          <button onClick={() => handleMonthChange('previous')}>
            <div className="flex size-8 items-center justify-center rounded-md bg-gray-100">
              <IconsaxIcons name="ArrowRight2" className="size-4" />
            </div>
          </button>
          <span className="truncate text-center text-cs08 font-medium">
            {useJalali
              ? currentMonth.locale('fa').format('jMMMM jYYYY')
              : currentMonth.format('MMMM YYYY')}
          </span>
          <button onClick={() => handleMonthChange('next')}>
            <div className="flex size-8 items-center justify-center rounded-md bg-gray-100">
              <IconsaxIcons name="ArrowLeft2" className="size-4" />
            </div>
          </button>
        </div>
        <div className="mb-3 grid grid-cols-7 gap-2">
          {(useJalali ? weekDayNamesJalali : weekDayNamesGregorian).map((day, i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-md bg-gray-100 text-cs06 font-medium"
            >
              {day}
            </div>
          ))}
          {Array.from({ length: firstDayOffset }, (_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {daysToRender.map((day, index) => {
            const { role, disabled } = getDayState(day);
            const dayNumber = useJalali ? day.jDate() : day.date();
            return (
              <button
                key={index}
                disabled={disabled}
                onClick={() => !disabled && setSelectedDate(day.clone())}
                data-state={role}
                className={cn(
                  'aspect-square rounded-md !text-cs07 !font-normal transition-all data-[state=normal]:text-black',
                  disabled ? 'cursor-not-allowed text-gray-300' : 'cursor-pointer hover:bg-gray-100',
                  'data-[state=today]:bg-black data-[state=today]:text-white',
                  'data-[state=selected]:bg-cs-red data-[state=selected]:text-white',
                  !disablePast ? 'data-[state=passed]:text-black' : 'data-[state=passed]:text-black/50',
                  !disableFuture ? 'data-[state=future]:text-black' : 'data-[state=future]:text-black/50',
                  !useJalali && "font-inter"
                )}
              >
                {handleZeroBeforeNumber(dayNumber.toString())}
              </button>
            );
          })}
        </div>
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleCalendar}
            className="size-10 rounded-lg border text-black"
          >
            <IconsaxIcons name="LanguageCircle" className="size-6" color='currentColor' />
          </Button>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="icon"
              disabled={!selectedDate}
              onClick={() => setSelectedDate(undefined)}
              className="size-10 rounded-lg text-black"
            >
              <IconsaxIcons name="CloseCircle" className="size-6" color='currentColor' />
            </Button>
            <Button
              disabled={!selectedDate}
              onClick={() => {
                closeFn();
                selectedDate && onSubmit?.(selectedDate);
              }}
              className="size-10 rounded-lg bg-black text-white hover:bg-black/90 disabled:opacity-50"
            >
              <IconsaxIcons name="TickCircle" className="size-6" color='currentColor' />
            </Button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}

// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { DatePickerComponentPropsType } from '@/types/dashboard/component';
import { handleZeroBeforeNumber } from '@/utils/string';
import { cn } from '@/utils/utils';
import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import moment from 'jalali-moment';

export default function DatePicker({
  closeFn,
  isOpened,
  className,
  onSubmit,
}: DatePickerComponentPropsType): ReactNode {
  // Defining states of component
  const [currentMonth, setCurrentMonth] = useState<moment.Moment>(moment());
  const [useJalali, setUseJalali] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<moment.Moment | undefined>(
    moment().clone().add(7, 'jDay'),
  );

  // Defining Variables
  const weekDayNames = ['ش', 'ی', 'د', 'س', 'ج', 'پ', 'ج'];
  const weekDayNamesUS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const nextMonth = currentMonth.clone().add(1, useJalali ? 'jMonth' : 'month');
  const today = moment().locale('fa');
  const daysInCurrentMonth = useJalali
    ? currentMonth.jDaysInMonth()
    : currentMonth.daysInMonth();
  const startOfNextMonth = nextMonth
    .clone()
    .startOf(useJalali ? 'jMonth' : 'month');
  const daysInNextMonth = useJalali
    ? nextMonth.jDaysInMonth()
    : nextMonth.daysInMonth();
  const startOfCurrentMonth = currentMonth
    .clone()
    .startOf(useJalali ? 'jMonth' : 'month');
  const daysToRender: moment.Moment[] = Array.from(
    { length: daysInCurrentMonth },
    (_, i) => startOfCurrentMonth.clone().add(i, 'day'),
  );
  const daysToRenderNextMonth: moment.Moment[] = Array.from(
    { length: daysInNextMonth },
    (_, i) => startOfNextMonth.clone().add(i, 'day'),
  );

  // Function to switch between Jalali and Gregorian
  const toggleCalendar = () => {
    setUseJalali((prev) => {
      const newUseJalali = !prev;
      const newMonth = newUseJalali
        ? currentMonth.clone().locale('fa')
        : currentMonth.clone().locale('en');
      updateCurrentMonth(newMonth);
      return newUseJalali;
    });
  };

  // Defining a function to check state of rendered day element
  function checkDayState(
    day: moment.Moment,
  ): 'passed' | 'today' | 'selected' | 'normal' {
    const isToday = day.isSame(today, 'day');
    const isSelected = selectedDate?.isSame(day, 'day');
    const isPassed = day.isBefore(today, 'day');

    if (isToday) return 'today';
    else if (isSelected) return 'selected';
    else if (isPassed) return 'passed';
    else return 'normal';
  }
  // A function to update current month
  const updateCurrentMonth = (newMonth: moment.Moment) => {
    setCurrentMonth(
      useJalali ? newMonth.clone().locale('fa') : newMonth.clone().locale('en'),
    );
  };
  // A function to handle month changes
  const handleMonthChange = (direction: 'previous' | 'next') => {
    setCurrentMonth((prev) =>
      direction === 'previous'
        ? prev.clone().subtract(1, 'jMonth')
        : prev.clone().add(1, 'jMonth'),
    );
  };

  // Returning JSX
  return createPortal(
    <>
      <div
        className="z-40 bg-black/20 w-full h-full fixed top-0 left-0 origin-center transition-all duration-500 data-[opened='true']:opacity-100 data-[opened='true']:visible data-[opened='false']:opacity-0 data-[opened='false']:invisible"
        onClick={closeFn}
        data-opened={isOpened}
      />
      <div
        data-opened={isOpened}
        className={cn(
          'bg-white p-5 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 origin-center w-[600px] max-h-[85dvh] overflow-auto scrollbar-hide transition-all duration-500 data-[opened="false"]:opacity-0 data-[opened="false"]:scale-95 data-[opened="false"]:invisible data-[opened="true"]:opacity-100 data-[opened="true"]:scale-100 data-[opened="true"]:visible rounded-xl shadow-xl',
          className,
        )}
      >
        <div className="grid grid-cols-2 gap-10 mb-4">
          <button
            className="flex items-center"
            onClick={() => handleMonthChange('previous')}
          >
            <div className="w-5 h-5 aspect-square bg-gray-100 flex items-center justify-center rounded-md shrink-0">
              <IconsaxIcons
                name="ArrowRight2"
                color="black"
                className="w-2.5 h-2.5"
              />
            </div>
            <span className="block mx-auto w-full text-center truncate text-cs08 font-semibold text-black">
              {useJalali
                ? currentMonth.locale('fa').format('jMMMM')
                : currentMonth.locale('us').format('MMMM')}
            </span>
          </button>
          <button
            className="flex items-center"
            onClick={() => handleMonthChange('next')}
          >
            <span className="block mx-auto w-full text-center truncate text-cs08 font-semibold text-black">
              {useJalali
                ? nextMonth.locale('fa').format('jMMMM')
                : nextMonth.locale('us').format('MMMM')}
            </span>
            <div className="w-5 h-5 aspect-square bg-gray-100 flex items-center justify-center rounded-md shrink-0">
              <IconsaxIcons
                name="ArrowLeft2"
                color="black"
                className="w-2.5 h-2.5"
              />
            </div>
          </button>
        </div>
        <div className="grid grid-cols-2 mb-3">
          <div className="grid grid-cols-7 gap-3 pl-5 border-l border-l-black/10">
            {useJalali
              ? weekDayNames.map((item, index) => (
                  <div
                    className="bg-gray-100 flex items-center justify-center aspect-square rounded-md"
                    key={`${index}-JWD-1`}
                  >
                    <span className="text-cs06 font-medium text-black">
                      {item}
                    </span>
                  </div>
                ))
              : weekDayNamesUS.map((item, index) => (
                  <div
                    className="bg-gray-100 flex items-center justify-center aspect-square rounded-md"
                    key={`${index}-JWD-1`}
                  >
                    <span className="text-cs06 font-medium text-black">
                      {item}
                    </span>
                  </div>
                ))}
            {[
              ...new Array(
                currentMonth
                  .clone()
                  .startOf(useJalali ? 'jMonth' : 'month')
                  .day(),
              ),
            ].map((item, index) => (
              <div key={`${index}-JDDX-1`} className="aspect-square" />
            ))}
            {daysToRender.map((item, index) => (
              <button
                key={`${index}-JDD-1`}
                data-role={checkDayState(item)}
                onClick={() => {
                  const dayState = checkDayState(item);
                  if (dayState !== 'passed') {
                    setSelectedDate(item);
                  }
                }}
                className={cn(
                  'flex items-center justify-center aspect-square rounded-md transition-all duration-500',
                  "data-[role='passed']:bg-white data-[role='passed']:text-gray-200",
                  "data-[role='selected']:bg-cs-red data-[role='selected']:text-white",
                  "data-[role='today']:bg-black data-[role='today']:text-white",
                  "data-[role='normal']:bg-white data-[role='normal']:text-black",
                )}
              >
                <span
                  className={cn(
                    'text-current',
                    useJalali
                      ? 'font-medium text-cs06'
                      : 'font-mono font-medium text-cs06',
                  )}
                >
                  {handleZeroBeforeNumber((index + 1).toString())}
                </span>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-3 pr-5">
            {useJalali
              ? weekDayNames.map((item, index) => (
                  <div
                    className="bg-gray-100 flex items-center justify-center aspect-square rounded-md"
                    key={`${index}-JWD-2`}
                  >
                    <span className="text-cs06 font-medium text-black">
                      {item}
                    </span>
                  </div>
                ))
              : weekDayNamesUS.map((item, index) => (
                  <div
                    className="bg-gray-100 flex items-center justify-center aspect-square rounded-md"
                    key={`${index}-JWD-2`}
                  >
                    <span className="text-cs06 font-medium text-black">
                      {item}
                    </span>
                  </div>
                ))}
            {[
              ...new Array(
                nextMonth
                  .clone()
                  .startOf(useJalali ? 'jMonth' : 'month')
                  .day(),
              ),
            ].map((item, index) => (
              <div key={`${index}-JDDX-2`} className="aspect-square" />
            ))}
            {daysToRenderNextMonth.map((item, index) => (
              <button
                key={`${index}-JDD-2`}
                data-role={checkDayState(item)}
                onClick={() => {
                  const dayState = checkDayState(item);
                  if (dayState !== 'passed') {
                    setSelectedDate(item);
                  }
                }}
                className={cn(
                  'flex items-center justify-center aspect-square rounded-md transition-all duration-500',
                  "data-[role='passed']:bg-white data-[role='passed']:text-gray-200",
                  "data-[role='selected']:bg-cs-red data-[role='selected']:text-white",
                  "data-[role='today']:bg-black data-[role='today']:text-white",
                  "data-[role='normal']:bg-white data-[role='normal']:text-black",
                )}
              >
                <span
                  className={cn(
                    'text-current',
                    useJalali
                      ? 'font-medium text-cs06'
                      : 'font-mono font-medium text-cs06',
                  )}
                >
                  {handleZeroBeforeNumber((index + 1).toString())}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between gap-5">
          <Button
            onClick={toggleCalendar}
            className="bg-white border border-black/10 rounded-lg flex items-center justify-center py-3 px-5 hover:bg-gray-50"
          >
            <span className="font-normal text-black/60 truncate block w-full text-center text-xs">
              {useJalali ? `تبدیل به تقویم میلادی` : `تبدیل به تقویم شمسی`}
            </span>
          </Button>
          <div className="flex items-center justify-end gap-3">
            <Button
              disabled={selectedDate === undefined}
              className="transition-all duration-500 bg-cs-red rounded-lg flex items-center justify-center py-3 px-5 hover:bg-cs-red disabled:opacity-50"
              onClick={() => setSelectedDate(undefined)}
            >
              <span className="font-normal text-white truncate block w-full text-center text-xs">
                پاک کردن
              </span>
            </Button>
            <Button
              disabled={selectedDate === undefined}
              onClick={() => {
                closeFn();
                if (onSubmit && selectedDate !== undefined) {
                  onSubmit(selectedDate);
                }
              }}
              className="transition-all duration-500 bg-black rounded-lg flex items-center justify-center py-3 px-5 hover:bg-black disabled:opacity-50"
            >
              <span className="font-normal text-white truncate block w-full text-center text-xs">
                تایید تاریخ
              </span>
            </Button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}

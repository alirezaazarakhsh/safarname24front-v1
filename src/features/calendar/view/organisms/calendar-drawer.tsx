import '@/features/calendar/style/calendar-drawer.css';
import '@/features/calendar/style/calendar-general.css';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import weekends from 'react-multi-date-picker/plugins/highlight_weekends';

import { Calendar, DateObject, CalendarRef } from 'react-multi-date-picker';
import { isWeekendDay } from '../../model/helpers';
import CalendarTrigger from '../molecules/calendar-trigger';
import { Button } from '@/components/ui/button';
import { DateRange, useCalendar } from '../../model/use-calendar';
import { customWeekDays } from '../../model/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ToggleCalendar from '../molecules/toggle-calendar';
import ConfirmButton from '../molecules/confirm-button';
import { useRef } from 'react';
import CheckInOutBar from '../molecules/checkInOutBar';
import CnTrigger from '../molecules/cn-trigger';

type Props = {
  initialRange?: DateRange;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (newDate: DateRange) => void;
};

// ------------------------------

export default function CalendarDrawer(props: Props) {
  const { onChange, onOpenChange, open, initialRange } = props;

  const {
    draftDates,
    draftNights,
    handleSelectDates,
    confirmDraft,
    resetDraft,
    currentCalendar,
    currentLocale,
    selectedDates,
    calendarType,
    handleClear,
    toggleCalendarType,
  } = useCalendar(initialRange, onChange);

  const calendarRef = useRef<CalendarRef>(null);

  const handleGoToToday = () => {
    if (calendarRef.current) {
      const today = new DateObject({
        calendar: currentCalendar,
        locale: currentLocale,
      });

      calendarRef.current.set('date', today);
    }
  };

  // مدیریت باز و بسته شدن دراور
  const handleOpenChange = (isOpen: boolean) => {
    // اگر کاربر دراور را با کشیدن به پایین یا کلیک بیرون بدون تایید بست، پیش‌نویس ریست شود
    if (!isOpen) {
      resetDraft();
    }
    onOpenChange(isOpen);
  };

  const startDate = draftDates[0] || null;
  const endDate = draftDates[1] || null;

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger>
        <div>
          <CnTrigger tempDates={selectedDates} nights={draftNights} />
        </div>

        {/* <CalendarTrigger tempDates={selectedDates} nights={draftNights} /> */}
      </DrawerTrigger>

      <DrawerContent
      // dir={calendarType === 'persian' ? 'rtl' : 'ltr'}
      >
        <DrawerHeader>
          <DrawerTitle className="hidden" />
          <DrawerDescription className="hidden" />

          <div className="flex justify-between">
            <ToggleCalendar
              calendarType={calendarType}
              onClick={toggleCalendarType}
            />

            <Button
              variant={'secondary'}
              onClick={handleGoToToday}
              className={'h-10 px-5 sm:h-11'}
            >
              برو به امروز
            </Button>
          </div>

          <CheckInOutBar
            className="mt-3"
            startDate={startDate}
            endDate={endDate}
            nights={draftNights}
            calendarType={calendarType}
          />
        </DrawerHeader>

        <div className="px-4 py-6">
          {/* تقویم تک ماهه */}
          <Calendar
            renderButton={(
              direction: 'right' | 'left',
              handleClick: () => void,
            ) => {
              const isRtl = calendarType === 'persian';

              const isNext = isRtl
                ? direction === 'right'
                : direction === 'left';

              return (
                <Button
                  type="button"
                  variant={'secondary'}
                  onClick={handleClick}
                  className={'size-9 rounded-lg'}
                >
                  {isNext ? <ChevronLeft /> : <ChevronRight />}
                </Button>
              );
            }}

            minDate={new DateObject({ calendar: currentCalendar })}
            range
            plugins={[weekends(calendarType ? [6] : [0])]}
            ref={calendarRef}
            monthYearSeparator=" "
            rangeHover
            disableYearPicker
            disableMonthPicker
            numberOfMonths={1}
            weekDays={customWeekDays.short[calendarType]}
            value={draftDates} // ✅ اتصال به استیت پیش‌نویس
            onChange={(dates) => handleSelectDates(dates, false)} // ✅ فقط draft تغییر کند نه استیت اصلی
            calendar={currentCalendar} // ✅ آبجکت تقویم پکیج
            locale={currentLocale} // ✅ لوکال زبان
            // className="general-calendar mobile-calendar"
            className={`general-calendar drawer-calendar no-ss01 ${calendarType === 'persian' ? 'font-primary' : 'font-secondary'}`}
            // mapDays={({ date }) => {
            //   if (isWeekendDay(date, calendarType)) {
            //     return { className: 'text-rose-500 font-semibold' };
            //   }
            // }}
          />
        </div>

        <DrawerFooter>
          <div className="grid grid-cols-[2fr_1fr] gap-2">
            <ConfirmButton
              selectedCount={draftDates.length}
              onClick={() => {
                confirmDraft();
                onOpenChange(false);
              }}
            />

            <Button
              onClick={handleClear}
              variant={'destructive'}
              disabled={draftDates.length < 2 && selectedDates.length < 0}
            >
              پاک کردن
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

import '@/features/calendar/style/calendar-dialog.css';
import '@/features/calendar/style/calendar-general.css';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Calendar, CalendarRef, DateObject } from 'react-multi-date-picker';
import { isWeekendDay } from '../../model/helpers';
import CalendarTrigger from '../molecules/calendar-trigger';
import { Button } from '@/components/ui/button';
import { DateRange, useCalendar } from '../../model/use-calendar';
import { customWeekDays } from '../../model/constants';
import weekends from 'react-multi-date-picker/plugins/highlight_weekends';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import ConfirmButton from '../molecules/confirm-button';
import ToggleCalendar from '../molecules/toggle-calendar';
import CnTrigger from '../molecules/cn-trigger';
import { useRef } from 'react';
import CheckInOutBar from '../molecules/checkInOutBar';

type Props = {
  initialRange?: DateRange;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (newDate: DateRange) => void;
};

// ------------------------------

export default function CalendarDialog(props: Props) {
  const { onChange, onOpenChange, open, initialRange } = props;

  const {
    draftDates,
    draftNights,
    handleSelectDates,
    confirmDraft,
    resetDraft,
    handleClear,
    currentCalendar,
    currentLocale,
    selectedDates,
    calendarType,
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <div>
          <CnTrigger tempDates={selectedDates} nights={draftNights} />
        </div>

        {/* <CalendarTrigger tempDates={selectedDates} nights={draftNights} /> */}
      </DialogTrigger>

      <DialogContent
        className={'rounded-none p-7 sm:max-w-full md:max-w-240 md:rounded-3xl'}
      >
        <DialogHeader>
          <DialogTitle className={'hidden'}></DialogTitle>
          <DialogDescription className={'hidden'}></DialogDescription>
          <div className="flex justify-end-safe gap-3">
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
        </DialogHeader>

        <Calendar
          renderButton={(
            direction: 'right' | 'left',
            handleClick: () => void,
          ) => {
            const isRtl = calendarType === 'persian';

            const isNext = isRtl ? direction === 'right' : direction === 'left';

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

          ref={calendarRef}
          range
          plugins={[weekends(calendarType ? [6] : [0])]}
          disableMonthPicker
          disableYearPicker
          rangeHover
          monthYearSeparator=" "
          minDate={new DateObject({ calendar: currentCalendar })}
          weekDays={customWeekDays.full[calendarType]}
          className="general-calendar dialog-calendar"
          numberOfMonths={2}
          value={draftDates} // ✅ اتصال به استیت پیش‌نویس
          onChange={(dates) => handleSelectDates(dates, false)} // ✅ فقط draft تغییر کند نه استیت اصلی
          calendar={currentCalendar} // ✅ آبجکت تقویم پکیج
          locale={currentLocale} // ✅ لوکال زبان
          mapDays={({ date }) => {
            if (isWeekendDay(date, calendarType)) {
              return { className: 'text-rose-500 font-semibold' };
            }
          }}
        />

        <div className="flex items-center gap-3">
          <ConfirmButton
            className="w-40"
            selectedCount={draftDates.length}
            onClick={() => {
              confirmDraft();
              onOpenChange(false);
            }}
          />

          <Button
            className={'px-5'}
            onClick={handleClear}
            variant={'destructive'}
            disabled={draftDates.length < 2 && selectedDates.length < 0}
          >
            پاک کردن
          </Button>

          <CheckInOutBar
            className="mr-auto"
            endDate={endDate}
            nights={draftNights}
            startDate={startDate}
            calendarType={calendarType}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

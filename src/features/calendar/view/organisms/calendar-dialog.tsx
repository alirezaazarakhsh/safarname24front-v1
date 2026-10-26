import '../../style/desktop.css';
import '../../style/general.css';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Calendar, DateObject } from 'react-multi-date-picker';
import { isWeekendDay } from '../../helpers';
import CalendarTrigger from '../../calendar-trigger';
import { Button } from '@/components/ui/button';
import { DateRange, useCalendar } from '../../use-calendar';
import { customWeekDays } from '../../model/constants';
import weekends from 'react-multi-date-picker/plugins/highlight_weekends';

import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    currentCalendar,
    currentLocale,
    selectedDates,
    calendarType,
    toggleCalendarType,
  } = useCalendar(initialRange, onChange);

  // مدیریت باز و بسته شدن دراور
  const handleOpenChange = (isOpen: boolean) => {
    // اگر کاربر دراور را با کشیدن به پایین یا کلیک بیرون بدون تایید بست، پیش‌نویس ریست شود
    if (!isOpen) {
      resetDraft();
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <CalendarTrigger tempDates={selectedDates} nights={draftNights} />
      </DialogTrigger>

      <DialogContent className={'sm:max-w-[44rem]'} dir="rtl">
        <DialogHeader>
          <DialogTitle className={'hidden'}></DialogTitle>
          <DialogDescription className={'hidden'}></DialogDescription>

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
                className={'size-8! rounded-md!'}
              >
                {isNext ? <ChevronLeft /> : <ChevronRight />}
              </Button>
            );
          }}

          range
          plugins={[weekends(calendarType ? [6] : [0])]}

          rangeHover
          minDate={new DateObject({ calendar: currentCalendar })}
          weekDays={customWeekDays[calendarType]}
          className="general-calendar desktop-calendar"
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

        <Button
          className={'w-fit px-6'}
          disabled={draftDates.length < 2}
          onClick={() => {
            confirmDraft(); // ۱. تایید و ارسال تاریخ‌ها به والد
            onOpenChange(false); // ۲. بستن دراور
          }}
        >
          {draftNights > 0
            ? `تایید، ${draftNights} شب اقامت`
            : 'انتخاب تاریخ خروج'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

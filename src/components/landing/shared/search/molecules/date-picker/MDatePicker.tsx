import '@/styles/date-picker/mobile.css';
import '@/styles/date-picker/general.css';

import { useState } from 'react';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { Calendar, DateObject } from 'react-multi-date-picker';

import ConfirmButton from './ConfirmButton';
import { weekDays } from '@/constants/landing';
import CalendarTypeBtn from './CalendarTypeBtn';
import { useSearchContext, useSearchDispatch } from '@/context/SearchContext';

import persianCalendar from 'react-date-object/calendars/persian';
import PersianLanguage from 'react-date-object/locales/persian_fa';
import gregorianCalendar from 'react-date-object/calendars/gregorian';
import gregorianLanguage from 'react-date-object/locales/gregorian_en';
import weekends from 'react-multi-date-picker/plugins/highlight_weekends';

import {
  Drawer,
  DrawerTitle,
  DrawerTrigger,
  DrawerContent,
} from '@/components/ui/drawer';

type CalendarType = 'persian' | 'gregorian';

// --------------------------------

export default function MDatePicker() {
  const [isOpen, setOpen] = useState(false);
  const [calendarType, setCalendarType] = useState<CalendarType>('persian');

  const {
    date: { values, confirmedDate },
  } = useSearchContext();
  const dispatch = useSearchDispatch();

  function handleChangeCalendarType() {
    setCalendarType(calendarType === 'persian' ? 'gregorian' : 'persian');
  }

  const handleDateChange = (date: [DateObject]) => {
    dispatch({
      type: 'DATE',
      payload: { actionType: 'DATE-VALUES', values: date },
    });
  };

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerTrigger className="bg-zinc-200/50 text-zinc-600 text-cs08 font-semibold h-12 px-5 flex items-center gap-1.5 rounded-cs-10">
        {confirmedDate ? (
          <>
            <span>{confirmedDate[0].format()}</span>
            <span>|</span>
            <span>{confirmedDate[1].format()}</span>
          </>
        ) : (
          <>
            <span>تاریخ ورود</span>
            <span>|</span>
            <span>تاریخ خروج</span>
          </>
        )}
      </DrawerTrigger>

      <DrawerContent aria-describedby={undefined} className="pb-6">
        <DrawerTitle className="hidden"></DrawerTitle>

        <Calendar
          range
          rangeHover
          shadow={false}
          value={values}
          disableYearPicker
          disableMonthPicker
          monthYearSeparator=" "
          onChange={handleDateChange}
          className="general-calendar mobile-calendar no-ss01"
          weekDays={
            calendarType === 'persian' ? weekDays.persian : weekDays.gregorian
          }
          calendar={
            calendarType === 'persian' ? persianCalendar : gregorianCalendar
          }
          locale={
            calendarType === 'persian' ? PersianLanguage : gregorianLanguage
          }
          renderButton={(direction: string, handleClick: () => void) => (
            <button onClick={handleClick}>
              {direction === 'right' ? (
                <ArrowRight2 size={14} color="#444" />
              ) : (
                <ArrowLeft2 size={14} color="#444" />
              )}
            </button>
          )}
          plugins={
            calendarType === 'persian' ? [weekends([6])] : [weekends([0])]
          }
          minDate={new DateObject({ calendar: persianCalendar }).set(
            'date',
            new Date(),
          )}
        >
          <CalendarTypeBtn
            calendarType={calendarType}
            setCalendarType={handleChangeCalendarType}
          />
        </Calendar>

        <ConfirmButton handleClose={() => setOpen(false)} />
      </DrawerContent>
    </Drawer>
  );
}

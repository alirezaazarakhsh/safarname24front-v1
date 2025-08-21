import {
  Drawer,
  DrawerTitle,
  DrawerTrigger,
  DrawerContent,
} from '@/components/ui/drawer';

import '@/styles/date-picker/mobile.css';
import '@/styles/date-picker/general.css';

import { useState } from 'react';
import { weekDays } from '@/constants/landing';
import { Calendar, DateObject } from 'react-multi-date-picker';
import { MConfirmButton, MDatePickerTrigger } from './molecules';

import persianCalendar from 'react-date-object/calendars/persian';
import persianLanguage from 'react-date-object/locales/persian_fa';
import gregorianCalendar from 'react-date-object/calendars/gregorian';
import gregorianLanguage from 'react-date-object/locales/gregorian_en';

import { useDatePickerContext, useDatePickerDispatch } from '@/context';
import weekends from 'react-multi-date-picker/plugins/highlight_weekends';

// --------------------------------

export default function MDatePicker() {
  const [isOpen, setOpen] = useState(false);

  const dispatch = useDatePickerDispatch();
  const { value, calendarType } = useDatePickerContext();

  const calendarDetail = {
    calendar: calendarType === 'persian' ? persianCalendar : gregorianCalendar,
    locale: calendarType === 'persian' ? persianLanguage : gregorianLanguage,
    weekendDays: calendarType === 'persian' ? [6] : [0],
    weekDays:
      calendarType === 'persian' ? weekDays.persian : weekDays.gregorian,
  };

  function handleDateChange(date: DateObject[]) {
    if (date?.[0] && date?.[1]) {
      dispatch({
        type: 'value',
        payload: date,
      });
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerTrigger className="bg-zinc-200/50 text-zinc-600 text-cs08 font-semibold h-12 px-5 flex items-center gap-1.5 rounded-cs-10">
        <MDatePickerTrigger />
      </DrawerTrigger>

      <DrawerContent className="pb-6" aria-describedby={undefined}>
        <DrawerTitle className="hidden"></DrawerTitle>

        <Calendar
          range
          rangeHover
          value={value}
          shadow={false}
          disableYearPicker
          disableMonthPicker
          monthYearSeparator=" "
          minDate={new DateObject()}
          onChange={handleDateChange}
          locale={calendarDetail.locale}
          weekDays={calendarDetail.weekDays}
          calendar={calendarDetail.calendar}
          plugins={[weekends(calendarDetail.weekendDays)]}
          className={`general-calendar mobile-calendar no-ss01 ${calendarType === 'persian' ? 'font-sans' : 'font-inter'}`}
        />

        <MConfirmButton handleClose={() => setOpen(false)} />
      </DrawerContent>
    </Drawer>
  );
}

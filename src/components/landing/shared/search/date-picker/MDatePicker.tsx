import {
  Drawer,
  DrawerTitle,
  DrawerTrigger,
  DrawerContent,
} from '@/components/ui/drawer';

import '@/styles/date-picker/mobile.css';
import '@/styles/date-picker/general.css';

import { useState } from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import { MConfirmButton, MDatePickerTrigger } from './molecules';

import { getCalendarDetail } from '@/helpers/date-picker';
import { useDatePickerContext, useDatePickerDispatch } from '@/context';
import weekends from 'react-multi-date-picker/plugins/highlight_weekends';

// --------------------------------

export default function MDatePicker() {
  const dispatch = useDatePickerDispatch();
  const { value, calendarType } = useDatePickerContext();

  const [isOpen, setOpen] = useState(false);
  const calendarDetail = getCalendarDetail(calendarType);

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

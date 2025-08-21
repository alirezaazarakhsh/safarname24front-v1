import {
  CalendarTypeButton,
  DDatePickerTrigger,
  ClearDateRangeButton,
} from './molecules';

import {
  DropdownMenu,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';

import '@/styles/date-picker/general.css';
import '@/styles/date-picker/desktop.css';

import { useState } from 'react';
import { weekDays } from '@/constants/landing';
import { Calendar, DateObject } from 'react-multi-date-picker';

import persianCalendar from 'react-date-object/calendars/persian';
import persianLanguage from 'react-date-object/locales/persian_fa';
import gregorianCalendar from 'react-date-object/calendars/gregorian';
import gregorianLanguage from 'react-date-object/locales/gregorian_en';

import { useDatePickerContext, useDatePickerDispatch } from '@/context';
import weekends from 'react-multi-date-picker/plugins/highlight_weekends';

type CommonProps = {
  sideOffset?: number;
  triggerType?: 'home' | 'else';
  alignOffset?: number | undefined;
};

type Props =
  | ({
      scrollBehavior?: false;
    } & CommonProps)
  | ({
      scrollBehavior?: true;
      scrollPosition?: number;
    } & CommonProps);

// --------------------------------

export function DDatePicker(props: Props) {
  const {
    sideOffset,
    alignOffset,
    scrollBehavior,
    triggerType = 'else',
  } = props;

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

      dispatch({
        type: 'confirmed-value',
        payload: date,
      });
    }
  }

  return (
    <DropdownMenu dir="rtl" modal={false} open={isOpen} onOpenChange={setOpen}>
      <DDatePickerTrigger
        isOpen={isOpen}
        type={triggerType}
        scrollBehavior={scrollBehavior}
        handleSetOpen={() => setOpen(true)}
        scrollPosition={scrollBehavior ? props.scrollPosition : undefined}
      />

      <DropdownMenuContent
        side="bottom"
        align="start"
        sideOffset={sideOffset}
        avoidCollisions={false}
        alignOffset={alignOffset}
        className="z-10 p-5 rounded-xl shadow-[0_0.5rem_2rem_rgba(0,0,0,0.06)]"
      >
        <Calendar
          range
          rangeHover
          value={value}
          shadow={false}
          disableYearPicker
          numberOfMonths={2}
          disableMonthPicker
          monthYearSeparator=" "
          minDate={new DateObject()}
          onChange={handleDateChange}
          locale={calendarDetail.locale}
          weekDays={calendarDetail.weekDays}
          calendar={calendarDetail.calendar}
          plugins={[weekends(calendarDetail.weekendDays)]}
          className={`general-calendar desktop-calendar no-ss01 ${calendarType === 'persian' ? 'font-sans' : 'font-inter'}`}
        >
          {/* <div className="flex-between mt-6">
            <ClearDateRangeButton />
            <CalendarTypeButton />
          </div> */}
        </Calendar>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

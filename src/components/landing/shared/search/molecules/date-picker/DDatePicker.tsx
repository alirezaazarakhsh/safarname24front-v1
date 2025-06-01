import '@/styles/date-picker/general.css';
import '@/styles/date-picker/desktop.css';

import {
  DropdownMenu,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';

import { useState } from 'react';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { Calendar, DateObject } from 'react-multi-date-picker';

import { weekDays } from '@/constants/landing';
import CalendarTypeBtn from './CalendarTypeBtn';
import DatePickerTrigger from './DatePickerTrigger';
import ClearDateRangeButton from './ClearDateRangeButton';
import { useSearchContext, useSearchDispatch } from '@/context/SearchContext';

import persianCalendar from 'react-date-object/calendars/persian';
import PersianLanguage from 'react-date-object/locales/persian_fa';
import gregorianCalendar from 'react-date-object/calendars/gregorian';
import gregorianLanguage from 'react-date-object/locales/gregorian_en';
import weekends from 'react-multi-date-picker/plugins/highlight_weekends';

type CalendarType = 'persian' | 'gregorian';

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

export default function DDatePicker(props: Props) {
  const {
    triggerType = 'else',
    alignOffset,
    sideOffset,
    scrollBehavior,
  } = props;

  const [isOpen, setOpen] = useState(false);
  const [calendarType, setCalendarType] = useState<CalendarType>('persian');

  const {
    date: { values },
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
    <DropdownMenu dir="rtl" modal={false} open={isOpen} onOpenChange={setOpen}>
      <DatePickerTrigger
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
          value={values}
          shadow={false}
          disableYearPicker
          numberOfMonths={2}
          disableMonthPicker
          monthYearSeparator=" "
          onChange={handleDateChange}
          className="general-calendar desktop-calendar no-ss01"
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
          <div className="flex-between mt-6">
            <ClearDateRangeButton />
            <CalendarTypeBtn
              calendarType={calendarType}
              setCalendarType={handleChangeCalendarType}
            />
          </div>
        </Calendar>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

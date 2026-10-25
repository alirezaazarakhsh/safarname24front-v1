import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { Calendar, DateObject } from 'react-multi-date-picker';
import { CalendarType } from './types';
import { calculateNights, isWeekendDay } from './helpers';
import { useState } from 'react';
import CalendarTrigger from './calendar-trigger';
import { useMediaQuery } from '@/lib/hooks/use-media-query';

type MobileCalendarSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  calendarType: CalendarType;
  toggleCalendarType: () => void;
  tempDates: DateObject[];
  selectedDates: DateObject[];
  onTempDatesChange: (dates: DateObject[]) => void;
  onConfirm: () => void;
  calendar: any;
  locale: any;
  onDatesChange: (dates: DateObject[]) => void;
};

// ------------------------------

export default function MobileCalendarDrawer(props: MobileCalendarSheetProps) {
  const {
    calendarType,
    toggleCalendarType,
    tempDates,
    onTempDatesChange,
    onConfirm,
    calendar,
    locale,
    onDatesChange,
    selectedDates,
  } = props;

  const [isOpen, setOpen] = useState(false);

  const nights =
    tempDates.length === 2 ? calculateNights(tempDates[0], tempDates[1]) : 0;

  console.log('temp-dates', tempDates);
  const isMobile = useMediaQuery('(max-width: 640px)');

  return (
    <Drawer open={isOpen} onOpenChange={setOpen} showSwipeHandle={isMobile}>
      <DrawerTrigger>
        <CalendarTrigger tempDates={selectedDates} nights={nights} />
      </DrawerTrigger>

      <DrawerContent
        className={'w-full sm:mx-auto md:max-w-[44rem] md:rounded-t-[2rem]!'}
      >
        <DrawerHeader>
          <DrawerTitle className={'hidden'}></DrawerTitle>
          <DrawerDescription className={'hidden'}></DrawerDescription>

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
        </DrawerHeader>

        <div className="bg-red-100 p-4">
          {/* تقویم تک ماهه */}
          {isMobile ? (
            <div className="mobile-calendar-wrapper flex justify-center">
              <Calendar
                range
                rangeHover
                numberOfMonths={1}
                value={tempDates}
                onChange={onTempDatesChange}
                calendar={calendar}
                locale={locale}
                className="custom-hotel-theme mobile-view"
                mapDays={({ date }) => {
                  if (isWeekendDay(date, calendarType)) {
                    return { className: 'text-rose-500 font-semibold' };
                  }
                }}
              />
            </div>
          ) : (
            <div className="calendar-desktop-wrapper">
              <Calendar
                range
                rangeHover
                numberOfMonths={2}
                value={selectedDates}
                onChange={onDatesChange}
                calendar={calendar}
                locale={locale}
                className="custom-hotel-theme"
                mapDays={({ date, isSameDate, selectedDate }) => {
                  const isWeekend = isWeekendDay(date, calendarType);
                  const props: any = {};

                  // اعمال رنگ قرمز روی تعطیلات
                  if (isWeekend) {
                    props.className = 'text-rose-500 font-semibold';
                  }
                  return props;
                }}
              />
            </div>
          )}
        </div>

        <DrawerFooter>
          <Button
            disabled={nights === 0}
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            {nights > 0 ? `تایید ${nights} شب اقامت` : 'تایید و ادامه فرآیند'}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

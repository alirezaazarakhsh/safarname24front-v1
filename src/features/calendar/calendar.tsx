'use client';

import React, { useState } from 'react';
import { HotelCalendarProps } from './types';
// import { DesktopCalendar } from './desktop-calendar';
import './style.css';
import MobileCalendarDrawer from './mobile-calendar-drawer';
import CalendarWrapper from './calendar-wrapper';
import { DateObject } from 'react-multi-date-picker';
import { DateRange } from './use-calendar';
import CalendarDrawer from './view/organisms/calendar-drawer';
import { useMediaQuery } from '@/lib/hooks/use-media-query';
import CalendarDialog from './view/organisms/calendar-dialog';

type Props = {
  initialRange?: DateRange;
  onChange: (newDate: DateRange) => void;
};

// ------------------------------

export function Calendar(props: Props) {
  const { initialRange, onChange } = props;

  const [isOpen, setOpen] = useState(false);
  const isDrawer = useMediaQuery('(max-width: 640px)');

  return (
    <>
      {isDrawer ? (
        <CalendarDrawer
          onChange={onChange}
          initialRange={initialRange}
          open={isOpen}
          onOpenChange={setOpen}
        />
      ) : (
        <CalendarDialog
          onChange={onChange}
          initialRange={initialRange}
          open={isOpen}
          onOpenChange={setOpen}
        />
      )}
    </>
  );
}

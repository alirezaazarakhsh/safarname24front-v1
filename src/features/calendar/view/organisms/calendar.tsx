'use client';

import { useState } from 'react';

import CalendarDrawer from './calendar-drawer';
import CalendarDialog from './calendar-dialog';
import { DateRange } from '../../model/use-calendar';
import { useMediaQuery } from '@/lib/hooks/use-media-query';

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

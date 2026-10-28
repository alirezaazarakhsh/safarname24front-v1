'use client';

import { useState } from 'react';
('react-multi-date-picker');
import { DateRange } from '../../model/use-calendar';
import CalendarDrawer from './calendar-drawer';
import { useMediaQuery } from '@/lib/hooks/use-media-query';
import CalendarDialog from './calendar-dialog';

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

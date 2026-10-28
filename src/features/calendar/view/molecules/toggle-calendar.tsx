import { cn } from 'cn';

import { Button } from '@/components/ui/button';
import { CalendarType } from '../../model/types';
import { CalendarRange } from 'lucide-react';

type Props = {
  className?: string;
  onClick: () => void;
  calendarType: CalendarType;
};

// ------------------------------

export default function ToggleCalendar(props: Props) {
  const { calendarType, onClick, className } = props;

  return (
    <Button
      onClick={onClick}
      variant={'secondary'}
      className={cn('h-10 px-5 sm:h-11', className)}
    >
      <CalendarRange className="size-4" />
      {calendarType === 'persian' ? 'تقویم میلادی' : 'تقویم شمسی'}
    </Button>
  );
}

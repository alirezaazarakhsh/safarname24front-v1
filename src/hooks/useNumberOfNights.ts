import { useMemo } from 'react';
import { DateObject } from 'react-multi-date-picker';

type Props = DateObject[] | null;

// -----------------------------------

export function useNumberOfNights(dates?: Props): number {
  return useMemo(() => {
    if (!dates || dates.length < 2) return 0;

    const start = dates[0]?.toDate();
    const end = dates[1]?.toDate();

    if (!start || !end) return 0;

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diffInMs = end.getTime() - start.getTime();
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  }, [dates]);
}

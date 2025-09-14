import { DateObject } from 'react-multi-date-picker';

// ------------------------------

export function getNumberOfNights(dates?: (string | undefined)[]): number {
  if (!dates || dates.length < 2) return 0;

  const enter = new DateObject({ date: dates?.[0] }).toDate();
  const exit = new DateObject({ date: dates?.[1] }).toDate();

  if (!enter || !exit) return 0;

  enter.setHours(0, 0, 0, 0);
  exit.setHours(0, 0, 0, 0);

  const diffInMs = exit.getTime() - enter.getTime();
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

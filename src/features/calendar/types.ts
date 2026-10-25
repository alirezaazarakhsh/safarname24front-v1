import DateObject from 'react-date-object';

export type CalendarType = 'persian' | 'gregorian';

export interface DateRangeState {
  startDate: DateObject | null;
  endDate: DateObject | null;
}

export interface HotelCalendarProps {
  initialRange?: [DateObject | null, DateObject | null];
  onChange?: (range: {
    startDate: DateObject | null;
    endDate: DateObject | null;
    nights: number;
  }) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

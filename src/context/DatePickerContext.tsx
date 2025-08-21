import {
  ReactNode,
  useEffect,
  useReducer,
  useContext,
  createContext,
} from 'react';

import { DateObject } from 'react-multi-date-picker';
import persianCalendar from 'react-date-object/calendars/persian';
import persianLanguage from 'react-date-object/locales/persian_fa';
import gregorianCalendar from 'react-date-object/calendars/gregorian';
import gregorianLanguage from 'react-date-object/locales/gregorian_en';

type DatePicker = {
  calendarType: CalendarType;
  value: undefined | DateObject[];
  confirmedValue: undefined | DateObject[];
};

type CalendarType = 'persian' | 'gregorian';
type DatePickerAction =
  | { type: 'calendar-type'; payload: undefined }
  | { type: 'value'; payload: undefined | DateObject[] }
  | { type: 'confirmed-value'; payload: undefined | DateObject[] };

const initialState: DatePicker = {
  value: undefined,
  calendarType: 'persian',
  confirmedValue: undefined,
};

// --------------------------------------

const DatePickerReducer = (
  state: DatePicker,
  action: DatePickerAction,
): DatePicker => {
  const { type, payload } = action;

  switch (type) {
    case 'value':
      return {
        ...state,
        value: payload,
      };

    case 'confirmed-value':
      return {
        ...state,
        confirmedValue: payload,
      };

    case 'calendar-type':
      return {
        ...state,
        calendarType:
          state.calendarType === 'persian' ? 'gregorian' : 'persian',
      };

    default:
      return state;
  }
};

const DatePickerContext = createContext<DatePicker | undefined>(undefined);
const DatePickerDispatchContext = createContext<
  React.Dispatch<DatePickerAction> | undefined
>(undefined);

// --------------------------------------

export const DatePickerProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const [state, dispatch] = useReducer(DatePickerReducer, initialState);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const startDate = params.get('start-date');
    const endDate = params.get('end-date');

    const calendarType =
      (sessionStorage.getItem('calendar-type') as CalendarType) || 'persian';

    const calendarDetail = {
      calendar:
        calendarType === 'persian' ? persianCalendar : gregorianCalendar,
      locale: calendarType === 'persian' ? persianLanguage : gregorianLanguage,
    };

    let defaultRange;
    const dateInfo = {
      locale: calendarDetail.locale,
      calendar: calendarDetail.calendar,
    };

    if (startDate && endDate) {
      defaultRange = [
        new DateObject({
          ...dateInfo,
          date: startDate.replaceAll('-', '/'),
        }),

        new DateObject({
          ...dateInfo,
          date: endDate.replaceAll('-', '/'),
        }),
      ];
    } else {
      defaultRange = [
        new DateObject(dateInfo),
        new DateObject(dateInfo).add(1, 'days'),
      ];
    }

    dispatch({
      type: 'value',
      payload: defaultRange,
    });

    dispatch({
      type: 'confirmed-value',
      payload: defaultRange,
    });
  }, []);

  return (
    <DatePickerContext.Provider value={state}>
      <DatePickerDispatchContext.Provider value={dispatch}>
        {children}
      </DatePickerDispatchContext.Provider>
    </DatePickerContext.Provider>
  );
};

export const useDatePickerContext = () => {
  const context = useContext(DatePickerContext);
  if (context === undefined) {
    throw new Error(
      '"useDatePickerContext" must be used in "DatePickerProvider"',
    );
  }
  return context;
};

export const useDatePickerDispatch = () => {
  const context = useContext(DatePickerDispatchContext);
  if (context === undefined) {
    throw new Error(
      '"useDatePickerDispatch" must be used in "DatePickerProvider"',
    );
  }
  return context;
};

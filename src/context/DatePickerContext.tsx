import { DateObject } from 'react-multi-date-picker';
import { createContext, useReducer, useContext, ReactNode } from 'react';

type DatePicker = {
  value: undefined | DateObject[];
  confirmedValue: undefined | DateObject[];
};

type DatePickerAction =
  | { type: 'value'; payload: undefined | DateObject[] }
  | { type: 'confirmed-value'; payload: undefined | DateObject[] };

const initialState: DatePicker = {
  value: undefined,
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

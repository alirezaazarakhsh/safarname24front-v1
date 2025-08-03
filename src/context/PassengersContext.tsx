import {
  ReactNode,
  useEffect,
  useReducer,
  useContext,
  createContext,
} from 'react';

import { v4 as uuidv4 } from 'uuid';

type Passengers = {
  confirmedPassengers: { rooms: number; passengers: number };
  rooms: { id: string; adults: number; children: number }[];
};

type PassengersAction =
  | { type: 'add'; payload?: null }
  | {
      type: 'edit';
      payload: {
        id: string;
        action: 'increase' | 'decrease';
        property: 'adults' | 'children';
      };
    }
  | { type: 'remove'; payload: string }
  | {
      type: 'confirmed-passengers';
      payload: {
        rooms: number;
        passengers: number;
      };
    };

const MIN_ADULTS = 1;
const MIN_CHILDREN = 0;
const MAX_PASSENGERS = 5;

const getInitialState = (): Passengers => {
  const defaultValue = {
    confirmedPassengers: { rooms: 1, passengers: 1 },
    rooms: [{ id: uuidv4(), adults: 1, children: 0 }],
  };

  if (typeof window !== 'undefined') {
    const savedState = localStorage.getItem('passengers');
    return savedState ? JSON.parse(savedState) : defaultValue;
  }

  return defaultValue;
};

// --------------------------------------

const passengersReducer = (
  state: Passengers,
  action: PassengersAction,
): Passengers => {
  const { type, payload } = action;

  switch (type) {
    case 'add':
      return {
        ...state,
        rooms: [...state.rooms, { id: uuidv4(), adults: 1, children: 0 }],
      };

    case 'remove':
      return {
        ...state,
        rooms: state.rooms.filter((room) => room.id !== payload),
      };

    case 'edit': {
      return {
        ...state,
        rooms: state.rooms.map((passenger) => {
          if (passenger.id === payload.id) {
            const property =
              payload.property === 'adults' ? 'adults' : 'children';

            if (payload.action === 'increase') {
              return {
                ...passenger,
                [property]:
                  passenger[property] >= MAX_PASSENGERS
                    ? MAX_PASSENGERS
                    : passenger[property] + 1,
              };

              // ---
            } else {
              return {
                ...passenger,
                [property]:
                  payload.property === 'adults'
                    ? passenger[property] <= MIN_ADULTS
                      ? MIN_ADULTS
                      : passenger[property] - 1
                    : passenger[property] <= MIN_CHILDREN
                      ? MIN_CHILDREN
                      : passenger[property] - 1,
              };
            }

            //---------------
          } else return passenger;
        }),
      };
    }

    case 'confirmed-passengers':
      return {
        ...state,
        confirmedPassengers: payload,
      };

    default:
      return state;
  }
};

const PassengersContext = createContext<Passengers | undefined>(undefined);
const PassengersDispatchContext = createContext<
  React.Dispatch<PassengersAction> | undefined
>(undefined);

// --------------------------------------

export const PassengersProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const [state, dispatch] = useReducer(passengersReducer, getInitialState());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('passengers', JSON.stringify(state));
    }
  }, [state]);

  return (
    <PassengersContext.Provider value={state}>
      <PassengersDispatchContext.Provider value={dispatch}>
        {children}
      </PassengersDispatchContext.Provider>
    </PassengersContext.Provider>
  );
};

export const usePassengersContext = () => {
  const context = useContext(PassengersContext);
  if (context === undefined) {
    throw new Error(
      '"usePassengersContext" must be used in "PassengersProvider"',
    );
  }
  return context;
};

export const usePassengersDispatch = () => {
  const context = useContext(PassengersDispatchContext);
  if (context === undefined) {
    throw new Error(
      '"usePassengersDispatch" must be used in "PassengersProvider"',
    );
  }
  return context;
};

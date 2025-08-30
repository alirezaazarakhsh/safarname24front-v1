import { usePathname } from 'next/navigation';
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
    }
  | {
      type: 'set-rooms';
      payload: { id: string; adults: number; children: number }[];
    }
  | {
      type: 'reset';
      payload: undefined;
    };

const MIN_ADULTS = 1;
const MIN_CHILDREN = 0;
const MAX_TOTAL_PER_ROOM = 8;

const initialState = {
  confirmedPassengers: { rooms: 0, passengers: 0 },
  rooms: [{ id: uuidv4(), adults: 1, children: 0 }],
};

// -------------------------
// === Helpers

function decodeRooms(str: string) {
  function clampRoom(adults: number, children: number) {
    const total = adults + children;

    // حداقل 1 بزرگسال
    if (adults < MIN_ADULTS) adults = MIN_ADULTS;

    // اگر جمع بیشتر از 8 شد، بچه‌ها رو کم می‌کنیم
    if (total > MAX_TOTAL_PER_ROOM) {
      const extra = total - MAX_TOTAL_PER_ROOM;
      children = Math.max(MIN_CHILDREN, children - extra);
    }

    return { id: uuidv4(), adults, children };
  }

  return str
    .split('-')
    .slice(0, 3)
    .map((r) => {
      const [a, c] = r.split(',').map(Number);
      return clampRoom(isNaN(a) ? 1 : a, isNaN(c) ? 0 : c);
    });
}

function getTotals(rooms: { adults: number; children: number }[]) {
  return rooms.reduce(
    (acc, r) => {
      acc.adults += r.adults;
      acc.children += r.children;
      return acc;
    },
    { adults: 0, children: 0 },
  );
}

// -------------------------

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
        rooms: state.rooms.map((room) => {
          if (room.id === payload.id) {
            const total = room.adults + room.children;

            if (payload.action === 'increase') {
              // اگر سقف 8 نفر رد نشه
              if (total < MAX_TOTAL_PER_ROOM) {
                return {
                  ...room,
                  [payload.property]: room[payload.property] + 1,
                };
              }
              return room;
            } else {
              // کاهش
              if (payload.property === 'adults') {
                if (room.adults > MIN_ADULTS) {
                  return { ...room, adults: room.adults - 1 };
                }
              } else {
                if (room.children > MIN_CHILDREN) {
                  return { ...room, children: room.children - 1 };
                }
              }
              return room;
            }
          }
          return room;
        }),
      };
    }

    case 'confirmed-passengers':
      return {
        ...state,
        confirmedPassengers: payload,
      };

    case 'set-rooms':
      return {
        ...state,
        rooms: payload,
      };

    case 'reset':
      return {
        confirmedPassengers: { rooms: 0, passengers: 0 },
        rooms: [{ id: uuidv4(), adults: 1, children: 0 }],
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
  const [state, dispatch] = useReducer(passengersReducer, initialState);

  const pathname = usePathname();

  // === initial-state in first-render
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const passengersQuery = params.get('passengers');

    if (passengersQuery) {
      const rooms = decodeRooms(passengersQuery);
      dispatch({ type: 'set-rooms', payload: rooms });

      const totals = getTotals(rooms);
      dispatch({
        type: 'confirmed-passengers',
        payload: {
          rooms: rooms.length,
          passengers: totals.adults + totals.children,
        },
      });
    }
    // ===
    else {
      dispatch({
        type: 'reset',
        payload: undefined,
      });
    }
  }, [pathname]);

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

import { v4 as uuidv4 } from 'uuid';
import { createContext, useReducer, useContext, ReactNode } from 'react';

import {
  Search,
  MIN_ADULTS,
  MIN_CHILDREN,
  SearchAction,
  initialState,
  MAX_PASSENGERS,
} from './searchContextUtils';

// --------------------------------------

const SearchReducer = (state: Search, action: SearchAction): Search => {
  const { type, payload } = action;

  switch (type) {
    case 'PASSENGERS': {
      if (
        payload.actionType === 'INCREASE' ||
        payload.actionType === 'DECREASE'
      ) {
        return {
          ...state,
          passengers: {
            ...state.passengers,
            rooms: state.passengers.rooms.map((passenger) => {
              if (passenger.id === payload.id) {
                const condition =
                  payload.passengerType === 'ADULTS' ? 'adults' : 'children';

                // === INCREASE
                if (payload.actionType === 'INCREASE') {
                  return {
                    ...passenger,
                    [condition]:
                      passenger[condition] >= MAX_PASSENGERS
                        ? MAX_PASSENGERS
                        : passenger[condition] + 1,
                  };
                }

                // === DECREASE
                else if (payload.actionType === 'DECREASE') {
                  return {
                    ...passenger,
                    [condition]:
                      payload.passengerType === 'ADULTS'
                        ? passenger[condition] <= MIN_ADULTS
                          ? MIN_ADULTS
                          : passenger[condition] - 1
                        : passenger[condition] <= MIN_CHILDREN
                          ? MIN_CHILDREN
                          : passenger[condition] - 1,
                  };
                } else return passenger;

                //---------------
              } else return passenger;
            }),
          },
        };
      }

      // === ADD
      else if (payload.actionType === 'ADD') {
        return {
          ...state,
          passengers: {
            ...state.passengers,
            rooms: [
              ...state.passengers.rooms,
              { id: uuidv4(), adults: 1, children: 0 },
            ],
          },
        };
      }

      // === REMOVE
      else if (payload.actionType === 'REMOVE') {
        return {
          ...state,
          passengers: {
            ...state.passengers,
            rooms: state.passengers.rooms.filter(
              (passengers) => passengers.id !== payload.id,
            ),
          },
        };
      }

      // === CONFIRMED
      else if (payload.actionType === 'CONFIRMED-PASSENGERS') {
        return {
          ...state,
          passengers: {
            ...state.passengers,
            confirmedPeople: {
              rooms: payload.rooms,
              passengers: payload.passengers,
            },
          },
        };
      }
    }

    case 'CITY_OR_HOTEL': {
      // === CITY
      if (payload.actionType === 'CITY') {
        return {
          ...state,
          cityOrHotel: {
            ...state.cityOrHotel,
            values: {
              hotel: '',
              hotelSlug: '',
              city: payload.city,
              cityID: payload.cityID,
              citySlug: payload.citySlug,
              province: payload.province,
            },
          },
        };
      }

      // === HOTEL
      else if (payload.actionType === 'HOTEL') {
        return {
          ...state,
          cityOrHotel: {
            ...state.cityOrHotel,
            values: {
              cityID: null,
              citySlug: '',
              province: '',
              city: payload.city,
              hotel: payload.hotel,
              hotelSlug: payload.hotelSlug,
            },
          },
        };
      }

      // === CONFIRMED
      else if (payload.actionType === 'CONFIRMED-CITY-OR-HOTEL') {
        return {
          ...state,
          cityOrHotel: {
            ...state.cityOrHotel,
            confirmedValues: state.cityOrHotel.values,
          },
        };
      }

      // === INPUT-VALUE
      else if (payload.actionType === 'INPUT-VALUE') {
        return {
          ...state,
          cityOrHotel: {
            ...state.cityOrHotel,
            inputValue: payload.value,
          },
        };
      }

      // === CLEAR-INPUT-VALUE
      else if (payload.actionType === 'CLEAR-INPUT-VALUE') {
        return {
          ...state,
          cityOrHotel: {
            ...state.cityOrHotel,
            inputValue: '',
          },
        };
      }
    }

    case 'DATE': {
      // === DATE-VALUES
      if (payload.actionType === 'CONFIRMED-DATE') {
        return {
          ...state,
          date: {
            ...state.date,
            confirmedDate: payload.confirmedDate,
          },
        };
      }

      // === CONFIRMED-DATE
      else if (payload.actionType === 'DATE-VALUES') {
        return {
          ...state,
          date: {
            ...state.date,
            values: payload.values,
          },
        };
      }
    }

    default:
      return state;
  }
};

const SearchContext = createContext<Search | undefined>(undefined);
const SearchDispatchContext = createContext<
  React.Dispatch<SearchAction> | undefined
>(undefined);

// --------------------------------------

export const SearchProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const [state, dispatch] = useReducer(SearchReducer, initialState);

  return (
    <SearchContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('"useSearchContext" must be used in "SearchProvider"');
  }
  return context;
};

export const useSearchDispatch = () => {
  const context = useContext(SearchDispatchContext);
  if (context === undefined) {
    throw new Error('"useSearchDispatch" must be used in "SearchProvider"');
  }
  return context;
};

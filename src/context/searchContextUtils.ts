import { v4 as uuidv4 } from 'uuid';
import { DateObject } from 'react-multi-date-picker';

// --------------------------------------

type Search = {
  date: {
    values: undefined | DateObject[];
    confirmedDate: undefined | DateObject[];
  };
  cityOrHotel: {
    values: {
      city: string;
      hotel: string;
      citySlug: string;
      province: string;
      hotelSlug: string;
      cityID: number | null;
    };
    confirmedValues: {
      city: string;
      hotel: string;
      citySlug: string;
      province: string;
      hotelSlug: string;
      cityID: number | null;
    };
    inputValue: string;
  };
  passengers: {
    confirmedPeople: { rooms: number; passengers: number };
    rooms: { id: string; adults: number; children: number }[];
  };
};

type SearchAction =
  | {
      type: 'PASSENGERS';
      payload:
        | {
            id: string;
            actionType: 'INCREASE' | 'DECREASE';
            passengerType: 'ADULTS' | 'CHILDREN';
          }
        | { actionType: 'ADD' }
        | { id: string; actionType: 'REMOVE' }
        | {
            rooms: number;
            passengers: number;
            actionType: 'CONFIRMED-PASSENGERS';
          };
    }
  | {
      type: 'CITY_OR_HOTEL';
      payload:
        | {
            city: string;
            citySlug: string;
            province: string;
            actionType: 'CITY';
            cityID: number | null;
          }
        | {
            city: string;
            hotel: string;
            hotelSlug: string;
            actionType: 'HOTEL';
          }
        | { actionType: 'CLEAR-INPUT-VALUE' }
        | { actionType: 'CONFIRMED-CITY-OR-HOTEL' }
        | { actionType: 'INPUT-VALUE'; value: string };
    }
  | {
      type: 'DATE';
      payload:
        | {
            values: DateObject[] | undefined;
            actionType: 'DATE-VALUES';
          }
        | {
            confirmedDate: DateObject[];
            actionType: 'CONFIRMED-DATE';
          };
    };

const initialState: Search = {
  cityOrHotel: {
    values: {
      city: '',
      hotel: '',
      cityID: null,
      citySlug: '',
      province: '',
      hotelSlug: '',
    },
    confirmedValues: {
      city: '',
      hotel: '',
      cityID: null,
      citySlug: '',
      province: '',
      hotelSlug: '',
    },
    inputValue: '',
  },
  passengers: {
    confirmedPeople: { rooms: 0, passengers: 0 },
    rooms: [{ id: uuidv4(), adults: 1, children: 0 }],
  },
  date: { values: undefined, confirmedDate: undefined },
};

const MIN_ADULTS = 1;
const MIN_CHILDREN = 0;
const MAX_PASSENGERS = 5;

export {
  initialState,
  MIN_ADULTS,
  MIN_CHILDREN,
  MAX_PASSENGERS,
  type Search,
  type SearchAction,
};

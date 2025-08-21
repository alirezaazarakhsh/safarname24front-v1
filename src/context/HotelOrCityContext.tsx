import { usePathname } from 'next/navigation';
import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

type THotelOrCity = {
  city: string;
  hotel: string;
  province: string;
  hotelSlug: string;
};

type HotelOrCity = {
  inputValue: string;
  value: THotelOrCity;
  confirmedValue: THotelOrCity;
};

type HotelOrCityAction =
  | {
      type: 'city';
      payload: {
        city: string;
        province: string;
      };
    }
  | {
      type: 'hotel';
      payload: {
        city: string;
        hotel: string;
        hotelSlug: string;
      };
    }
  | { type: 'input-value'; payload: string }
  | { type: 'confirmed-value'; payload?: undefined }
  | { type: 'clear-input-value'; payload?: undefined }
  | {
      type: 'first-render';
      payload: {
        city: string;
        province: string;
      };
    }
  | {
      type: 'reset';
      payload: undefined;
    };

const hotelOrCityState = {
  city: '',
  hotel: '',
  citySlug: '',
  province: '',
  hotelSlug: '',
};

const initialState: HotelOrCity = {
  inputValue: '',
  value: hotelOrCityState,
  confirmedValue: hotelOrCityState,
};

// -----------------------------

const HotelOrCityReducer = (
  state: HotelOrCity,
  action: HotelOrCityAction,
): HotelOrCity => {
  const { type, payload } = action;

  switch (type) {
    case 'city':
      return {
        ...state,
        value: {
          hotel: '',
          hotelSlug: '',
          city: payload.city,
          province: payload.province,
        },
      };

    case 'hotel':
      return {
        ...state,
        value: {
          province: '',
          city: payload.city,
          hotel: payload.hotel,
          hotelSlug: payload.hotelSlug,
        },
      };

    case 'confirmed-value':
      return { ...state, confirmedValue: state.value };

    case 'input-value':
      return { ...state, inputValue: payload };

    case 'clear-input-value':
      return { ...state, inputValue: '' };

    case 'first-render':
      return {
        ...state,
        value: {
          hotel: '',
          hotelSlug: '',
          city: payload.city,
          province: payload.province,
        },
        confirmedValue: {
          hotel: '',
          hotelSlug: '',
          city: payload.city,
          province: payload.province,
        },
      };

    case 'reset':
      return {
        inputValue: '',
        value: hotelOrCityState,
        confirmedValue: hotelOrCityState,
      };

    default:
      return state;
  }
};

const HotelOrCityContext = createContext<HotelOrCity | undefined>(undefined);
const HotelOrCityDispatchContext = createContext<
  React.Dispatch<HotelOrCityAction> | undefined
>(undefined);

// --------------------------------------

export const HotelOrCityProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const [state, dispatch] = useReducer(HotelOrCityReducer, initialState);
  const pathname = usePathname();

  // === Initial-state in first-render
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const city = params.get('city');
    const province = params.get('province');

    if (city && province) {
      dispatch({
        type: 'first-render',
        payload: { city, province },
      });
    }
  }, []);

  // === Reset state in home-page
  useEffect(() => {
    if (pathname === '/') {
      dispatch({
        type: 'reset',
        payload: undefined,
      });
    }
  }, [pathname]);

  return (
    <HotelOrCityContext.Provider value={state}>
      <HotelOrCityDispatchContext.Provider value={dispatch}>
        {children}
      </HotelOrCityDispatchContext.Provider>
    </HotelOrCityContext.Provider>
  );
};

export const useHotelOrCityContext = () => {
  const context = useContext(HotelOrCityContext);
  if (context === undefined) {
    throw new Error(
      '"useHotelOrCityContext" must be used in "HotelOrCityProvider"',
    );
  }
  return context;
};

export const useHotelOrCityDispatch = () => {
  const context = useContext(HotelOrCityDispatchContext);
  if (context === undefined) {
    throw new Error(
      '"useHotelOrCityDispatch" must be used in "HotelOrCityProvider"',
    );
  }
  return context;
};

'use client';

import { createContext, useContext, useState } from 'react';

// ------------------------------

type HotelQueryContextType = {
  queryState: {
    isPending: boolean;
    totalLength: null | number;
  };
  handleSetQueryState: (isPending: boolean, totalLength: number | null) => void;
};

const initialState: { isPending: boolean; totalLength: null | number } = {
  isPending: true,
  totalLength: null,
};

const HotelQueryContext = createContext<HotelQueryContextType | undefined>(
  undefined,
);

export const HotelQueryProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [queryState, setQueryState] = useState(initialState);

  function handleSetQueryState(isPending: boolean, totalLength: number | null) {
    setQueryState({ isPending, totalLength });
  }

  return (
    <HotelQueryContext.Provider value={{ queryState, handleSetQueryState }}>
      {children}
    </HotelQueryContext.Provider>
  );
};

export const useHotelQuery = () => {
  const context = useContext(HotelQueryContext);
  if (!context) {
    throw new Error('useHotelQuery must be used within a HotelQueryProvider');
  }
  return context;
};

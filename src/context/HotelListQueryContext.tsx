'use client';

import { createContext, useContext, useState, useCallback, useMemo } from 'react';

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

  // ۱. تثبیت رفرنس تابع با useCallback
  // ۲. جلوگیری از آپدیت مجدد اگر مقادیر دقیقاً مثل قبل باشند (Bail out)
  const handleSetQueryState = useCallback(
    (isPending: boolean, totalLength: number | null) => {
      setQueryState((prev) => {
        // اگر دیتا تغییری نکرده، اصلاً استیت را آپدیت نکن تا رندر اضافه رخ ندهد
        if (prev.isPending === isPending && prev.totalLength === totalLength) {
          return prev;
        }
        return { isPending, totalLength };
      });
    },
    []
  );

  // ۳. تثبیت رفرنس value با useMemo برای جلوگیری از رندر بیهوده کامپوننت‌های فرزند
  const value = useMemo(
    () => ({
      queryState,
      handleSetQueryState,
    }),
    [queryState, handleSetQueryState]
  );

  return (
    <HotelQueryContext.Provider value={value}>
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
'use client';

import { createContext, useContext, useState } from 'react';

// ------------------------------

type TPaymentLoading = {
  isLoading: boolean;
  handleToggleLoading: () => void;
};

const PaymentLoadingContext = createContext<TPaymentLoading | undefined>(
  undefined,
);

export const PaymentLoadingProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [isLoading, setLoading] = useState(false);
  const handleToggleLoading = () => setLoading((prevValue) => !prevValue);

  return (
    <PaymentLoadingContext.Provider value={{ isLoading, handleToggleLoading }}>
      {children}
    </PaymentLoadingContext.Provider>
  );
};

export const usePaymentLoading = () => {
  const context = useContext(PaymentLoadingContext);
  if (!context) {
    throw new Error(
      'usePaymentLoading must be used within a PaymentLoadingProvider',
    );
  }
  return context;
};

'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  triggerMobileSearch: () => void;
  resetMobileSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchSettingProvider({ children }: { children: ReactNode }) {
  const [shouldFetchMobile, setShouldFetchMobile] = useState(false);

  const triggerMobileSearch = () => {
    setShouldFetchMobile(true);
  };

  const resetMobileSearch = () => {
    setShouldFetchMobile(false);
  };

  return (
    <SearchContext.Provider value={{ triggerMobileSearch, resetMobileSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      'useSearchContext must be used within a SearchSettingProvider',
    );
  }
  return context;
}

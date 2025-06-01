import { createContext, useContext, useState, ReactNode } from 'react';

interface TUserAccountContext {
  isOpen: boolean;
  toggle: () => void;
}

const UserAccountContext = createContext<TUserAccountContext | undefined>(
  undefined,
);

// =================================

export const UserAccountProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <UserAccountContext.Provider value={{ isOpen, toggle }}>
      {children}
    </UserAccountContext.Provider>
  );
};

export const useUserAccountContext = () => {
  const context = useContext(UserAccountContext);
  if (!context)
    throw new Error('useToggle must be used within a ToggleProvider');
  return context;
};

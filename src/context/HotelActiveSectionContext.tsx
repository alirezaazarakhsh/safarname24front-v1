import React, { createContext, useContext, useState, ReactNode } from 'react';

type ActiveSectionContextType = {
  activeSection: string;
  updateActiveSection: (sectionId: string) => void;
};

const ActiveSectionContext = createContext<
  ActiveSectionContextType | undefined
>(undefined);

export const HotelActiveSectionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [activeSection, setActiveSection] = useState('');

  const updateActiveSection = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <ActiveSectionContext.Provider
      value={{ activeSection, updateActiveSection }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
};

export const useActiveSection = () => {
  const context = useContext(ActiveSectionContext);
  if (!context) {
    throw new Error(
      'useActiveSection باید داخل HotelActiveSectionProvider استفاده شود',
    );
  }
  return context;
};

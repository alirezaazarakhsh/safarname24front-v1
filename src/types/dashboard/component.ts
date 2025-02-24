// Importing part
import { ReactNode } from 'react';

// Creating and exporting type of components of dashboard pages
export interface RootLayoutPropsType {
  children: ReactNode;
}

export interface PageComponentPropsType {
  children: ReactNode;
  className?: string;
}

export interface FilterComponentPropsType {
  className?: string;
}

export interface UserStatusComponentPropsType {
  className?: string;
}

export interface LatestReservationsTableProps {
  className?: string;
}

export interface LatestTicketsTableProps {
  className?: string;
}

export interface UserStatusInfoComponentPropsType {
  className?: string;
  data: {
    icon: ReactNode;
    title: string;
    value: {
      unit: string;
      count: number;
    };
    barMode: {
      unit: string;
      value: {
        date: string;
        value: number;
      }[];
    };
  };
}

export interface MobileProfileComponentPropsType {
  isOpened?: boolean;
}

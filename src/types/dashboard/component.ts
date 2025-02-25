// Importing part
import { InputHTMLAttributes, ReactNode } from 'react';
import { IconsName } from '../SvgProp';
import { type ClassValue } from 'clsx';

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

export interface ReservationsFilterComponentPropsType {
    className?: string;
} 

export interface IconInputComponentPropsType extends InputHTMLAttributes<HTMLInputElement> {
    icon: IconsName;
    wholeClassName?: string;
}

// Importing part
import { InputHTMLAttributes, ReactNode } from 'react';
import { IconsName } from '../SvgProp';

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
  closeFn: () => void;
}

export interface ReservationsFilterComponentPropsType {
  className?: string;
  dataNotEmpty: boolean;
}

export interface IconInputComponentPropsType
  extends InputHTMLAttributes<HTMLInputElement> {
  icon: IconsName;
  wholeClassName?: string;
}

export interface AllFactorsTableComponentPropsType {
  className?: string;
  data: {
    id: number;
    code: string;
    hotel: string;
    enterAt: string;
    exitAt: string | null;
    passengers: string;
    financialStatus: 'payed' | 'cancled' | 'pending';
  }[];
}

export interface CustomPaginationComponentPropsType {
  className?: string;
  count: number;
  onChange?: (index: number) => void;
}

export interface DialogComponentPropsType {
  isOpened?: boolean;
  closeFn?: () => void;
}

export interface ToastProps {
  title: string;
  description: string;
}

export interface CircluarTimerComponentPropsType {
  className?: string;
  duration: number;
}

export interface CanclationReasonDialogComponentProps
  extends DialogComponentPropsType {
  openFailedDialog: () => void;
  openAcceptDialog: () => void;
}

export interface HotelAcceptSectionPropsType {
  className?: string;
  data: {
    reserver: string;
    createdAt: string;
    codePeigiri: string;
    phoneNumber: string;
    enterAt: string;
    exitAt: string | null;
  }[];
}

export interface RoomsSectionPropsType {
  className?: string;
  data: {
    info: {
      hotelName: string;
      timeSpan: 8; // in Nights
      meals: string;
      enteranceHalfCharge: boolean;
      exitHalfCharge: boolean;
      reserver: string;
    };
    passenger: string[];
  }[];
}

export interface CanclationErrorDrawerPropsType {
  isOpened?: boolean;
  closeFn?: () => void;
  title: string;
  description: string;
}

export interface IconedPriceComponentPropsType {
  title: string;
  price: number;
  icon: IconsName;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
}

export interface FinancialSectionComponentPropsType {
  className?: string;
}

export interface CheckboxItemComponentPropsType {
  onClick?: () => void;
  disabled?: boolean;
  checked: boolean;
  title: string;
}

export interface SwitchItemComponentPropsType {
  onClick?: () => void;
  disabled?: boolean;
  isOn?: boolean;
  title: string;
}

export interface customChargeComponentPropsType {
  disabled: boolean;
  onSubmit: (value: number) => void;
}

export interface InvoiceComponentPropsType {
  value: number;
}

export interface TransactionsTablePropsType {
  className?: string;
  data: {
    codePeigiri: string;
    price: number;
    createdAt: string;
    bank: string;
    status: 'successfull' | 'unsucessfull';
  }[];
}

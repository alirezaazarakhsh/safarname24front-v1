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
}

export interface ReservationsFilterComponentPropsType {
    className?: string;
    dataNotEmpty: boolean;
}

export interface IconInputComponentPropsType extends InputHTMLAttributes<HTMLInputElement> {
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

// Forcing next.js to render this component as client side component 
'use client';

// Importing part 
import { ReservationsFilterComponentPropsType } from '@/types/dashboard/component';
import { ReactNode } from 'react';
import { cn } from "@/utils/utils";
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import IconInput from '../ui/iconInput';
import {Button} from '@/components/ui/button';

// Creating and exporting Filter component as default
export default function Filter({ className }: ReservationsFilterComponentPropsType): ReactNode {
    // Returning JSX 
    return (
        <section>
            <div
                className={cn(
                    'lg:flex block lg:items-center lg:justify-between lg:gap-5 gap-[17px]',
                    className,
                )}
            >
                <span className="lg:block hidden truncate text-right w-full font-bold text-cs85 text-black">
                    داشبورد سفرنامه
                </span>
                <div className="lg:flex grid grid-cols-4 items-center justify-end lg:gap-4 gap-2">
                    <IconInput
                        icon="SearchStatus"
                        placeholder="جستجو مسافر، هتل"
                    />
                    <Button className="flex items-center justify-center gap-2 lg:h-8 h-10 text-black bg-white lg:rounded-md rounded-lg px-3 hover:bg-white">
                        <IconsaxIcons name="Add" className="lg:w-3 lg:h-3 w-4 h-4 text-gray-600" />
                        <span className="block text-right truncate font-normal whitespace-nowrap text-sm text-current">ثبت رزرو</span>
                    </Button>
                </div>
            </div>
        </section>
    );
}

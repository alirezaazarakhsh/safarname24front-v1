'use client';

import { TextField as CustomInput } from '@/components/common/input-custom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { InputGroup } from '@/components/ui/input-group';
import {
  Calendar1,
  Calendar1Icon,
  CalendarRange,
  LocationEdit,
  MapIcon,
  MapPin,
  Moon,
  Search,
  SearchIcon,
} from 'lucide-react';
import React, { useState } from 'react';
import { cn } from 'cn';
import { Calendar } from '@/features/calendar/calendar';
import { DateObject } from 'react-multi-date-picker';
import { DateRange } from '@/features/calendar/use-calendar';

// ------------------------------

export default function HeroSearch() {
  const [dates, setDates] = useState<DateRange>([null, null]);
  console.log('dates', dates);

  return (
    <div
      className={cn(
        'relative z-10 grid w-full gap-6 px-4 py-8 sm:rounded-4xl sm:p-7',
        'bg-sidebar mx-auto shadow-xl/5',
        'sm:-mt-28 sm:max-lg:max-w-10/12 lg:mx-auto lg:-mt-12 lg:max-w-[95%] lg:grid-cols-[1fr_1.4fr_auto] lg:items-end lg:gap-4 xl:max-w-10/12 xl:rounded-[1.5rem]',
      )}
    >
      <div className="flex flex-col gap-4">
        <Label className="gap-1.5 px-1 text-sm/3 font-semibold">
          <MapPin className="size-4.5" />
          <span>انتخاب مقصد</span>
        </Label>

        <Input
          placeholder="هتل یا شهر مقصد را انتخاب کنید"
          className="border-primary/15 h-12"
        />
      </div>

      <Calendar
        initialRange={dates}
        onChange={(newDates) => setDates(newDates)}
      />

      <Button className={'h-12 lg:w-40'}>
        <span className="font-semibold">جستجو</span>
        {/* <Search /> */}
      </Button>
    </div>
  );
}

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

// ------------------------------

export default function HeroSearch() {
  const [dates, setDates] = useState<[DateObject | null]>([null]);
  console.log('dates', dates);

  return (
    <div
      className={cn(
        'relative z-10 mx-auto grid w-full gap-6 rounded-4xl p-6 lg:gap-4',
        'bg-sidebar shadow-xl/5',
        'sm:-mt-20 sm:max-lg:max-w-10/12 lg:-mt-12 lg:grid-cols-[1fr_1.2fr_auto_auto] lg:items-end xl:max-w-10/12 xl:rounded-[1.5rem]',
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
        // onChange={({ startDate, endDate }) => {
        //   setBookingDates({ startDate, endDate });
        // }}
        onChange={(newDates: [DateObject | null]) => setDates(newDates)}
      />

      <div className="flex flex-col gap-4">
        <Label className="gap-1.5 px-1 text-sm/3 font-semibold">
          <Moon className="size-4.5" />
          <span>مدت اقامت</span>
        </Label>

        <div className="border-primary/15 flex h-12 w-32 items-center rounded-xl border px-4">
          <span className="text-sm font-bold">{5} شب</span>
        </div>
      </div>

      <Button className={'h-12 lg:w-40'}>
        <span className="font-semibold">جستجو</span>
        {/* <Search /> */}
      </Button>
    </div>
  );
}

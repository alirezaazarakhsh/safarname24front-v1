import { TextField as CustomInput } from '@/components/common/input-custom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { InputGroup } from '@/components/ui/input-group';
import {
  Calendar,
  Calendar1,
  Calendar1Icon,
  CalendarRange,
  LocationEdit,
  MapIcon,
  MapPin,
  Search,
  SearchIcon,
} from 'lucide-react';
import React from 'react';
import { cn } from 'cn';

// ------------------------------

export default function HeroSearch() {
  return (
    <div
      className={cn(
        'relative z-10 mx-auto grid w-full grid-cols-2 gap-4 rounded-4xl p-6',
        'bg-sidebar shadow-xl/5',
        'sm:-mt-20 sm:max-lg:max-w-10/12 lg:-mt-12 lg:grid-cols-[1fr_1fr_1fr_auto] xl:max-w-10/12 xl:rounded-[1.5rem]',
      )}
    >
      <div className="relative col-span-2 lg:col-span-1">
        <MapPin className="text-muted-foreground absolute top-1/2 right-4 size-5 -translate-y-1/2" />

        <Input
          id="location"
          className="h-12 border-2 pr-11"
          placeholder="شهر یا هتل مقصد"
        />
      </div>

      <div className="relative">
        <CalendarRange className="text-muted-foreground absolute top-1/2 right-4 size-5 -translate-y-1/2" />

        <Input
          id="location"
          className="h-12 border-2 pr-11"
          placeholder="تاریخ ورود"
        />
      </div>

      <div className="relative">
        <CalendarRange className="text-muted-foreground absolute top-1/2 right-4 size-5 -translate-y-1/2" />

        <Input
          id="location"
          className="h-12 border-2 pr-11"
          placeholder="تاریخ خروج"
        />
      </div>

      <Button className={'col-span-2 h-12 lg:col-span-1 lg:w-40'}>
        <span className="font-semibold">جستجو</span>
        {/* <Search /> */}
      </Button>
    </div>
  );
}

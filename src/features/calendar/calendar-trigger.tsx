import { Label } from '@/components/ui/label';
import { DateObject } from 'react-multi-date-picker';
import { CalendarRange, ChevronDown } from 'lucide-react';

type Props = {
  nights: number;
  tempDates: DateObject[];
};

// ------------------------------

export default function CalendarTrigger(props: Props) {
  const { nights, tempDates } = props;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 px-1 text-sm/3">
        <CalendarRange className="size-4" />
        <Label className="font-semibold">انتخاب تاریخ اقامت</Label>

        {tempDates?.length === 2 && nights > 0 && (
          <span className="mr-auto text-sm/3 font-bold text-rose-500 sm:mr-0">
            ({nights} شب)
          </span>
        )}
      </div>

      <div className="border-primary/15 divide-primary/15 grid h-12 grid-cols-2 divide-x overflow-hidden rounded-xl border">
        <div className="flex items-center justify-between px-4 text-sm font-semibold">
          {tempDates?.length === 2 ? (
            <>
              <span className="text-muted-foreground">تاریخ ورود</span>
              <span>{tempDates[0].format('DD MMMM')}</span>
            </>
          ) : (
            <>
              <span className="text-muted-foreground font-medium">
                تاریخ ورود
              </span>

              <ChevronDown className="text-muted-foreground size-4" />
            </>
          )}
        </div>

        <div className="flex items-center justify-between px-4 text-sm font-semibold">
          {tempDates?.length === 2 ? (
            <>
              <span className="text-muted-foreground">تاریخ خروج</span>
              <span>{tempDates[1].format('DD MMMM')}</span>
            </>
          ) : (
            <>
              <span className="text-muted-foreground font-medium">
                تاریخ خروج
              </span>

              <ChevronDown className="text-muted-foreground size-4" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

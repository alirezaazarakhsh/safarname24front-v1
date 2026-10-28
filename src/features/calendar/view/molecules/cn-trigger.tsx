import { Label } from '@/components/ui/label';
import { DateObject } from 'react-multi-date-picker';
import { CalendarRange, ChevronDown, Moon } from 'lucide-react';
import { forwardRef } from 'react';

type Props = {
  nights: number;
  tempDates: DateObject[];
  className?: string;
};

// ------------------------------

export default function CnTrigger(props: Props) {
  const { nights, tempDates, className } = props;
  const isSelected = tempDates?.length === 2;

  return (
    <div className="flex flex-col gap-3">
      {/* هدر: لیبل و بَج نرم شب اقامت (بیرون از کلیک باکس) */}
      <div className="flex items-center gap-2 px-1 text-sm">
        <CalendarRange className="text-muted-foreground size-4" />
        <Label className="text-foreground font-semibold">
          انتخاب تاریخ اقامت
        </Label>

        {isSelected && nights > 0 && (
          <span className="bg-secondary text-secondary-foreground mr-auto inline-flex items-center gap-1 rounded-full px-2.5 py-2 text-xs/3 font-semibold transition-all sm:mr-1">
            <Moon className="size-3 fill-amber-500 text-amber-500" />
            <span>{nights} شب اقامت</span>
          </span>
        )}
      </div>

      {/* باکس دوگانه تاریخ (این بخش اصل تریگر است) */}
      <CalendarTriggerBox
        tempDates={tempDates}
        isSelected={isSelected}
        className={className}
      />
    </div>
  );
}

// ------------------------------
// بخش باکس تعاملی که فقط خودش تریگر می‌شود
interface TriggerBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  tempDates: DateObject[];
  isSelected: boolean;
}

export const CalendarTriggerBox = forwardRef<HTMLDivElement, TriggerBoxProps>(
  ({ tempDates, isSelected, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        {...rest}
        className={`group bg-input/10 hover:bg-input/20 grid min-h-12 w-full cursor-pointer grid-cols-2 divide-x overflow-hidden rounded-xl border transition-colors select-none ${
          className ?? ''
        }`}
      >
        {/* ستون تاریخ ورود */}
        <div className="flex flex-col justify-center gap-1.5 px-4 py-2 transition-colors md:flex-row md:items-center md:justify-between">
          <span className="text-muted-foreground text-xs font-semibold md:text-sm">
            تاریخ ورود
          </span>

          {isSelected ? (
            <span className="text-foreground text-sm font-bold md:text-sm">
              {tempDates[0].format('dddd DD MMMM')}
            </span>
          ) : (
            <div className="text-muted-foreground flex-center gap-1.5">
              <span className="text-sm font-medium">انتخاب کنید</span>
              <ChevronDown className="size-3.5 sm:size-4" />
            </div>
          )}
        </div>

        {/* ستون تاریخ خروج */}
        <div className="flex flex-col justify-center gap-1.5 px-4 py-2 transition-colors md:flex-row md:items-center md:justify-between">
          <span className="text-muted-foreground text-xs font-semibold md:text-sm">
            تاریخ خروج
          </span>

          {isSelected ? (
            <span className="text-foreground text-sm font-bold md:text-sm">
              {tempDates[1].format('dddd DD MMMM')}
            </span>
          ) : (
            <div className="text-muted-foreground flex-center gap-1.5">
              <span className="text-sm font-medium">انتخاب کنید</span>
              <ChevronDown className="size-3.5 sm:size-4" />
            </div>
          )}
        </div>
      </div>
    );
  },
);

CalendarTriggerBox.displayName = 'CalendarTriggerBox';

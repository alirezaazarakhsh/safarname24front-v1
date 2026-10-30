import React from 'react';
import { MapPin, Building2, Star, Check } from 'lucide-react';
import { Destination } from '../../model/types';

interface DestinationItemRowProps {
  item: Destination;
  isSelected: boolean;
  onSelect: (item: Destination) => void;
}

export const DestinationItemRow: React.FC<DestinationItemRowProps> = ({
  item,
  isSelected,
  onSelect,
}) => {
  const isCity = item.type === 'city';

  return (
    <div
      onClick={() => onSelect(item)}
      className={`group flex h-16 cursor-pointer items-center justify-between px-4 transition-colors sm:px-6 ${
        isSelected
          ? 'bg-accent text-accent-foreground font-medium'
          : 'hover:bg-muted text-foreground'
      }`}
    >
      {/* بخش راست: آیکون + عنوان و زیرعنوان */}
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex-center text-muted-foreground shrink-0 rounded-lg transition-colors ${
            isSelected ? '' : 'text-muted-foreground'
          }`}
        >
          {isCity ? (
            <MapPin className="size-6" />
          ) : (
            <Building2 className="size-6" />
          )}
        </div>

        <div className="min-w-0">
          <div className="truncate text-sm leading-tight font-semibold">
            {isCity ? item.city : item.hotel}
          </div>

          <div className="text-muted-foreground mt-1.5 truncate text-xs font-medium">
            {isCity
              ? `استان ${item.province}`
              : `${item.city}، ${item.address}`}
          </div>
        </div>
      </div>

      {/* بخش چپ (انتهای آیتم): تعداد ستاره / اقامتگاه + تیک انتخاب */}
      <div className="mr-2 flex shrink-0 items-center gap-2">
        {isCity && item.accommodationsCount && (
          <span className="text-muted-foreground bg-muted rounded-md px-2.5 py-1 text-xs font-medium group-hover:bg-transparent">
            {item.accommodationsCount} اقامتگاه
          </span>
        )}

        {
          !isCity && item.stars && (
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star key={i} className="size-3 fill-current text-amber-500" />
              ))}
            </div>
          )
          // <div className="flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
          //   <span>{item.stars}</span>
          // </div>
        }

        {/* آیکون تایید در صورت انتخاب شدن */}
        {/* {isSelected && (
          <Check className="text-primary animate-in fade-in h-4 w-4 shrink-0" />
        )} */}
      </div>
    </div>
  );
};

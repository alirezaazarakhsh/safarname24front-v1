import React from 'react';
import { Destination, DestinationState } from '../../model/types';
import { DestinationItemRow } from '../molecules/destination-item-row';
import { DestinationEmptyState } from '../molecules/destination-empty-state';
import { cn } from 'cn';
import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DestinationListProps {
  items: Destination[];
  selectedItem: DestinationState | null;
  onSelect: (item: Destination) => void;
  isSearching: boolean; // بر اساس اینکه searchTerm خالی است یا دارد سرچ می‌کند
  className?: string;
}

export const DestinationList: React.FC<DestinationListProps> = ({
  items,
  selectedItem,
  onSelect,
  isSearching,
  className,
}) => {
  if (items.length === 0) {
    return <DestinationEmptyState />;
  }

  return (
    <div className={cn('space-y-3', className)}>
      <div className="text-muted-foreground flex h-4 items-center justify-between px-4 text-xs font-medium sm:px-6">
        {!isSearching ? (
          <div className="text-foreground flex items-center gap-2">
            <Sparkles className="size-3.5 text-amber-500" />
            <span>مقصدهای پیشنهادی و پرطرفدار</span>
          </div>
        ) : (
          <>
            <span>نتایج جستجو</span>

            <div className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 font-semibold tracking-wide">
              {items?.length} مورد
            </div>
          </>
        )}
      </div>

      {/* مپ شدن یکپارچه آیتم‌ها (ترکیب شهر و هتل بدون تقسیم‌بندی جداگانه) */}
      <div className="scrollbar-custom h-96 overflow-y-auto pb-4">
        {items.map((item) => (
          <DestinationItemRow
            key={item.id}
            item={item}
            isSelected={selectedItem?.slug === item.slug}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

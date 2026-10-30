import React from 'react';
import { SearchX } from 'lucide-react';

interface DestinationEmptyStateProps {
  message?: string;
}

export const DestinationEmptyState: React.FC<DestinationEmptyStateProps> = ({
  message = 'موردی با این مشخصات پیدا نشد',
}) => {
  return (
    <div className="text-muted-foreground flex h-full min-h-[240px] flex-col items-center justify-center gap-2.5 p-4">
      <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
        <SearchX className="text-muted-foreground h-6 w-6" />
      </div>
      <p className="text-foreground text-sm font-medium">{message}</p>
      <span className="text-muted-foreground text-xs">
        نام شهر یا هتل دیگری را امتحان کنید
      </span>
    </div>
  );
};

import { Skeleton } from '@/components/ui/skeleton';

// ------------------------------

export function Loading() {
  return Array(4)
    .fill(null)
    .map((_, index) => <Skeleton key={index} className="h-7 rounded-lg" />);
}

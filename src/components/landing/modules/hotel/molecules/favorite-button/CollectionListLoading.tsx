import { Skeleton } from '@/components/ui/skeleton';

// -----------------------------

export function CollectionListLoading() {
  return Array(10)
    .fill(null)
    .map((_, index) => (
      <div key={index} className="h-16 flex gap-4">
        <Skeleton className="w-16 aspect-square" />

        <div className="w-20 flex flex-col justify-center gap-4">
          <Skeleton className="h-4 rounded-md" />
          <Skeleton className="h-4 rounded-md" />
        </div>
      </div>
    ));
}

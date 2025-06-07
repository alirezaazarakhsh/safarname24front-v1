import { cn } from '@/utils/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-lg bg-zinc-200/70', className)}
      {...props}
    />
  );
}

export { Skeleton };

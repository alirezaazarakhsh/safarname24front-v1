import { useCallback, useMemo, useState } from 'react';

interface UseShowMoreOptions {
  initialCount?: number;
  step?: number;
}

export function useShowMore<T>(
  items: T[],
  { initialCount = 6, step = 6 }: UseShowMoreOptions = {},
) {
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const visibleItems = useMemo(
    () => items.slice(0, visibleCount),
    [items, visibleCount],
  );

  const hasMore = visibleCount < items.length;

  const showMore = useCallback(() => {
    setVisibleCount((prev) => prev + step);
  }, [step]);

  const reset = useCallback(() => {
    setVisibleCount(initialCount);
  }, [initialCount]);

  return {
    visibleItems,
    visibleCount,
    totalCount: items.length,
    hasMore,
    showMore,
    reset,
  };
}

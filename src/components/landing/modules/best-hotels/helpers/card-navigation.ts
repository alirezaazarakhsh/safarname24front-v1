import { useSearchParams } from 'next/navigation';

// ------------------------------

export function getNavigationLink(slug: string) {
  const searchParams = useSearchParams();

  const endDate = searchParams.get('end-date');
  const startDate = searchParams.get('start-date');
  const passengers = searchParams.get('passengers');

  return `/best-hotels/${slug}?start-date=${startDate}&end-date=${endDate}${passengers ? `&passengers=${passengers}` : ''}`;
}

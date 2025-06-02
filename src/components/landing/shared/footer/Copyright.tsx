'use client';

import { Footer } from './Footer';
import { useQuery } from '@tanstack/react-query';
import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

type ApiResponse = {
  data: Footer;
};

// --------------------------------------

export default function Copyright() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['main-configs'],
    queryFn: () => generalInstance('/config/main'),
  });

  const copyright = data?.data.footer_copyright;
  if (status !== 'pending' && !copyright) return null;

  return (
    <>
      {status === 'pending' ? (
        <Skeleton className="w-full h-12 xl:mt-auto xl:mb-3 xl:h-12" />
      ) : (
        <div className="bg-zinc-100 w-full h-12 text-cs75 flex-center rounded-cs-10 xl:bg-transparent xl:h-max xl:mt-auto xl:mb-4">
          <p className="text-zinc-800 font-bold truncate px-4 lg:text-zinc-500 lg:px-0">
            {copyright}
          </p>
        </div>
      )}
    </>
  );
}

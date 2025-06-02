'use client';

import { Footer } from './Footer';
import { useQuery } from '@tanstack/react-query';
import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

type ApiResponse = {
  data: Footer;
};

// --------------------------------------

export default function Description() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['main-configs'],
    queryFn: () => generalInstance('/config/main'),
  });

  const title = data?.data.footer_title;
  const desc = data?.data.footer_description;

  if (status !== 'pending' && !title && !desc) return null;

  return (
    <div className="w-full flex flex-col items-center">
      {status === 'pending' ? (
        <Skeleton className="w-1/2 h-5" />
      ) : (
        <h1 className="text-zinc-700 text-cs09 font-inter font-bold capitalize">
          {title}
        </h1>
      )}

      <div className="bg-cs-red w-5/6 h-[2px] mt-3 mb-1 rounded-full lg:bg-zinc-300"></div>

      {status === 'pending' ? (
        <div className="w-full h-20 grid gap-2 mt-3">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <p className="text-zinc-600 text-cs75/5 text-justify font-semibold mt-3 lg:line-clamp-6">
          {desc}
        </p>
      )}
    </div>
  );
}

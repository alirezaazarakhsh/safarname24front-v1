import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

type Data = {
  header_logo: string;
  header_title: string;
  header_sub_title: string;
};

type ApiResponse = {
  data: Data;
};

// --------------------------------

export default function DHeaderStatics() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['main-configs'],
    queryFn: () => generalInstance('/config/main'),
  });

  const logo = data?.data.header_logo;
  const title = data?.data.header_title;
  const subtitle = data?.data.header_sub_title;

  return (
    <Link href={'/'} className="flex items-center gap-3.5">
      {status === 'pending' ? (
        <Skeleton className="w-14 h-14" />
      ) : (
        <div className="w-16 h-16 flex-center overflow-hidden rounded-cs-10">
          {logo && (
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className="w-full aspect-auto"
            />
          )}
        </div>
      )}

      {status === 'pending' ? (
        <div className="space-y-3">
          <Skeleton className="w-40 h-4" />
          <Skeleton className="w-40 h-4" />
        </div>
      ) : (
        <div className="max-w-48 text-zinc-800 text-cs08 space-y-0.5">
          <h1 className="font-extrabold truncate">{title}</h1>
          <h2 className="font-inter font-semibold capitalize truncate">
            {subtitle}
          </h2>
        </div>
      )}
    </Link>
  );
}

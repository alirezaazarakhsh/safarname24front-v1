'use client';

import Link from 'next/link';
import Image from 'next/image';

import { useQuery } from '@tanstack/react-query';
import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

type License = {
  link: string;
  image: string;
};

type Enamad = {
  code: string;
};

type ApiResponse = [{ data: License[] }, { data: Enamad }];

// ----------------------------------------

export default function IdentityBadges() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['licenses', 'enamad'],
    queryFn: () => {
      return Promise.all([
        generalInstance('/config/licenses'),
        generalInstance('/config/enamad'),
      ]);
    },
  });

  const [licensesResponse, enamadResponse] = data || [];
  const licenses = licensesResponse?.data;

  if (status !== 'pending' && !data) return null;

  return (
    <>
      {status === 'pending' ? (
        <div className="w-full h-28 mt-4 mb-2 flex gap-4">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index} className="flex-1" />
            ))}
        </div>
      ) : (
        <div className="w-full mt-4 mb-2 grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-4 lg:grid-cols-3">
          {licenses?.map(
            (badge, index) => (
              // badge.link && (
              //   <Link
              //     key={index}
              //     href={badge.link}
              //     className="bg-zinc-100 h-28 p-4 flex-center overflow-hidden rounded-cs-10"
              //   >
              <div
                key={index}
                className="bg-zinc-100 h-28 p-4 flex-center overflow-hidden rounded-cs-10"
              >
                <Image
                  width={200}
                  height={200}
                  src={badge.image}
                  alt="identity-badge"
                  className="full-size object-contain"
                />
              </div>
            ),
            //   </Link>
            // ),
          )}

          {enamadResponse?.data && (
            <div
              dangerouslySetInnerHTML={{ __html: enamadResponse.data.code }}
            />
          )}
        </div>
      )}
    </>
  );
}

'use client';

import { Forbidden2 } from 'iconsax-react';
import { useQuery } from '@tanstack/react-query';

import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

type Data = {
  rules: string;
  important_notes: string;
};

type ApiResponse = {
  data: Data;
};

type Props = {
  hotelSlug: string;
};

// -----------------------------------------

export function EssentialTips(props: Props) {
  const { hotelSlug } = props;

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-rules'],
    queryFn: () => generalInstance(`/hotel/hotels/${hotelSlug}/rules`),
  });

  const notes = data?.data.important_notes;
  if (status !== 'pending' && (!data || !data?.data)) return null;

  return (
    <>
      {status === 'pending' ? (
        <Skeleton className="h-52" />
      ) : (
        <div className="bg-white p-5 border border-zinc-200 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 flex-center border border-zinc-200 rounded-md">
              <Forbidden2 size={20} color="#444" />
            </div>

            <span className="text-zinc-800 text-cs85 font-extrabold lg:text-cs09">
              نکات ضروری
            </span>
          </div>

          <p className="text-zinc-600 text-cs75/6 text-justify font-semibold overflow-hidden">
            {notes}
          </p>
        </div>
      )}
    </>
  );
}

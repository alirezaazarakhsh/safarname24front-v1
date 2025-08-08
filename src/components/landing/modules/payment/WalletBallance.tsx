'use client';

import { MdError } from 'react-icons/md';
import { EmptyWallet } from 'iconsax-react';

import { numberSeparation } from '@/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';

type ApiResponse = { balance: number };

// ------------------------------

export function WalletBallance() {
  const { data, status } = useApiQuery<ApiResponse>({
    url: '/finance/wallet/',
    queryKey: ['wallet-balance'],
  });

  return (
    <div className="bg-white text-cs08 p-5 flex-between border rounded-xl">
      <div className="flex items-center gap-2">
        <EmptyWallet color="#444" size={20} />
        <span className="font-bold">موجودی کیف پول :</span>
      </div>

      {status === 'pending' ? (
        <Skeleton />
      ) : status === 'error' ? (
        <div className="text-cs-red font-semibold flex-center gap-1.5 rounded-md">
          <span>خطا در محاسبه</span>
          <MdError size={20} />
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <span className="font-extrabold">
            {numberSeparation(data?.balance)}
          </span>

          <span className="text-zinc-500 text-cs08 font-semibold">تومان</span>
        </div>
      )}
    </div>
  );
}

import NormalRoom from './NormalRoom';
import { Room } from '@/types/landing';
import { Warning2 } from 'iconsax-react';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  data?: Room[];
  status: 'error' | 'success' | 'pending';
};

// --------------------------------

export default function RoomsArea(props: Props) {
  const { data, status } = props;
  const roomsCount = 1;

  if (status === 'pending') {
    return (
      <div className="h-40 flex-center lg:h-60">
        <div className="large-dots-dark" />
      </div>

      // <div className='grid gap-6'>
      //   {[1, 2, 3, 4].map((_) => (
      //     <Skeleton key={_} className="h-80 rounded-xl" />
      //   ))}
      // </div>
    );
  }

  if (status === 'error' || !data || !data.length) {
    return (
      <div className="flex flex-col items-center py-12 text-zinc-600 font-semibold text-cs08">
        <Warning2 size={60} color="currentColor" className="text-cs-red" />
        <p className="text-zinc-800 text-[clamp(0.85rem,3vw,0.95rem)] font-bold mt-4 mb-2">
          متاسفانه جستجوی شما در تاریخ مورد نظر نتیجه ای نداشت !
        </p>

        <p>لطفا برای نمایش جدیدترین اطلاعات مجدد جستجو کنید</p>
        <p>از همراهی شما متشکریم</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {data?.map((room, index: number) =>
        roomsCount > 1 ? (
          <NormalRoom key={index} {...room} />
        ) : (
          <NormalRoom key={index} {...room} />
        ),
      )}
    </div>
  );
}

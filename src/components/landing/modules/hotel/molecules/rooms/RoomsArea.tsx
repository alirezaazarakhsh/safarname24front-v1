import NormalRoom from './NormalRoom';
import PackedRoom from './PackedRoom';

import { Room } from '@/types/landing';
import { Warning2 } from 'iconsax-react';
import { useEffect, useState } from 'react';

type PackedRoom = {
  room_count: number;
  pack_rooms: Room[];
  night_count: number;
  total_price: number;
};

type Props = {
  data?: Room[] | PackedRoom[];
  status: 'error' | 'success' | 'pending';
};

// --------------------------------

export default function RoomsArea(props: Props) {
  const { data, status } = props;

  const isNormalRooms =
    Array.isArray(data) && data.every((item) => 'capacity' in item);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(isNormalRooms ? 8 : 4);
  }, [data, isNormalRooms]);

  if (status === 'pending') {
    return (
      <div className="h-40 flex-center lg:h-60">
        <div className="large-dots-dark" />
      </div>
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
      {data
        .slice(0, visibleCount)
        .map((room, index: number) =>
          'room_count' in room && 'pack_rooms' in room ? (
            <PackedRoom key={index} {...(room as PackedRoom)} />
          ) : (
            <NormalRoom key={index} {...(room as Room)} />
          ),
        )}

      {visibleCount < data.length && (
        <button
          onClick={() =>
            setVisibleCount((prev) => prev + (isNormalRooms ? 8 : 4))
          }
          className="w-fit bg-zinc-200/80 text-cs08 font-semibold px-5 py-2.5 rounded-lg"
        >
          مشاهده بیشتر
        </button>
      )}
    </div>
  );
}

import { Room } from '@/types/landing';
import { numberSeparation } from '@/utils';
import { Building, Moon } from 'iconsax-react';

import { SecondaryInfo } from './atoms/SecondaryInfo';
import PackedPrimaryInfo from './atoms/PackedPrimaryInfo';

type Props = {
  room_count: number;
  pack_rooms: Room[];
  night_count: number;
  total_price: number;
};

// -------------------------------------

export default function PackedRoom(props: Props) {
  const { night_count, pack_rooms, total_price } = props;

  return (
    <div className="bg-white border divide-y overflow-hidden rounded-xl lg:rounded-2xl">
      {pack_rooms?.map((room, index) => {
        const {
          name,
          price,
          capacity,
          descriptions,
          room_services,
          extra_capacity,
          customer_club_points,
        } = room;

        return (
          <div key={index} className="grid lg:grid-cols-[1fr_17rem]">
            <div className="relative text-zinc-800 text-cs08 font-semibold p-5 flex flex-col gap-2 overflow-hidden lg:border-l lg:p-6">
              <div className="text-cs09 font-extrabold truncate">{name}</div>

              <div className="text-zinc-500 text-cs75 line-clamp-2 lg:line-clamp-1 lg:mb-2">
                {descriptions}
              </div>

              <SecondaryInfo
                info={{
                  capacity,
                  services: room_services,
                  extraCapacity: extra_capacity,
                  customerClub: customer_club_points,
                }}
              />

              {price.is_fixed_discount_one_time && (
                <div className="text-green-600 mt-4 flex items-center gap-1 lg:hidden">
                  <span>{numberSeparation(price.discount_amount)}</span>
                  <span>هزار تومن تخفیف هنگام خرید</span>
                </div>
              )}
            </div>

            <PackedPrimaryInfo {...room} />
          </div>
        );
      })}

      <div className="flex flex-col divide-y lg:flex-row lg:flex-between">
        <div className="text-cs-blue text-cs08 font-semibold p-5 flex flex-col gap-3 lg:flex-row lg:gap-8">
          <div className="flex items-center gap-1">
            <Moon color="currentColor" size={20} className="ml-1.5" />
            <span>مدت اقامت</span>
            <span>:</span>
            <span>{night_count}</span>
            <span>شب</span>
          </div>

          <div className="flex items-center gap-1">
            <Building color="currentColor" size={20} className="ml-1.5" />
            <span>تعداد کل اتاق</span>
            <span>:</span>
            <span>{pack_rooms?.length}</span>
            <span>اتاق</span>
          </div>
        </div>

        <div className="text-cs85 px-5 py-6 flex flex-col gap-4 lg:flex-row lg:gap-8">
          <div className="font-bold flex-between items-center gap-4">
            <span>قیمت نهایی :</span>

            <div className="text-cs09 flex-center gap-1">
              <span>{numberSeparation(total_price)}</span>
              <span>تومان</span>
            </div>
          </div>

          <button className="h-11 bg-cs-blue/10 text-cs-blue text-cs85 font-bold rounded-lg lg:px-8">
            رزرو اتاق ها
          </button>
        </div>
      </div>
    </div>
  );
}

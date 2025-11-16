import Image from 'next/image';
import moment from 'jalali-moment';
import { Room } from '@/types/landing';
import { numberSeparation } from '@/utils';

import { SecondaryInfo } from './atoms/SecondaryInfo';
import { DeadlineTimer } from './atoms/DeadlineTimer';

import ReserveButton from './atoms/ReserveButton';
import PackedPrimaryInfo from './atoms/PackedPrimaryInfo';
import { Building, InfoCircle, Moon } from 'iconsax-react';
import RoomPicture from './atoms/RoomPicture';

type Props = {
  packData: {
    pack_rooms: Room[];
    night_count: number;
    total_price: number;
  };
  checkAuth: () => boolean;
};

// -------------------------------------

export default function PackedRoom(props: Props) {
  const {
    packData: { night_count, pack_rooms, total_price },
    checkAuth,
  } = props;

  return (
    <div className="divide-y overflow-hidden rounded-xl border bg-white shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.03)] lg:rounded-2xl">
      {pack_rooms?.map((room, index) => {
        const {
          name,
          price,
          image,
          capacity,
          descriptions,
          room_services,
          extra_capacity,
          customer_club_points,
        } = room;

        const formattedDeadline = moment
          .from(price.discount_date, 'fa', 'jYYYY/jMM/jDD')
          .format('YYYY-MM-DD');

        return (
          <div key={index} className="grid lg:grid-cols-[1fr_17rem]">
            <div className="relative gap-3 overflow-hidden p-3 text-cs08 font-semibold text-zinc-800 lg:flex lg:border-l lg:p-4">
              <div className="flex-center relative h-48 overflow-hidden rounded-cs-10 bg-zinc-100 lg:h-40 lg:w-60 lg:rounded-xl">
                {image ? (
                  <RoomPicture image={image} />
                ) : (
                  <Image
                    alt="logo"
                    width={90}
                    height={90}
                    src={'/image/logo/red.png'}
                    className="opacity-20 grayscale"
                  />
                )}
              </div>

              <div className="mt-3 p-2 lg:mt-0 lg:flex lg:flex-col">
                <div className="truncate text-cs09 font-extrabold">{name}</div>

                <div className="mt-2 text-cs08 text-zinc-500">
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
              </div>

              {/* === Small-Screen */}
              {price.is_fixed_discount_one_time && (
                <div className="my-2 flex items-center gap-1 px-2.5 text-green-600 lg:hidden">
                  <button className="group relative ml-1 rounded-full">
                    <InfoCircle size={16} color="#16a34a" />

                    <span className="invisible absolute -top-14 right-0 w-64 rounded-lg bg-cs-dark-blue px-3 py-2 text-right text-cs75/5 font-medium text-zinc-100 opacity-0 transition-all ease-in-out group-hover:visible group-hover:-top-16 group-hover:opacity-100">
                      این مبلغ در مرحله پرداخت از مجموع قیمت فاکتور شما کسر
                      میگردد
                    </span>
                  </button>

                  <span>{numberSeparation(price.discount_amount)}</span>
                  <span>تومن تخفیف هنگام خرید</span>
                </div>
              )}

              {/* === Large-Screen */}
              <div className="absolute left-5 top-5 hidden xl:block">
                {price.is_fixed_discount_one_time && (
                  <div className="hidden items-center gap-1 text-center text-green-600 lg:flex">
                    <button className="group relative ml-1 rounded-full">
                      <InfoCircle size={16} color="#16a34a" />

                      <span className="invisible absolute -right-12 top-6 w-60 rounded-cs-10 bg-cs-dark-blue px-3 py-2 text-right text-cs75/5 font-medium text-zinc-100 opacity-0 transition-all ease-in-out group-hover:visible group-hover:top-8 group-hover:opacity-100 lg:w-52">
                        این مبلغ در مرحله پرداخت از مجموع قیمت فاکتور شما کسر
                        میگردد
                      </span>
                    </button>

                    <span>{numberSeparation(price.discount_amount)}</span>
                    <span>تومن تخفیف هنگام خرید</span>
                  </div>
                )}

                {price.discount_percentage && price.discount_date && (
                  <div className="grid h-11 grid-cols-[1fr_3fr] lg:h-8">
                    <div className="flex-center group relative w-11 gap-1 rounded-lg bg-cs-red/10 text-cs-red">
                      <span className="-ml-0.5">%</span>
                      <span className="font-extrabold">
                        {price.discount_percentage.toFixed(0)}
                      </span>

                      <div className="pointer-events-none absolute left-10 z-20 opacity-0 transition-all duration-300 ease-in-out group-hover:left-[3.2rem] group-hover:opacity-100">
                        <div className="flex-center h-8 w-max gap-1 rounded-lg bg-red-100 px-4 text-cs07 text-cs-red">
                          <span>به ارزش قیمت : </span>
                          <span>{numberSeparation(price.discount_amount)}</span>
                          <span>تومان</span>
                        </div>
                      </div>
                    </div>

                    <DeadlineTimer date={formattedDeadline} />
                  </div>
                )}
              </div>
            </div>

            <PackedPrimaryInfo {...room} />
          </div>
        );
      })}

      <div className="lg:flex-between flex flex-col divide-y lg:flex-row">
        <div className="flex flex-col gap-3 p-5 text-cs08 font-bold text-cs-blue lg:flex-row lg:gap-8">
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

        <div className="flex flex-col gap-4 p-5 text-cs85 lg:flex-row lg:gap-8">
          <div className="flex-between items-center gap-4 font-bold">
            <span>قیمت نهایی :</span>

            <div className="flex-center gap-1 text-cs09">
              <span>{numberSeparation(total_price)}</span>
              <span>تومان</span>
            </div>
          </div>

          <ReserveButton
            checkAuth={checkAuth}
            hotelId={pack_rooms[0].hotel}
            roomId={pack_rooms.map((room) => room.id)}
          />
        </div>
      </div>
    </div>
  );
}

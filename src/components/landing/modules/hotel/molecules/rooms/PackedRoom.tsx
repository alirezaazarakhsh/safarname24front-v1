import { Room } from '@/types/landing';
import { numberSeparation } from '@/utils';
import { Building, InfoCircle, Moon } from 'iconsax-react';

import { SecondaryInfo } from './atoms/SecondaryInfo';
import PackedPrimaryInfo from './atoms/PackedPrimaryInfo';
import { DeadlineTimer } from './atoms/DeadlineTimer';
import moment from 'jalali-moment';

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

        const formattedDeadline = moment
          .from(price.discount_date, 'fa', 'jYYYY/jMM/jDD')
          .format('YYYY-MM-DD');

        return (
          <div key={index} className="grid lg:grid-cols-[1fr_17rem]">
            <div className="relative text-zinc-800 text-cs08 font-semibold p-5 flex flex-col gap-2 overflow-hidden lg:justify-center lg:border-l lg:p-6">
              <div className="text-cs09 font-extrabold truncate">{name}</div>

              <div className="text-zinc-500 text-cs08 line-clamp-2 lg:line-clamp-1 lg:w-2/3 lg:mb-4">
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

              {/* === Small-Screen */}
              {price.is_fixed_discount_one_time && (
                <div className="text-green-600 mt-4 flex items-center gap-1 lg:hidden">
                  <button className="relative ml-1 rounded-full group">
                    <InfoCircle size={16} color="#16a34a" />

                    <span className="bg-cs-dark-blue text-zinc-100 text-cs75 font-medium w-64 text-right px-3 py-2 absolute -top-14 right-0 transition-all ease-in-out rounded-lg invisible opacity-0 group-hover:opacity-100 group-hover:visible group-hover:-top-16">
                      این مبلغ در مرحله پرداخت از مجموع قیمت فاکتور شما کسر
                      میگردد
                    </span>
                  </button>

                  <span>{numberSeparation(price.discount_amount)}</span>
                  <span>تومن تخفیف هنگام خرید</span>
                </div>
              )}

              {/* === Large-Screen */}
              <div className="absolute top-5 left-5 hidden lg:block">
                {price.is_fixed_discount_one_time && (
                  <div className="text-green-600 text-center hidden items-center gap-1 lg:flex">
                    <button className="relative ml-1 rounded-full group">
                      <InfoCircle size={16} color="#16a34a" />

                      <span className="bg-cs-dark-blue text-cs75 text-zinc-100 font-medium w-60 text-right px-3 py-2 absolute top-6 -right-4 transition-all ease-in-out rounded-cs-10 invisible opacity-0 group-hover:opacity-100 group-hover:visible group-hover:top-7 lg:w-52">
                        این مبلغ در مرحله پرداخت از مجموع قیمت فاکتور شما کسر
                        میگردد
                      </span>
                    </button>

                    <span>{numberSeparation(price.discount_amount)}</span>
                    <span>تومن تخفیف هنگام خرید</span>
                  </div>
                )}

                {price.discount_percentage && price.discount_date && (
                  <div className="grid grid-cols-[1fr_3fr] h-11 lg:h-8">
                    <div className="relative bg-cs-red/10 text-cs-red w-11 flex-center gap-1 group rounded-lg">
                      <span className="-ml-0.5">%</span>
                      <span className="font-extrabold">
                        {price.discount_percentage.toFixed(0)}
                      </span>

                      <div className="absolute z-20 left-10 pointer-events-none opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:left-[3.2rem]">
                        <div className="w-max h-8 bg-red-100 text-cs-red text-cs07 px-4 flex-center gap-1 rounded-lg">
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

      <div className="flex flex-col divide-y lg:flex-row lg:flex-between">
        <div className="text-cs-blue text-cs08 font-bold p-5 flex flex-col gap-3 lg:flex-row lg:gap-8">
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

        <div className="text-cs85 p-5 flex flex-col gap-4 lg:flex-row lg:gap-8">
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

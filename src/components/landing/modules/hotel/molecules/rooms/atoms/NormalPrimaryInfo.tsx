import moment from 'jalali-moment';
import { InfoCircle } from 'iconsax-react';

import { Room } from '@/types/landing';
import { numberSeparation } from '@/utils';

import DeadlineTimer from './DeadlineTimer';
import PriceCalendar from '../price-calendar/PriceCalendar';

type Props = {
  room: Room;
  children: React.ReactNode;
};

// -------------------------------------

export default function NormalPrimaryInfo(props: Props) {
  const {
    room: {
      name,
      capacity,
      night_count,
      price_calendar,
      price: {
        total_price,
        discount_date,
        discount_amount,
        discount_percentage,
        total_price_discount,
        is_fixed_discount_one_time,
      },
    },
    children,
  } = props;

  const formattedDeadline = moment
    .from(discount_date, 'fa', 'jYYYY/jMM/jDD')
    .format('YYYY-MM-DD');

  return (
    <>
      {/* === Small-Screen */}
      <div className="text-zinc-800 text-cs08 font-bold border-t lg:hidden">
        <div className="p-5 grid grid-cols-[2fr_1fr] gap-3">
          {is_fixed_discount_one_time && (
            <div className="bg-zinc-100 h-11 flex-center gap-1 col-span-2 rounded-lg">
              <button className="relative ml-1 rounded-full group">
                <InfoCircle size={16} color="#666" />

                <span className="bg-cs-dark-blue text-zinc-100 text-cs75/5 font-medium w-60 text-right px-3 py-2 absolute -top-14 right-0 transition-all ease-in-out rounded-lg invisible opacity-0 group-hover:opacity-100 group-hover:visible group-hover:-top-20">
                  این مبلغ در مرحله پرداخت از مجموع قیمت فاکتور شما کسر میگردد
                </span>
              </button>

              <span>{numberSeparation(discount_amount)}</span>
              <span>تومن تخفیف هنگام خرید</span>
            </div>
          )}

          {discount_percentage && !discount_date && (
            <div className="bg-cs-red/10 text-cs-red h-11 flex-center gap-1 col-span-2 rounded-lg">
              <span className="-ml-0.5">%</span>
              <span className="font-extrabold">
                {discount_percentage.toFixed(0)}
              </span>

              <span>تخفیف خرید</span>
            </div>
          )}

          {discount_percentage && discount_date && (
            <div className="grid grid-cols-[1fr_3fr] gap-3 col-span-2">
              <div className="bg-cs-red/10 text-cs-red h-11 flex-center gap-1 rounded-lg">
                <span className="-ml-0.5">%</span>

                <span className="font-extrabold">
                  {discount_percentage.toFixed(0)}
                </span>
              </div>

              <DeadlineTimer date={formattedDeadline} />
            </div>
          )}

          <PriceCalendar
            info={{
              capacity,
              roomName: name,
              numberOfNights: night_count,
              priceCalendar: price_calendar,
              totalPrice: total_price_discount,
            }}
          />

          <div className="bg-zinc-100 h-11 flex-center gap-1 rounded-lg">
            <span>{night_count}</span>
            <span>شب</span>
          </div>
        </div>

        <div className="bg-zinc-100/50 text-cs85 font-extrabold p-5 grid grid-cols-[max-content_1fr] items-center gap-4 border-t rounded-t-[10%]">
          <span>{discount_percentage ? 'قیمت نهایی :' : 'قیمت کل :'}</span>

          <div className="flex items-center justify-end gap-1">
            <span>
              {discount_percentage
                ? numberSeparation(total_price_discount)
                : numberSeparation(total_price)}
            </span>
            <span>تومان</span>
          </div>

          {children}
        </div>
      </div>

      {/* === Large-Screen */}
      <div className="text-zinc-800 text-cs08 font-bold p-5 flex-col gap-4 hidden justify-center lg:flex">
        <div className="text-cs85 font-extrabold flex-between items-center">
          <span>{discount_percentage ? 'قیمت نهایی :' : 'قیمت کل :'}</span>

          <div className="flex-center gap-1">
            <span className="text-cs09">
              {discount_percentage
                ? numberSeparation(total_price_discount)
                : numberSeparation(total_price)}
            </span>
            <span>تومان</span>
          </div>
        </div>

        <div className="h-10 mt-1 grid grid-cols-[2fr_1fr] gap-3">
          <PriceCalendar
            info={{
              capacity,
              roomName: name,
              numberOfNights: night_count,
              priceCalendar: price_calendar,
              totalPrice: total_price_discount,
            }}
          />

          <div className="bg-zinc-100 flex-center gap-1 rounded-lg">
            <span>{night_count}</span>
            <span>شب</span>
          </div>
        </div>

        <div className="flex gap-3">
          {discount_percentage && (
            <div className="relative text-cs08 bg-cs-red/10 text-cs-red w-12 flex-center gap-1 group rounded-lg">
              <span className="-ml-0.5">%</span>
              <span className="font-extrabold">
                {discount_percentage.toFixed(0)}
              </span>

              <div className="absolute z-20 -top-full left-0 pointer-events-none opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:-top-[calc(100%+0.6rem)]">
                <div className="w-max h-10 bg-red-100 text-cs-red text-cs07 px-4 flex-center gap-1 rounded-lg">
                  <span>به ارزش قیمت : </span>
                  <span>{numberSeparation(discount_amount)}</span>
                  <span>تومان</span>
                </div>

                <div className="absolute left-4 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] border-t-red-100 rounded-[0.2rem]"></div>
              </div>
            </div>
          )}

          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}

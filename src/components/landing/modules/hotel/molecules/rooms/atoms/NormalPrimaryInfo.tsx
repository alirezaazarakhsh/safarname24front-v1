import Link from 'next/link';
import { numberSeparation } from '@/utils';
import DeadlineTimer from './DeadlineTimer';
import PriceCalendar from '../price-calendar/PriceCalendar';

type Props = {
  info: {
    totalPrice: number;
    discount: {
      purchase: number | null;
      percentage: number | null;
      deadline: string | null;
    };
  };
  numberOfNights: number;
};

// -------------------------------------

export default function NormalPrimaryInfo(props: Props) {
  const {
    info: {
      totalPrice,
      discount: { purchase, percentage, deadline },
    },
    numberOfNights,
  } = props;

  return (
    <>
      {/* ================== Small-Screen */}
      {/* =============================== */}
      <div className="text-zinc-800 text-cs75 font-bold border-t lg:hidden">
        {/* Purchase | PriceCalendar | NumberOfNights */}
        <div className="px-5 py-6 grid grid-cols-[2fr_1fr] gap-3">
          {purchase && (
            <div className="bg-zinc-100 h-11 flex-center gap-1 col-span-2 rounded-lg">
              <span>{numberSeparation(purchase)}</span>
              <span>هزار تومن تخفیف هنگام خرید</span>
            </div>
          )}

          {percentage && !deadline && (
            <div className="bg-cs-red/10 text-cs-red h-11 flex-center gap-1 col-span-2 rounded-lg">
              <span className="-ml-0.5">%</span>
              <span className="font-extrabold">{percentage.toFixed(0)}</span>

              <span>تخفیف خرید</span>
            </div>
          )}

          {percentage && deadline && (
            <div className="grid grid-cols-[1fr_3fr] gap-3 col-span-2">
              <div className="bg-cs-red/10 text-cs-red h-11 flex-center gap-1 rounded-lg">
                <span className="-ml-0.5">%</span>

                <span className="font-extrabold">{percentage.toFixed(0)}</span>
              </div>

              <DeadlineTimer date={deadline} />
            </div>
          )}

          <PriceCalendar />

          <div className="bg-zinc-100 h-11 flex-center gap-1 rounded-lg">
            <span>{numberOfNights}</span>
            <span>شب</span>
          </div>
        </div>

        {/* TotalPrice | SeeReservation */}
        <div className="bg-zinc-100/50 text-cs85 font-extrabold p-5 grid grid-cols-[max-content_1fr] items-center gap-4 border-t rounded-t-[10%]">
          <span>{percentage ? 'قیمت نهایی :' : 'قیمت کل :'}</span>

          <div className="flex items-center justify-end gap-1">
            <span>{numberSeparation(totalPrice)}</span>
            <span>تومان</span>
          </div>

          <Link
            href={''}
            className="bg-cs-dark-blue text-zinc-100 text-cs08 font-bold h-11 flex-center col-span-2 rounded-lg"
          >
            مشاهده رزرو اتاق
          </Link>
        </div>
      </div>

      {/* ================== Large-Screen */}
      {/* =============================== */}
      <div className="text-zinc-800 text-cs75 font-bold p-5 flex-col gap-4 hidden lg:flex">
        {/* TotalPrice */}
        <div className="text-cs85 font-extrabold flex-between items-center">
          <span>{percentage ? 'قیمت نهایی :' : 'قیمت کل :'}</span>

          <div className="flex-center gap-1">
            <span>{numberSeparation(totalPrice)}</span>
            <span>تومان</span>
          </div>
        </div>

        {/* PriceCalendar | NumberOfNights */}
        <div className="h-10 mt-auto grid grid-cols-[2fr_1fr] gap-3">
          <PriceCalendar />

          <div className="bg-zinc-100 flex-center gap-1 rounded-lg">
            <span>{numberOfNights}</span>
            <span>شب</span>
          </div>
        </div>

        {/* SeeReservation | Percentage */}
        <div className="h-10 flex gap-3">
          {percentage && (
            <div className="relative bg-cs-red/10 text-cs-red w-11 flex-center gap-1 group rounded-lg">
              <span className="-ml-0.5">%</span>
              <span className="font-extrabold">{percentage.toFixed(0)}</span>

              {/* Value of discount */}
              <div className="absolute z-20 -top-full left-0 pointer-events-none opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:-top-[calc(100%+0.6rem)]">
                <div className="w-max h-10 bg-red-100 text-cs-red text-cs07 px-4 flex-center gap-1 rounded-lg">
                  <span>به ارزش قیمت : </span>
                  <span>{numberSeparation(totalPrice)}</span>
                  <span>تومان</span>
                </div>

                <div className="absolute left-4 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] border-t-red-100 rounded-[0.2rem]"></div>
              </div>
            </div>
          )}

          <Link
            href={''}
            className="bg-cs-dark-blue text-zinc-100 flex-center flex-1 rounded-lg"
          >
            مشاهده رزرو اتاق
          </Link>
        </div>
      </div>
    </>
  );
}

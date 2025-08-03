import moment from 'jalali-moment';
import { Room } from '@/types/landing';
import { numberSeparation } from '@/utils';
import { DeadlineTimer } from './DeadlineTimer';
import PriceCalendar from '../price-calendar/PriceCalendar';

type Props = Room;

// -------------------------------------

export default function PackedPrimaryInfo(props: Props) {
  const {
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
  } = props;

  const formattedDeadline = moment
    .from(discount_date, 'fa', 'jYYYY/jMM/jDD')
    .format('YYYY-MM-DD');

  return (
    <div className="text-zinc-800 text-cs08 font-bold flex-col lg:flex lg:p-5">
      {is_fixed_discount_one_time && (
        <div className="text-green-600 text-center hidden items-center gap-1 lg:flex">
          <span>{numberSeparation(discount_amount)}</span>
          <span>هزار تومن تخفیف هنگام خرید</span>
        </div>
      )}

      <div className="bg-zinc-100/50 p-5 grid gap-4 border-t lg:bg-transparent lg:p-0 lg:mt-auto lg:border-none">
        <div>
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
            <div className="grid grid-cols-[1fr_3fr] gap-3 h-11 lg:h-8">
              <div className="bg-cs-red/10 text-cs-red flex-center gap-1 rounded-lg">
                <span className="-ml-0.5">%</span>
                <span className="font-extrabold">
                  {discount_percentage.toFixed(0)}
                </span>
              </div>

              <DeadlineTimer date={formattedDeadline} />
            </div>
          )}
        </div>

        <PriceCalendar
          info={{
            capacity,
            roomName: name,
            numberOfNights: night_count,
            priceCalendar: price_calendar,
            totalPrice: total_price_discount,
          }}
        />

        <div className="text-cs85 font-extrabold flex-between mt-1 lg:mt-0">
          <span>{discount_percentage ? 'قیمت نهایی :' : 'قیمت کل :'}</span>

          <div className="flex items-center justify-end gap-1">
            <span>
              {discount_percentage
                ? numberSeparation(total_price_discount)
                : numberSeparation(total_price)}
            </span>
            <span>تومان</span>
          </div>
        </div>
      </div>
    </div>
  );
}

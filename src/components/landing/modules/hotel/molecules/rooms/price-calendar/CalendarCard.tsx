import { Room } from '@/types/landing';
import { numberSeparation } from '@/utils';
import { CalendarAdd, CloseSquare } from 'iconsax-react';

type Props = { info: Room['price_calendar'][number] };

// --------------------------------

export default function CalendarCard(props: Props) {
  const {
    info: { date, day, month, price, status },
  } = props;

  return (
    <div className="h-10 font-semibold flex gap-x-3.5 md:h-11">
      {/* === Day & Date */}
      <div className="w-1/3 text-cs08 flex gap-1 flex-col md:w-[42%]">
        <span>{day}</span>
        <span className="text-zinc-500">{date}</span>
      </div>

      {/* === Price */}
      <div
        className={`relative text-cs08 flex-1 flex-center gap-1 rounded-lg ${status === 'close' ? 'bg-cs-dark-blue text-white' : price?.discount_percentage ? 'bg-cs-red/10 text-cs-red border-2 border-dashed border-cs-red' : 'bg-zinc-200/60'}`}
      >
        {status === 'close' ? (
          'بسته شده'
        ) : price ? (
          price?.discount_percentage ? (
            <>
              <span className="font-bold">
                {numberSeparation(price?.price_after_discount)}
              </span>
              <span>تومان</span>
              <span>-</span>
              <span>%{price?.discount_percentage}</span>
            </>
          ) : (
            <>
              <span className="font-bold">
                {numberSeparation(price?.price)}
              </span>
              <span>تومان</span>
            </>
          )
        ) : null}
      </div>

      {/* === Icon */}
      <div
        className={`w-10 flex-center rounded-lg md:w-11 ${status === 'close' ? 'bg-cs-dark-blue' : 'bg-zinc-200/60'}`}
      >
        {status === 'close' ? (
          <CloseSquare size={20} color="#fff" />
        ) : (
          <CalendarAdd size={20} color="#444" />
        )}
      </div>
    </div>
  );
}

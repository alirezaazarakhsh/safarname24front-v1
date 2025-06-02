import { numberSeparation } from '@/utils';
import { CalendarAdd, CloseSquare, Slash } from 'iconsax-react';

type Props = {
  info: {
    day: string;
    date: string;
    price: number;
    capacity: string;
    discountPercentage: number;
  };
};

// --------------------------------

export default function CalendarCard(props: Props) {
  const {
    info: { capacity, date, day, discountPercentage, price },
  } = props;

  return (
    <div className="h-10 font-semibold flex gap-2 md:h-11">
      {/* === Day & Date */}
      <div className="w-1/3 text-cs75 flex flex-col justify-between md:text-cs08 md:w-[42%]">
        <span>{day}</span>
        <span className="text-zinc-500">{date}</span>
      </div>

      {/* === Price */}
      <div
        className={`relative text-cs75 flex-1 flex-center gap-1 rounded-lg md:text-cs08 ${discountPercentage > 0 ? 'bg-cs-red/10 text-cs-red border-2 border-dashed border-cs-red' : capacity === 'full' ? 'bg-cs-dark-blue text-white' : 'bg-zinc-200/60'}`}
      >
        {discountPercentage > 0 ? (
          <>
            <span className="font-bold">{numberSeparation(price)}</span>
            <span>تومان</span>
            <span className="md:hidden">-</span>
            <span className="md:hidden">%{discountPercentage}</span>
          </>
        ) : capacity === 'full' ? (
          <span>ظرفیت تکمیل شد</span>
        ) : price === 0 ? (
          <span>قیمت تعیین نشده</span>
        ) : (
          <>
            <span className="font-bold">{numberSeparation(price)}</span>
            <span>تومان</span>
          </>
        )}

        {discountPercentage > 0 && (
          <div className="absolute -right-[3.3rem] bg-cs-red/10 text-cs-red w-11 h-11 font-bold hidden rounded-lg md:flex-center">
            %{discountPercentage}
          </div>
        )}
      </div>

      {/* === Icon */}
      <div
        className={`w-10 flex-center rounded-lg md:w-11 ${capacity === 'full' ? 'bg-cs-dark-blue' : 'bg-zinc-200/60'}`}
      >
        {price === 0 ? (
          <Slash size={20} color="#444" />
        ) : capacity === 'full' ? (
          <CloseSquare size={20} color="#fff" />
        ) : (
          <CalendarAdd size={20} color="#444" />
        )}
      </div>
    </div>
  );
}

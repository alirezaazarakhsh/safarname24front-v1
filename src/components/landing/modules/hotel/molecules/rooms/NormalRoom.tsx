import { numberSeparation } from '@/utils';
import { NormalRoom as Room } from '@/types/landing';
import { SecondaryInfo } from './atoms/SecondaryInfo';
import { DeadlineTimer } from './atoms/DeadlineTimer';
import NormalPrimaryInfo from './atoms/NormalPrimaryInfo';

type Props = {
  room: Room;
  numberOfNights: number;
};

// -------------------------------------

export default function NormalRoom(props: Props) {
  const {
    room: {
      title,
      desc,
      capacity,
      services,
      extraCapacity,
      customerClub,
      totalPrice,
      discount: { purchase, percentage, deadline },
    },
    numberOfNights,
  } = props;

  return (
    <div className="bg-white grid overflow-hidden border rounded-xl lg:grid-cols-[1fr_17rem] lg:rounded-2xl">
      {/* Title | Desc | Other-Info ... */}
      <div className="relative text-zinc-800 text-cs08 font-semibold p-5 flex flex-col gap-2 overflow-hidden lg:border-l lg:p-6">
        <div className="text-cs09 font-extrabold truncate">{title}</div>

        <div className="text-zinc-500 text-cs75 line-clamp-2 lg:w-3/5 lg:line-clamp-1">
          {desc}
        </div>

        {/* Capacity | Services | ExtraCapacity | CustomerClub */}
        <SecondaryInfo
          info={{ capacity, services, extraCapacity, customerClub }}
        />

        {/* DeadlineTimer | Purchase */}
        {purchase || deadline ? (
          <div className="absolute top-5 left-5 h-10 hidden lg:flex">
            {purchase && (
              <div className="bg-zinc-100 text-zin-800 text-cs07 font-bold px-4 flex-center gap-1 rounded-lg">
                <span>{numberSeparation(purchase)}</span>
                <span>هزار تومن تخفیف هنگام خرید</span>
              </div>
            )}

            {deadline && (
              <div className="w-48 grid">
                <DeadlineTimer date={deadline} />
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* TotalPrice | PriceCalendar | NumberOfNights | Percentage | SeeReservations | DeadlineTimer | Purchase */}
      <NormalPrimaryInfo
        info={{ totalPrice, discount: props.room.discount }}
        numberOfNights={numberOfNights}
      />
    </div>
  );
}

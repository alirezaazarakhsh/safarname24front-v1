import moment from 'jalali-moment';
import { numberSeparation } from '@/utils';
import { Room as Room } from '@/types/landing';

import { SecondaryInfo } from './atoms/SecondaryInfo';
import { DeadlineTimer } from './atoms/DeadlineTimer';
import NormalPrimaryInfo from './atoms/NormalPrimaryInfo';

type Props = Room;

// -------------------------------------

export default function NormalRoom(props: Props) {
  const {
    name,
    price,
    capacity,
    descriptions,
    room_services,
    extra_capacity,
    customer_club_points,
  } = props;

  const formattedDeadline = moment
    .from(price.discount_date, 'fa', 'jYYYY/jMM/jDD')
    .format('YYYY-MM-DD');

  return (
    <div className="bg-white grid overflow-hidden border rounded-xl lg:grid-cols-[1fr_17rem] lg:rounded-2xl">
      <div className="relative text-zinc-800 text-cs08 font-semibold p-5 flex flex-col gap-2 overflow-hidden lg:border-l lg:p-6">
        <div className="text-cs09 font-extrabold truncate lg:text-cs95">
          {name}
        </div>

        <div className="text-zinc-500 text-cs08 line-clamp-2 lg:w-3/5 lg:line-clamp-1">
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

        {price.is_fixed_discount_one_time || price.discount_date ? (
          <div className="absolute top-5 left-5 h-10 hidden lg:flex">
            {price.is_fixed_discount_one_time && (
              <div className="bg-zinc-100 text-zin-800 text-cs07 font-bold px-4 flex-center gap-1 rounded-lg">
                <span>{numberSeparation(price.discount_amount)}</span>
                <span>هزار تومن تخفیف هنگام خرید</span>
              </div>
            )}

            {price.discount_percentage && formattedDeadline && (
              <div className="w-48 grid">
                <DeadlineTimer date={formattedDeadline} />
              </div>
            )}
          </div>
        ) : null}
      </div>

      <NormalPrimaryInfo {...props} />
    </div>
  );
}

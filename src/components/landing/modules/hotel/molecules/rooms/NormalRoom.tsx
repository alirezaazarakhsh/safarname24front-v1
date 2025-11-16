import moment from 'jalali-moment';
import { InfoCircle } from 'iconsax-react';

import { numberSeparation } from '@/utils';
import { Room as Room } from '@/types/landing';
import { SecondaryInfo } from './atoms/SecondaryInfo';

import ReserveButton from './atoms/ReserveButton';
import { DeadlineTimer } from './atoms/DeadlineTimer';
import NormalPrimaryInfo from './atoms/NormalPrimaryInfo';
import Image from 'next/image';
import RoomPicture from './atoms/RoomPicture';

type Props = {
  room: Room;
  checkAuth: () => boolean;
};

// -------------------------------------

export default function NormalRoom(props: Props) {
  const {
    room: {
      hotel,
      id,
      name,
      price,
      image,
      capacity,
      descriptions,
      room_services,
      extra_capacity,

      customer_club_points,
    },
    checkAuth,
  } = props;

  const formattedDeadline = moment
    .from(price.discount_date, 'fa', 'jYYYY/jMM/jDD')
    .format('YYYY-MM-DD');

  return (
    <div className="bg-white grid overflow-hidden border rounded-xl shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.03)] lg:grid-cols-[1fr_17rem] lg:rounded-2xl">
      <div className="relative text-zinc-800 text-[clamp(0.8rem,3vw,0.85rem)] gap-3 font-semibold p-3 overflow-hidden lg:border-l lg:p-4 lg:flex">
        <div className="relative flex-center bg-zinc-100 h-48 rounded-cs-10 overflow-hidden lg:w-60 lg:rounded-xl lg:h-40">
          {image ? (
            <RoomPicture image={image} />
          ) : (
            <Image
              alt="logo"
              width={90}
              height={90}
              src={'/image/logo/red.png'}
              className="grayscale opacity-20"
            />
          )}
        </div>

        <div className="p-2 mt-3 lg:flex-1 lg:flex lg:flex-col lg:mt-0">
          <div className="text-[clamp(0.85rem,3vw,0.9rem)] font-extrabold">
            {name}
          </div>

          <div className="text-zinc-500 mt-2 text-cs08 lg:line-clamp-1">
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
            <div className="absolute top-5 left-5 h-10 hidden xl:flex">
              {price.is_fixed_discount_one_time && (
                <div className="bg-zinc-100 text-zin-800 text-cs08 font-bold px-4 flex-center gap-1 rounded-lg">
                  <button className="relative ml-1 rounded-full group">
                    <InfoCircle size={16} color="#666" />

                    <span className="bg-cs-dark-blue text-zinc-100 text-cs75/5 font-medium w-60 text-right px-3 py-2 absolute top-8 -right-4 transition-all ease-in-out rounded-cs-10 invisible opacity-0 group-hover:opacity-100 group-hover:visible group-hover:top-9 lg:w-52">
                      این مبلغ در مرحله پرداخت از مجموع قیمت فاکتور شما کسر
                      میگردد
                    </span>
                  </button>

                  <span>{numberSeparation(price.discount_amount)}</span>
                  <span>تومن تخفیف هنگام خرید</span>
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
      </div>

      <NormalPrimaryInfo room={props.room}>
        <ReserveButton checkAuth={checkAuth} roomId={[id]} hotelId={hotel} />
      </NormalPrimaryInfo>
    </div>
  );
}

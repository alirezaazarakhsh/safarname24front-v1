import { TbUsers } from 'react-icons/tb';
import { FiUserPlus } from 'react-icons/fi';

import { numberSeparation } from '@/utils';
import { MdOutlineRoomService } from 'react-icons/md';

type Props = {
  name: string;
  capacity: number;
  extraCapacity: number;
  discountOnPurchase: number;
};

// ------------------------------

export function RoomInfo(props: Props) {
  const { capacity, extraCapacity, name, discountOnPurchase } = props;

  return (
    <legend className="w-full font-bold flex items-center">
      <span className="text-cs85 flex items-center gap-2 md:text-cs09">
        <MdOutlineRoomService size={24} color="#333" />

        <span>اتاق {name}</span>
      </span>

      {discountOnPurchase > 0 && (
        <p className="bg-zinc-100/50 text-zinc-400 text-cs07/5 font-semibold px-2.5 py-1 mr-4 hidden rounded-md md:block">
          <span className="text-zinc-500 font-extrabold inline-block mx-1">
            {numberSeparation(discountOnPurchase)}
          </span>
          تخفیف هنگام خرید
        </p>
      )}

      <div className="text-zinc-600 text-cs08 font-semibold mr-auto hidden gap-4 md:flex">
        <div className="flex-center gap-2">
          <TbUsers color="#888" size={18} />
          <span>ظرفیت : {capacity}</span>
        </div>

        <span className="text-zinc-400">|</span>

        <div className="flex-center gap-2">
          <FiUserPlus color="#888" size={18} />
          <span>نفر اضافه : {extraCapacity}</span>
        </div>
      </div>
    </legend>
  );
}

import { TbUsers } from 'react-icons/tb';
import { numberSeparation } from '@/utils';
import { FiUserPlus } from 'react-icons/fi';
import { MdOutlineKey } from 'react-icons/md';

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
    <legend className="flex w-full items-center font-bold">
      <span className="flex items-center gap-2 text-cs85">
        <MdOutlineKey size={20} color="#333" />

        <span>اتاق {name}</span>
      </span>

      {discountOnPurchase > 0 && (
        <p className="mr-4 hidden rounded-md bg-zinc-100/50 px-2.5 py-1 text-cs75/5 font-semibold text-zinc-500 md:block">
          <span className="mx-1 inline-block font-extrabold">
            {numberSeparation(discountOnPurchase)}
          </span>
          تخفیف هنگام خرید
        </p>
      )}

      <div className="mr-auto hidden gap-4 text-cs08 font-semibold text-zinc-600 md:flex">
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

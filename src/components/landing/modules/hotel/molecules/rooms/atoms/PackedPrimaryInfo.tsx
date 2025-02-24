import { numberSeparation } from '@/utils';

type Props = {
  info: {
    totalPrice: number;
    pricePerNight: number;
    discount: {
      purchase: number | null;
    };
  };
};

// -------------------------------------

export default function PackedPrimaryInfo(props: Props) {
  const {
    info: {
      totalPrice,
      pricePerNight,
      discount: { purchase },
    },
  } = props;

  return (
    <div className="text-zinc-800 text-cs08 font-bold flex-col lg:flex lg:p-5">
      {/* Purchase-Discount */}
      {purchase && (
        <div className="text-green-600 text-center hidden items-center gap-1 lg:flex">
          <span>{numberSeparation(purchase)}</span>
          <span>هزار تومن تخفیف هنگام خرید</span>
        </div>
      )}

      {/* TotalPrice | SeeReservation */}
      <div className="bg-zinc-100/50 text-cs85 font-extrabold p-5 grid grid-cols-[max-content_1fr] items-center gap-4 border-t lg:bg-transparent lg:p-0 lg:mt-auto lg:border-none">
        <span>قیمت کل :</span>

        <div className="flex items-center justify-end gap-1">
          <span>{numberSeparation(totalPrice)}</span>
          <span>تومان</span>
        </div>

        <div className="bg-cs-dark-blue text-zinc-100 text-cs08 font-bold h-11 flex-center gap-1 col-span-2 rounded-lg">
          <span className="ml-2">هر شب</span>
          <span>{numberSeparation(pricePerNight)}</span>
          <span>تومان</span>
        </div>
      </div>
    </div>
  );
}

import { numberSeparation } from '@/utils';
// import { PackedRoom as Room } from '@/types/landing';
import { SecondaryInfo } from './atoms/SecondaryInfo';
import { Building, Moon } from 'iconsax-react';
import PackedPrimaryInfo from './atoms/PackedPrimaryInfo';

type Props = {
  room: { totalPrice: number; rooms: any[] };
  numberOfNights: number;
};

// -------------------------------------

export default function PackedRoom(props: Props) {
  const {
    room: { totalPrice, rooms },
    numberOfNights,
  } = props;

  return (
    <div className="bg-white border divide-y overflow-hidden rounded-xl lg:rounded-2xl">
      {rooms?.map((room, index) => {
        const {
          title,
          desc,
          capacity,
          services,
          extraCapacity,
          customerClub,
          totalPrice,
          pricePerNight,
          discount: { purchase },
        } = room;
        

        return (
          <div key={index} className="grid lg:grid-cols-[1fr_17rem]">
            {/* Title | Desc | Other-Info ... */}
            <div className="relative text-zinc-800 text-cs08 font-semibold p-5 flex flex-col gap-2 overflow-hidden lg:border-l lg:p-6">
              <div className="text-cs09 font-extrabold truncate">{title}</div>

              <div className="text-zinc-500 text-cs75 line-clamp-2 lg:line-clamp-1 lg:mb-2">
                {desc}
              </div>

              {/* Capacity | Services | ExtraCapacity | CustomerClub */}
              <SecondaryInfo
                info={{ capacity, services, extraCapacity, customerClub }}
              />

              {/* Purchase-Discount */}
              {purchase && (
                <div className="text-green-600 mt-4 flex items-center gap-1 lg:hidden">
                  <span>{numberSeparation(purchase)}</span>
                  <span>هزار تومن تخفیف هنگام خرید</span>
                </div>
              )}
            </div>

            {/* TotalPrice | PriceCalendar | Purchase */}
            <PackedPrimaryInfo
              info={{ totalPrice, pricePerNight, discount: { purchase } }}
            />
          </div>
        );
      })}

      {/* NumberOfNights | NumberOfRooms | TotalPrice | Reservation */}
      <div className="flex flex-col divide-y lg:flex-row lg:flex-between">
        {/* NumberOfNights | NumberOfRooms */}
        <div className="text-cs-blue text-cs08 font-semibold p-5 flex flex-col gap-3 lg:flex-row lg:gap-8">
          <div className="flex items-center gap-1">
            <Moon color="currentColor" size={20} className="ml-1.5" />
            <span>مدت اقامت</span>
            <span>:</span>
            <span>{numberOfNights}</span>
            <span>شب</span>
          </div>

          <div className="flex items-center gap-1">
            <Building color="currentColor" size={20} className="ml-1.5" />
            <span>تعداد کل اتاق</span>
            <span>:</span>
            <span>{rooms?.length}</span>
            <span>اتاق</span>
          </div>
        </div>

        {/* TotalPrice | Reservation */}
        <div className="text-cs85 px-5 py-6 flex flex-col gap-4 lg:flex-row lg:gap-8">
          <div className="font-bold flex-between items-center gap-4">
            <span>قیمت نهایی :</span>

            <div className="text-cs09 flex-center gap-1">
              <span>{numberSeparation(totalPrice)}</span>
              <span>تومان</span>
            </div>
          </div>

          <button className="h-11 bg-cs-blue/10 text-cs-blue text-cs85 font-bold rounded-lg lg:px-6">
            رزرو اتاق ها
          </button>
        </div>
      </div>
    </div>
  );
}

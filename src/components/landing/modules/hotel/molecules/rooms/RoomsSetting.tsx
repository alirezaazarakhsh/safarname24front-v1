import NumberOfNights from '@/components/landing/shared/search/molecules/NumberOfNights';
import Passengers from '@/components/landing/shared/search/molecules/passengers/Passengers';
import { DDatePicker } from '@/components/landing/shared/search/date-picker';

// --------------------------------

export function RoomsSetting() {
  return (
    <div className="text-cs75 font-bold items-end gap-3 hidden lg:grid lg:grid-cols-[1fr_15rem_5rem_7rem] xl:text-cs08 xl:grid-cols-[1fr_17rem_7rem_9rem] xl:gap-4">
      {/* === Large-Screen (LG) */}
      <div className="grid-cols-[1.6fr_0.8fr_1fr] gap-3 hidden lg:grid">
        <DDatePicker sideOffset={15} triggerType="else" />
        <NumberOfNights type="else" />
        <Passengers sideOffset={15} triggerType="else" />
      </div>

      {/* === NumberOfRooms */}
      {/* <div className="bg-cs-dark-blue text-zinc-100 h-11 flex-center gap-1 rounded-lg lg:h-12">
        <span>{300}</span>
        <span>اتاق</span>
      </div> */}

      {/* === Search-Button */}
      <button className="bg-cs-red text-zinc-100 h-12 hidden rounded-lg lg:block">
        جستجو اتاق
      </button>
    </div>
  );
}

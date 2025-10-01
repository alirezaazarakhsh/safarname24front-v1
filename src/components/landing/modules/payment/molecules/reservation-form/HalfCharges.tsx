import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { FaInfoCircle } from 'react-icons/fa';
import { HalfCharge } from '../../atoms/reservation-form';

type Props = {
  roomIndex: number;
  halfCharges: {
    enter: { enabled: boolean; price: number };
    exit: { enabled: boolean; price: number };
  };
};

// ------------------------------

export function HalfCharges(props: Props) {
  const {
    roomIndex,
    halfCharges: { enter, exit },
  } = props;

  if (!enter.price && !exit.price) return null;

  return (
    <div className="text-cs08 font-bold flex flex-col gap-4 xl:flex-row xl:items-center">
      <div className="flex items-center gap-4">
        <span>نیم شارژ اتاق :</span>

        {/* <Popover>
          <PopoverTrigger className="w-9 aspect-square bg-blue-500/5 text-blue-500 text-cs75/6 flex-center gap-1.5 rounded-lg transition-all hover:bg-blue-500/10 hover:underline">
            <FaInfoCircle color="#3b82f6" size={16} />
            <span>اطلاعات بیشتر</span>
          </PopoverTrigger>

          <PopoverContent
            align="center"
            sideOffset={8}
            className="bg-white !shadow-light !rounded-cs-10"
          >
            <p className="text-zinc-600 text-cs08/6 font-semibold">
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </PopoverContent>
        </Popover> */}
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-5 xl:w-2/3 xl:mr-auto">
        <HalfCharge type="enter" price={enter.price} roomIndex={roomIndex} />
        <HalfCharge type="exit" price={exit.price} roomIndex={roomIndex} />
      </div>
    </div>
  );
}

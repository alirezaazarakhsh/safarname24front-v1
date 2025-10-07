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
      </div>

      <div className="flex flex-col gap-4 sm:flex-row md:gap-5 xl:w-2/3 xl:mr-auto xl:justify-end">
        <HalfCharge type="enter" price={enter.price} roomIndex={roomIndex} />
        <HalfCharge type="exit" price={exit.price} roomIndex={roomIndex} />
      </div>
    </div>
  );
}

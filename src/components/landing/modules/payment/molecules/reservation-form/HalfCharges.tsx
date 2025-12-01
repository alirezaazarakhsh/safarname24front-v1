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

  return (
    <div className="flex flex-col gap-4 text-cs08 font-bold xl:flex-row xl:items-center">
      <div className="flex items-center gap-4">
        <span>نیم شارژ اتاق :</span>
      </div>

      {!enter.price && !exit.price ? (
        <p className="font-semibold text-zinc-500">
          هتل مورد نظر دارای خدمات "نیم شارژ" نمیباشد .
        </p>
      ) : (
        <div className="flex flex-col gap-4 sm:flex-row md:gap-5 xl:mr-auto xl:w-2/3 xl:justify-end">
          <HalfCharge type="enter" price={enter.price} roomIndex={roomIndex} />
          <HalfCharge type="exit" price={exit.price} roomIndex={roomIndex} />
        </div>
      )}
    </div>
  );
}

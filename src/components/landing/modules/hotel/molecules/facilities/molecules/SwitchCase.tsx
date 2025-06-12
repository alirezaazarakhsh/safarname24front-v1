type FacilitiesType = 'hotel' | 'room';

type Props = {
  facilitiesType: FacilitiesType;
  setFacilitiesType: (type: FacilitiesType) => void;
};

const sharedStyle =
  'w-1/2 flex-center rounded-md transition-colors duration-300 ease-in-out';

// ------------------------------

export default function SwitchCase(props: Props) {
  const { facilitiesType, setFacilitiesType } = props;

  return (
    <div className="relative z-10 bg-zinc-200/60 w-full h-10 text-cs75 font-bold flex gap-2 overflow-hidden rounded-lg md:w-80">
      <button
        className={`${sharedStyle} ${facilitiesType === 'hotel' ? 'text-white' : 'text-zinc-700'}`}
        onClick={() => setFacilitiesType('hotel')}
      >
        امکانات رفاهی و تفریحی
      </button>

      <button
        className={`${sharedStyle} ${facilitiesType === 'room' ? 'text-white' : 'text-zinc-700'}`}
        onClick={() => setFacilitiesType('room')}
      >
        امکانات داخل اتاق
      </button>

      <div
        className={`absolute inset-y-0 -z-10 w-1/2 bg-[#4B5BCE] transition-all duration-300 ease-in-out rounded-lg ${
          facilitiesType === 'hotel' ? 'right-0' : 'right-1/2'
        }`}
      ></div>
    </div>
  );
}

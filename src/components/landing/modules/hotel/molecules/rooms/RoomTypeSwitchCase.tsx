type Props = {
  roomType: 'normal' | 'packed';
  setRoomTypes: (type: 'normal' | 'packed') => void;
};

const sharedStyle =
  'w-1/2 flex-center rounded-md transition-colors duration-300 ease-in-out';

// --------------------------------

export default function RoomTypeSwitchCase(props: Props) {
  const { roomType, setRoomTypes } = props;

  return (
    <div className="relative top-0 left-0 z-10 bg-zinc-200/50 h-11 flex gap-2 overflow-hidden rounded-lg lg:h-12">
      <button
        className={`${sharedStyle} ${roomType === 'normal' ? 'text-white' : 'text-zinc-700'}`}
        onClick={() => setRoomTypes('normal')}
      >
        اتاق معمولی
      </button>

      <button
        className={`${sharedStyle} ${roomType === 'packed' ? 'text-white' : 'text-zinc-700'}`}
        onClick={() => setRoomTypes('packed')}
      >
        اتاق پک بندی
      </button>

      <div
        className={`absolute inset-y-0 -z-10 w-1/2 bg-[#4B5BCE] transition-all duration-300 ease-in-out rounded-lg ${
          roomType === 'normal' ? 'right-0' : 'right-1/2'
        }`}
      ></div>
    </div>
  );
}

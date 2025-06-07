import { Plus, Minus } from 'lucide-react';

type Props = {
  numberOfRooms: number;
  changeNumberOfRooms: (type: 'inc' | 'dec') => void;
};

const iconStyle = 'bg-zinc-300 w-5 h-5 p-[3.5px] rounded';

// -----------------------------------

export function NumberOfRooms(props: Props) {
  const { numberOfRooms, changeNumberOfRooms } = props;

  return (
    <div className="text-cs08 font-semibold flex-between items-center gap-3 md:text-cs85">
      <span>تعداد اتاق :</span>

      <div className="flex-center gap-2">
        <button
          onClick={() => changeNumberOfRooms('inc')}
          className="bg-zinc-200/50 w-10 aspect-square flex-center rounded-md"
        >
          <Plus color="#222" className={iconStyle} />
        </button>

        <span className="text-center w-3">{numberOfRooms}</span>

        <button
          onClick={() => changeNumberOfRooms('dec')}
          className="bg-zinc-200/50 w-10 aspect-square flex-center rounded-md"
        >
          <Minus color="#222" className={iconStyle} />
        </button>
      </div>
    </div>
  );
}

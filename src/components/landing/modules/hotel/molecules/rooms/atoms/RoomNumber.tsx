import { Plus } from 'lucide-react';
import { Minus } from 'iconsax-react';

type Props = {
  counter: number;
  disabled: { increase: boolean; decrease: boolean };
  handleChangeCounter: (type: 'inc' | 'dec') => void;
};

// ------------------------------

export default function RoomNumber(props: Props) {
  const { counter, handleChangeCounter, disabled } = props;

  return (
    <div className="flex h-11 select-none font-bold text-zinc-700 lg:h-10">
      <span className="ml-4 inline-block self-center">تعداد اتاق :</span>

      <button
        disabled={disabled.increase}
        onClick={() => handleChangeCounter('inc')}
        className="flex-center mr-auto aspect-square rounded-lg bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Plus color="currentcolor" size={14} />
      </button>

      <span className="flex-center w-10">{counter}</span>

      <button
        disabled={disabled.decrease}
        onClick={() => handleChangeCounter('dec')}
        className="flex-center aspect-square rounded-lg bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Minus name="Minus" color="currentcolor" size={16} />
      </button>
    </div>
  );
}

import { Plus, Minus } from 'lucide-react';

type Props = {
  disabled: boolean;
  onClick: () => void;
  type: 'decrement' | 'increment';
};

const iconStyle = 'bg-zinc-200 w-5 h-5 p-[3.5px] rounded';

// -----------------------------------

export function RoomConfigButton(props: Props) {
  const { type, disabled, onClick } = props;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-zinc-100 w-10 aspect-square flex-center rounded-md disabled:opacity-50"
    >
      {type === 'decrement' ? (
        <Minus color="#222" className={iconStyle} />
      ) : (
        <Plus color="#222" className={iconStyle} />
      )}
    </button>
  );
}

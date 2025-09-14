import { Plus } from 'lucide-react';

type Props = {
  disabled: boolean;
  onClick: () => void;
};

// ------------------------------

export function AddButton(props: Props) {
  const { disabled, onClick } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="h-9 text-zinc-800 text-cs08 font-medium px-3.5 flex-center gap-1 border rounded-lg disabled:opacity-50"
    >
      <Plus size={12} />
      <span>افزودن نفر</span>
    </button>
  );
}

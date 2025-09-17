import { Plus } from 'lucide-react';

type Props = {
  openAddCollection: () => void;
};

// -----------------------------

export default function AddCollectionButton(props: Props) {
  return (
    <button
      className="bg-cs-dark-blue h-12 m-6 mt-0 flex-center gap-1.5 rounded-cs-10"
      onClick={props.openAddCollection}
    >
      <Plus color="#fff" size={16} />
      <span className="text-white text-cs08 font-semibold">
        افزودن لیست جدید
      </span>
    </button>
  );
}

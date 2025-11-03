import { IoClose } from 'react-icons/io5';
import { DialogClose } from '@/components/ui/dialog';

type Props = {
  activeIndex: number;
  categoryLength: number;
};

// --------------------------------

export default function TopBar(props: Props) {
  const { activeIndex, categoryLength } = props;

  return (
    <>
      <DialogClose className="absolute top-4 right-4 z-10 bg-white w-8 h-8 flex-center rounded-lg">
        <IoClose className="w-5 h-5 text-zinc-700" />
      </DialogClose>

      <div className="absolute top-4 left-4 z-10 bg-white text-zinc-800 h-8 px-3 text-cs08/6 font-bold flex-center rounded-lg">
        <span className="inline-block w-4 text-center">{activeIndex + 1}</span>
        <span>/</span>
        <span className="inline-block w-4 text-center">{categoryLength}</span>
      </div>
    </>
  );
}

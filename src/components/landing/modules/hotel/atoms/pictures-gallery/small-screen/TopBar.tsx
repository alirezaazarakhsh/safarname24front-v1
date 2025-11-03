import { IoClose } from 'react-icons/io5';
import { SheetClose } from '@/components/ui/sheet';

type Props = {
  activeIndex: number;
  categoryLength: number;
};

// --------------------------------

export default function TopBar(props: Props) {
  const { activeIndex, categoryLength } = props;

  return (
    <div className="flex-between items-center gap-4">
      <div className="text-zinc-300 text-cs08 font-medium flex items-center gap-0.5">
        <span>تصویر</span>
        <span className="w-3 inline-block text-center">{activeIndex + 1}</span>
        <span>از</span>
        <span className="w-3 inline-block text-center">{categoryLength}</span>
      </div>

      <SheetClose className="bg-[#181818] w-8 h-8 flex-center rounded-md">
        <IoClose size={20} color="#888" />
      </SheetClose>
    </div>
  );
}

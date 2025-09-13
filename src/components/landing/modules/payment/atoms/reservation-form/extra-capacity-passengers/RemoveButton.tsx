import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { LuTrash2 } from 'react-icons/lu';

type Props = {
  idx: number;
  onClick: (idx: number) => void;
};

// ------------------------------

export function RemoveButton(props: Props) {
  const { idx, onClick } = props;

  return (
    <Tooltip>
      <TooltipTrigger
        type="button"
        onClick={() => onClick(idx)}
        className="w-10 bg-cs-red/5 mr-3.5 flex-center border border-cs-red/10 rounded-lg"
      >
        <LuTrash2 color="#f30f26" size={20} />
      </TooltipTrigger>

      <TooltipContent>حذف نفر اضافه</TooltipContent>
    </Tooltip>
  );
}

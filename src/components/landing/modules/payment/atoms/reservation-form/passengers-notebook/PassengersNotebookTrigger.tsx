import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { FaUserFriends } from 'react-icons/fa';
import { SheetTrigger } from '@/components/ui/sheet';

// ------------------------------

export function PassengersNotebookTrigger() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <SheetTrigger
          type="button"
          className="bg-cs-blue/5 text-cs-blue text-cs08 font-semibold flex-1 flex-center gap-2 border border-cs-blue/10 rounded-lg"
        >
          <FaUserFriends color="#4b5bce" size={20} />
          <span>دفترچه مسافران</span>
        </SheetTrigger>
      </TooltipTrigger>

      <TooltipContent>انتخاب از دفترچه مسافران</TooltipContent>
    </Tooltip>
  );
}

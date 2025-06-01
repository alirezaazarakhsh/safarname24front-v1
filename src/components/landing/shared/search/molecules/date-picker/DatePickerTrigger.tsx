import { useRef } from 'react';

import { useScrollPosition } from '@/hooks';
import { useSearchContext } from '@/context/SearchContext';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type CommonProps = {
  isOpen: boolean;
  type: 'home' | 'else';
  handleSetOpen: () => void;
};

type Props =
  | ({
      scrollBehavior?: true;
      scrollPosition?: number;
    } & CommonProps)
  | ({
      scrollBehavior?: false;
    } & CommonProps);

// -----------------------------------

export default function DatePickerTrigger(props: Props) {
  const { type, isOpen, handleSetOpen, scrollBehavior } = props;

  const {
    date: { values },
  } = useSearchContext();

  const scrollPosition = useScrollPosition();
  const delayRef = useRef<NodeJS.Timeout | null>(null);

  // === Handle Trigger-OnClick
  function handleDropDownTrigger(e: React.PointerEvent) {
    e.preventDefault();
    if (delayRef.current) clearTimeout(delayRef.current);

    if (!scrollBehavior) {
      handleSetOpen();
      return;
    }

    const delayScroll = props.scrollPosition ?? 300;
    if (scrollPosition !== delayScroll && !isOpen) {
      window.scrollTo({ top: delayScroll });
      delayRef.current = setTimeout(() => {
        handleSetOpen();
      }, 300);
    } else handleSetOpen();
  }

  return (
    <DropdownMenuTrigger asChild>
      <button onPointerDown={(e) => handleDropDownTrigger(e)}>
        {type === 'home' ? (
          <div className="flex flex-col items-start gap-y-2">
            <span className="text-zinc-800 text-cs85 font-extrabold">
              تاریخ ورود و خروج
            </span>

            {values ? (
              <div className="text-zinc-500 text-cs08 font-semibold flex-center gap-1.5">
                <span>{values[0].format()}</span>
                <span>-</span>
                <span>{values[1] && values[1].format()}</span>
              </div>
            ) : (
              <span className="text-zinc-500 text-cs08 font-semibold">
                تاریخ را وارد نمایید
              </span>
            )}
          </div>
        ) : (
          <div className="text-cs08 flex flex-col items-start gap-y-3">
            <span className="text-zinc-800 text-cs08 font-extrabold">
              تاریخ ورود و خروج
            </span>

            <div className="bg-zinc-200/50 w-full h-12 font-semibold px-4 flex items-center rounded-lg">
              {values ? (
                <div className="text-zinc-700 flex-center gap-1">
                  <span>{values[0].format()}</span>
                  <span>-</span>
                  <span>{values[1] && values[1].format()}</span>
                </div>
              ) : (
                <span className="text-zinc-500">تاریخ را وارد نمایید</span>
              )}
            </div>
          </div>
        )}
      </button>
    </DropdownMenuTrigger>
  );
}

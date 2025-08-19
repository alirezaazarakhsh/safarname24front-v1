import { useEffect, useRef, useState } from 'react';
import { useScrollPosition } from '@/hooks';
import { usePassengersContext } from '@/context';
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

export default function PassengersTrigger(props: Props) {
  const { type, isOpen, handleSetOpen, scrollBehavior } = props;

  const scrollPosition = useScrollPosition();
  const [isMounted, setIsMounted] = useState(false);

  const delayRef = useRef<NodeJS.Timeout | null>(null);
  const { confirmedPassengers } = usePassengersContext();

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
              مسافران
            </span>

            {confirmedPassengers.passengers ? (
              <div className="text-zinc-500 text-cs08 font-semibold flex-center gap-0.5">
                <span>{confirmedPassengers.passengers}</span>
                <span>مسافر</span>
                <span>,</span>
                <span>{confirmedPassengers.rooms}</span>
                <span>اتاق</span>
              </div>
            ) : (
              <span className="text-zinc-500 text-cs08 font-semibold">
                تعداد مسافر و اتاق
              </span>
            )}
          </div>
        ) : (
          <div className="text-cs08 flex flex-col items-start gap-y-3">
            <span className="text-zinc-800 text-cs08 font-extrabold">
              مسافران
            </span>

            <div className="bg-zinc-200/50 w-full h-12 font-semibold px-4 flex items-center rounded-lg">
              {isMounted || !confirmedPassengers.passengers ? (
                <div className="text-zinc-700 flex-center gap-0.5">
                  <span>{confirmedPassengers.passengers}</span>
                  <span>مسافر</span>
                  <span>,</span>
                  <span>{confirmedPassengers.rooms}</span>
                  <span>اتاق</span>
                </div>
              ) : (
                <span className="text-zinc-500">تعداد مسافر و اتاق</span>
              )}
            </div>
          </div>
        )}
      </button>
    </DropdownMenuTrigger>
  );
}

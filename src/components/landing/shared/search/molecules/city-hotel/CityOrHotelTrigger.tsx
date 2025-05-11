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

export default function CityOrHotelTrigger(props: Props) {
  const { type, isOpen, handleSetOpen, scrollBehavior } = props;

  const {
    cityOrHotel: { confirmedValues },
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
    <DropdownMenuTrigger asChild className="hidden lg:block">
      <button onPointerDown={(e) => handleDropDownTrigger(e)}>
        {type === 'home' ? (
          <div className="flex flex-col items-start gap-y-2 truncate">
            <span className="text-zinc-800 text-cs85 font-extrabold">
              انتخاب شهر یا هتل
            </span>

            {confirmedValues.city ? (
              <div className="text-zinc-500 text-cs08 font-semibold flex items-center gap-1">
                {confirmedValues.hotel ? (
                  <>
                    <span>هتل</span>
                    <span>{confirmedValues.hotel}</span>
                    <span>-</span>
                    <span>{confirmedValues.city}</span>
                  </>
                ) : (
                  <>
                    <span>{confirmedValues.city}</span>
                    <span>-</span>
                    <span>{confirmedValues.province}</span>
                  </>
                )}
              </div>
            ) : (
              <span className="text-zinc-500 text-cs08 font-semibold flex items-center gap-1.5">
                <span>شهر یا هتل</span>
                <span>(داخلی , خارجی)</span>
              </span>
            )}
          </div>
        ) : (
          <div className="text-cs08 flex flex-col items-start gap-y-3">
            <span className="text-zinc-800 text-cs08 font-extrabold">
              انتخاب شهر یا هتل
            </span>

            <div className="bg-zinc-200/50 w-full h-12 font-semibold px-4 flex items-center gap-0.5 rounded-lg">
              {confirmedValues.city ? (
                <div className="text-zinc-700 flex items-center gap-1">
                  {confirmedValues.hotel ? (
                    <>
                      <span>هتل</span>
                      <span>{confirmedValues.hotel}</span>
                      <span>-</span>
                      <span>{confirmedValues.city}</span>
                    </>
                  ) : (
                    <>
                      <span>{confirmedValues.city}</span>
                      <span>-</span>
                      <span>استان</span>
                      <span>{confirmedValues.province}</span>
                    </>
                  )}
                </div>
              ) : (
                <span className="text-zinc-500 flex items-center gap-1.5">
                  <span>شهر یا هتل</span>
                  <span>(داخلی , خارجی)</span>
                </span>
              )}
            </div>
          </div>
        )}
      </button>
    </DropdownMenuTrigger>
  );
}

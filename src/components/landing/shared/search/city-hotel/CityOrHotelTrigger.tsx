import { useRef } from 'react';
import { useEffect } from 'react';
import { useScrollPosition } from '@/hooks';
import { useHotelOrCityContext, useHotelOrCityDispatch } from '@/context';
import { useSearchParams } from 'next/navigation';
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

  const searchParams = useSearchParams();
  const scrollPosition = useScrollPosition();
  const dispatch = useHotelOrCityDispatch();
  const delayRef = useRef<NodeJS.Timeout | null>(null);
  const { value, confirmedValue, inputValue } = useHotelOrCityContext();

  useEffect(() => {
    const city = searchParams.get('city');
    const province = searchParams.get('province');

    if (city && province) {
      dispatch({
        type: 'first-render',
        payload: { city, province },
      });
    }
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
    <DropdownMenuTrigger asChild className="hidden lg:block">
      <button onPointerDown={(e) => handleDropDownTrigger(e)}>
        {type === 'home' ? (
          <div className="flex flex-col items-start gap-y-2 truncate">
            <span className="text-zinc-800 text-cs85 font-extrabold">
              انتخاب شهر یا هتل
            </span>

            {confirmedValue.city ? (
              <div className="text-zinc-500 text-cs08 font-semibold flex items-center gap-1">
                {confirmedValue.hotel ? (
                  <>
                    <span>هتل</span>
                    <span>{confirmedValue.hotel}</span>
                    <span>-</span>
                    <span>{confirmedValue.city}</span>
                  </>
                ) : (
                  <>
                    <span>{confirmedValue.city}</span>
                    <span>-</span>
                    <span>{confirmedValue.province}</span>
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
              {confirmedValue.city ? (
                <div className="text-zinc-700 flex items-center gap-1">
                  {confirmedValue.hotel ? (
                    <>
                      <span>هتل</span>
                      <span>{confirmedValue.hotel}</span>
                      <span>-</span>
                      <span>{confirmedValue.city}</span>
                    </>
                  ) : (
                    <>
                      <span>{confirmedValue.city}</span>
                      <span>-</span>
                      <span>استان</span>
                      <span>{confirmedValue.province}</span>
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

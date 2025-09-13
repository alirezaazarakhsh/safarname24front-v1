import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import { Skeleton } from '@/components/ui/skeleton';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

interface Props {
  rooms: string[];
  isLoading: boolean;
}

// ------------------------------

export function RoomName(props: Props) {
  const { rooms, isLoading } = props;

  const isSingle = rooms?.length === 1;
  if (!isLoading && (!rooms || !rooms.length)) return null;

  return (
    <div className="flex gap-3">
      <div className="bg-zinc-100 w-[2.6rem] aspect-square flex-center rounded-lg">
        <IconsaxIcons name="House" size={20} color="#222" />
      </div>

      <div className="flex-1 text-cs08 flex flex-col justify-between">
        <div className="font-bold">
          {isSingle ? 'نام اتاق' : 'نام اتاق ها'} :
        </div>

        {isLoading ? (
          <Skeleton className="w-1/2 max-w-40 h-3 rounded" />
        ) : (
          <div className="max-w-[90%] text-zinc-500 font-semibold truncate">
            {isSingle ? (
              rooms[0]
            ) : (
              <HoverCard openDelay={200}>
                <HoverCardTrigger>{rooms[0]} ...</HoverCardTrigger>

                <HoverCardContent
                  sideOffset={8}
                  className="w-fit bg-white py-3 space-y-1 rounded-lg shadow-light"
                >
                  {rooms.map((item, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      <div className="w-1 bg-zinc-500 aspect-square rounded-full" />

                      <span className="text-zinc-600 text-cs08/5 font-semibold">
                        {item}
                      </span>
                    </div>
                  ))}
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

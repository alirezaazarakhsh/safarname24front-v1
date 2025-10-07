import { IconsName } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

interface Props {
  title: string;
  value: string;
  icon: IconsName;
  isError: boolean;
  isLoading: boolean;
}

// ------------------------------

export function ReservationField(props: Props) {
  const { icon, title, value, isLoading, isError } = props;

  if (!isLoading && !value) return null;

  return (
    <div className="flex gap-3 overflow-hidden">
      <div className="bg-zinc-100 w-[2.6rem] aspect-square flex-center rounded-lg">
        <IconsaxIcons name={icon} size={20} color="#222" />
      </div>

      <div className="flex-1 text-cs08 flex flex-col justify-between">
        <span className="font-bold">{title} :</span>

        {isLoading ? (
          <Skeleton className="w-1/2 max-w-40 h-3 rounded" />
        ) : (
          <div className="max-w-52 text-zinc-500 font-semibold truncate ">
            {isError ? '- - - - - -' : value}
          </div>
        )}
      </div>
    </div>
  );
}

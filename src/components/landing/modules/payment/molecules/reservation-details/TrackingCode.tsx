import { usePathname } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

type Props = {
  isLoading: boolean;
  value: string | null;
};

// ------------------------------

export function TrackingCode(props: Props) {
  const { value, isLoading } = props;
  const pathname = usePathname();

  return (
    <div className="flex gap-3">
      <div className="bg-zinc-100 w-[2.6rem] aspect-square flex-center rounded-lg">
        <IconsaxIcons name="HashtagUp" size={20} color="#222" />
      </div>

      <div className="flex-1 text-cs08 flex flex-col justify-between">
        <span className="font-bold">کد پیگیری :</span>

        {isLoading ? (
          <Skeleton className="w-1/2 max-w-40 h-3 rounded" />
        ) : (
          <div className="max-w-52 text-zinc-500 font-semibold truncate">
            {pathname === '/payment/complete-passengers-information'
              ? '- - - - - - -'
              : value || 'sdv45hy'}
          </div>
        )}
      </div>
    </div>
  );
}

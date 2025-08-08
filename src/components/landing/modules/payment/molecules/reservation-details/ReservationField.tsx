import { IconsName } from '@/types';
import { twMerge } from 'tailwind-merge';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

interface Props {
  title: string;
  value: string;
  icon: IconsName;
  valueClassName?: string;
  valueDirection?: 'rtl' | 'ltr';
}

// ------------------------------

export function ReservationField(props: Props) {
  const { icon, title, value, valueClassName, valueDirection = 'rtl' } = props;

  return (
    <div className="flex items-center gap-3">
      <div className="bg-zinc-100 w-10 aspect-square flex-center rounded-lg">
        <IconsaxIcons name={icon} size={20} />
      </div>

      <div className="text-cs08 flex flex-col gap-1">
        <span className="font-bold">{title} :</span>
        <span
          dir={valueDirection}
          className={twMerge('text-zinc-500 font-semibold', valueClassName)}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

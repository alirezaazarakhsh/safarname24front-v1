import { IconsName } from '@/types';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

interface Props {
  title: string;
  icon: IconsName;
  subtitle: string;
}

// ------------------------------

export default function ReservationField(props: Props) {
  const { icon, title, subtitle } = props;

  return (
    <div className="flex items-center gap-3.5">
      <div className="bg-zinc-100 w-12 h-12 flex-center rounded-lg">
        <IconsaxIcons name={icon} size={22} />
      </div>

      <div className="text-cs85 font-bold flex flex-col gap-1">
        <span>{title} :</span>
        <span className="text-zinc-600">{subtitle}</span>
      </div>
    </div>
  );
}

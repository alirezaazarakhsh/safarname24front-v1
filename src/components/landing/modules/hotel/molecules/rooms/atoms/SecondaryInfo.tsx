import { IconsName } from '@/types';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

type Props = {
  info: {
    capacity: number;
    services: string;
    extraCapacity: number;
    customerClub: number;
  };
};

// -------------------------------------

export function SecondaryInfo(props: Props) {
  const {
    info: { capacity, services, extraCapacity, customerClub },
  } = props;

  return (
    <div className="mt-4 grid gap-3.5 overflow-hidden lg:grid-cols-2 lg:mt-auto">
      <InfoItem value={capacity} type="capacity" />
      <InfoItem value={services} type="services" />
      <InfoItem value={extraCapacity} type="extraCapacity" />
      <InfoItem value={customerClub} type="customerClub" />
    </div>
  );
}

// -------------------------------------

type InfoItemProps = {
  value: number | string;
  type: 'capacity' | 'services' | 'extraCapacity' | 'customerClub';
};

type Info = { id: string; info: string[]; icon: IconsName };

const allInfo: Info[] = [
  { id: 'capacity', info: ['ظرفیت اتاق', 'نفره'], icon: 'Profile2User' },
  { id: 'services', info: ['خدمات هتل', ''], icon: 'Coffee' },
  { id: 'extraCapacity', info: ['نفر اضافه', 'تخت'], icon: 'Grammerly' },
  { id: 'customerClub', info: ['باشگاه مشتریان', 'امتیاز'], icon: 'Star1' },
];

export default function InfoItem(props: InfoItemProps) {
  const { value, type } = props;

  const info = allInfo.find((info) => info.id === type);
  if (!value) return;

  return (
    <div className="flex items-center gap-2.5">
      <IconsaxIcons
        size={20}
        name={info!.icon}
        className="shrink-0"
        color="currentColor"
        variant="Outline"
      />

      <div className="text-zinc-800 text-cs08 font-semibold truncate flex items-center gap-1 lg:text-cs85">
        <span>{info?.info[0]}</span>
        <span>:</span>
        <span>{value}</span>
        <span>{info?.info[1]}</span>
      </div>
    </div>
  );
}

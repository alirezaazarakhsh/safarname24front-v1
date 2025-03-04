import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

type Props = { title: string; id: string };

// -------------------------------------

export default function SwitchFilter(props: Props) {
  const { title, id } = props;

  return (
    <div className="flex-between select-none cursor-pointer">
      <Label
        htmlFor={id}
        className="h-6 text-zinc-700 text-[0.8rem] font-bold flex-1 flex items-center cursor-pointer"
      >
        {title}
      </Label>
      <Switch dir="ltr" id={id} />
    </div>
  );
}

import { IconsName } from '@/types';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

interface Props {
  step: string;
  index: number;
  title: string;
  icon: IconsName;
  errorSlot: number;
  activeStep: number;
}

// ------------------------------

export default function Step(props: Props) {
  const { icon, title, step, activeStep, index, errorSlot } = props;

  const isError = errorSlot === index;
  const isActive = activeStep === index;
  const isFulfilled = activeStep > index;

  return (
    <div className="w-full flex items-center gap-1.5 group last:w-fit lg:max-w-max lg:last:w-full lg:gap-3">
      <div
        className={`w-11 h-11 flex-center cursor-pointer border-2 rounded-full lg:rounded-lg ${isError ? 'bg-red-500/10 border-red-500' : isActive ? 'border-zinc-300' : isFulfilled ? 'bg-green-500/10 border-green-500' : 'bg-zinc-200/50 border-transparent lg:bg-zinc-100'}`}
      >
        <IconsaxIcons
          size={20}
          name={icon}
          color={isError ? '#ef4444' : isFulfilled ? '#16a34a' : '#333'}
        />
      </div>

      <div className="font-semibold hidden gap-1.5 lg:grid">
        <span className="text-zinc-600 text-cs08">مرحله {step}</span>
        <span className="text-cs85">{title}</span>
      </div>

      <span
        className={`h-0.5 flex-1 rounded group-last:hidden lg:hidden ${isFulfilled ? 'bg-green-500' : 'bg-zinc-200'}`}
      />
    </div>
  );
}

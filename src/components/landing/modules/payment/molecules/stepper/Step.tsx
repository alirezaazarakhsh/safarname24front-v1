import { IconsName } from '@/types';
import { payment } from '../../helpers/constant';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

type Props = {
  step: number;
  title: string;
  icon: IconsName;
  isActive: boolean;
  isConfirmed: boolean;
};

// ------------------------------

export function Step(props: Props) {
  const { icon, isActive, isConfirmed, step, title } = props;
  const { stepper } = payment;

  return (
    <div className="w-full flex items-center gap-1.5 group last:w-fit lg:max-w-max lg:last:w-full lg:gap-3">
      <div
        className={`w-11 aspect-square flex-center cursor-pointer border rounded-full lg:rounded-cs-10 ${isActive ? 'border-zinc-300' : isConfirmed ? 'bg-green-500/[0.08] border-green-500' : 'bg-zinc-200/60 border-transparent lg:bg-zinc-100'}`}
      >
        {!isConfirmed ? (
          <IconsaxIcons size={20} name={icon} color="#333" />
        ) : (
          <IconsaxIcons size={24} name={'Verify'} color="#16a34a" />
        )}
      </div>

      <div className="hidden gap-1 lg:grid">
        <span
          data-active={isConfirmed}
          className="text-zinc-500 text-cs08/5 font-semibold data-[active=true]:text-[#16a34a]"
        >
          مرحله {stepper[step].step}
        </span>

        <span
          data-active={isConfirmed}
          className="text-cs85 font-bold data-[active=true]:text-[#16a34a]"
        >
          {title}
        </span>
      </div>

      <span
        className={`h-0.5 flex-1 border border-dashed rounded group-last:hidden lg:hidden ${isConfirmed ? 'border-green-500' : 'border-zinc-300'}`}
      />
    </div>
  );
}

import { memo } from 'react';
import { IconsName } from '@/types';

import { payment } from '../../helpers/constant';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

type Props = {
  step: number;
  title: string;
  icon: IconsName;
  isActive: boolean;
  isConfirmed: 'confirmed' | 'rejected' | 'pending';
};

// ------------------------------

export const Step = memo(function Step(props: Props) {
  const { icon, isActive, isConfirmed, step, title } = props;
  const { stepper } = payment;

  return (
    <div className="group flex w-full items-center gap-1.5 last:w-fit lg:max-w-max lg:gap-3 lg:last:w-full">
      <div
        className={`flex-center aspect-square w-11 rounded-full border lg:rounded-cs-10 ${isConfirmed === 'confirmed' ? 'border-green-500 bg-green-500/5' : isConfirmed === 'rejected' ? 'border-cs-red bg-cs-red/5' : isActive ? 'border-zinc-300' : 'border-transparent bg-zinc-200/60 lg:bg-zinc-100'}`}
      >
        {isConfirmed === 'pending' ? (
          <IconsaxIcons size={20} name={icon} color="#333" />
        ) : isConfirmed === 'confirmed' ? (
          <IconsaxIcons size={24} name={'Verify'} color="#16a34a" />
        ) : isConfirmed === 'rejected' ? (
          <IconsaxIcons size={24} name={'CloseSquare'} color="#f30f26" />
        ) : null}
      </div>

      <div className="hidden gap-1 lg:grid">
        <span
          data-confirm={isConfirmed}
          className="text-cs08/5 font-semibold text-zinc-500 data-[confirm=confirmed]:text-[#16a34a] data-[confirm=rejected]:text-[#f30f26]"
        >
          مرحله {stepper[step].step}
        </span>

        <span
          data-confirm={isConfirmed}
          className="text-cs85 font-bold data-[confirm=confirmed]:text-[#16a34a] data-[confirm=rejected]:text-[#f30f26]"
        >
          {title}
        </span>
      </div>

      <span
        className={`h-0.5 flex-1 rounded border border-dashed group-last:hidden lg:hidden ${isConfirmed ? 'border-green-500' : 'border-zinc-300'}`}
      />
    </div>
  );
});

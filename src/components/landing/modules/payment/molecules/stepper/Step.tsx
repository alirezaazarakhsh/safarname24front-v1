import { memo } from 'react';
import { IconsName } from '@/types';

import { payment } from '../../helpers/constant';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  step: number;
  title: string;
  icon: IconsName;
  isActive: boolean;
  isLoading: boolean;
  isConfirmed: 'confirmed' | 'rejected' | 'pending';
};

// ------------------------------

export const Step = memo(function Step(props: Props) {
  const { icon, isActive, isConfirmed, step, title, isLoading } = props;
  const { stepper } = payment;

  return (
    <div className="w-full flex items-center gap-1.5 group last:w-fit lg:max-w-max lg:last:w-full lg:gap-3">
      {isLoading ? (
        <div className="w-40 h-11 hidden gap-3 lg:flex">
          <Skeleton className="w-11 aspect-square rounded-cs-10" />

          <div className="flex-1 grid gap-2.5">
            <Skeleton className="rounded-md" />
            <Skeleton className="rounded-md" />
          </div>
        </div>
      ) : (
        <>
          <div
            className={`w-11 aspect-square flex-center border rounded-full lg:rounded-cs-10 ${isConfirmed === 'confirmed' ? 'bg-green-500/5 border-green-500' : isConfirmed === 'rejected' ? 'bg-cs-red/5 border-cs-red' : isActive ? 'border-zinc-300' : 'bg-zinc-200/60 border-transparent lg:bg-zinc-100'}`}
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
              className="text-zinc-500 text-cs08/5 font-semibold data-[confirm=confirmed]:text-[#16a34a] data-[confirm=rejected]:text-[#f30f26]"
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
            className={`h-0.5 flex-1 border border-dashed rounded group-last:hidden lg:hidden ${isConfirmed ? 'border-green-500' : 'border-zinc-300'}`}
          />
        </>
      )}
    </div>
  );
});

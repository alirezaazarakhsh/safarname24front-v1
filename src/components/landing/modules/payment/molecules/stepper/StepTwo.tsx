import { memo } from 'react';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { useReservationStatus } from '../../helpers/useReservationStatus';

type Props = {
  activeStep: number;
  trackingCode: string | null;
};

// ------------------------------

export const StepTwo = memo(function StepTwo(props: Props) {
  const { trackingCode, activeStep } = props;
  const { status } = useReservationStatus(trackingCode);

  return (
    <div className="flex w-full items-center gap-1.5 last:w-fit lg:max-w-max lg:gap-3 lg:last:w-full">
      <div
        className={`flex-center aspect-square w-11 rounded-full border lg:rounded-cs-10 ${status === 'confirmed' ? 'border-green-500 bg-green-500/5' : status === 'rejected' ? 'border-cs-red bg-cs-red/5' : activeStep === 2 ? 'border-zinc-300' : 'border-transparent bg-zinc-200/60 lg:bg-zinc-100'}`}
      >
        {status === 'confirmed' ? (
          <IconsaxIcons size={24} name={'Verify'} color="#16a34a" />
        ) : status === 'rejected' ? (
          <IconsaxIcons size={24} name={'CloseSquare'} color="#f30f26" />
        ) : (
          <IconsaxIcons size={20} name={'Buildings'} color="#333" />
        )}
      </div>

      <div className="hidden gap-1 lg:grid">
        <span
          className={`text-cs08/5 font-semibold ${status === 'confirmed' ? 'text-[#16a34a]' : status === 'rejected' ? 'text-cs-red' : 'text-zinc-500'}`}
        >
          مرحله دوم
        </span>

        <span
          className={`text-cs85 font-bold ${status === 'confirmed' ? 'text-[#16a34a]' : status === 'rejected' ? 'text-cs-red' : 'text-zinc-500'}`}
        >
          بررسی ظرفیت اتاق
        </span>
      </div>

      <span
        className={`h-0.5 flex-1 rounded border border-dashed group-last:hidden lg:hidden ${status === 'confirmed' ? 'border-green-500' : status === 'rejected' ? 'border-cs-red' : 'border-zinc-300'}`}
      />
    </div>
  );
});

import { memo } from 'react';
import { axiosInstance } from '@/utils/axios';

import { FormSchema } from '../../helpers/type';
import { useQuery } from '@tanstack/react-query';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

type Props = {
  activeStep: number;
  trackingCode: string | null;
};

// ------------------------------

export const StepOne = memo(function StepOne(props: Props) {
  const { trackingCode, activeStep } = props;

  const { data: reservationForm, status } = useQuery<FormSchema>({
    queryKey: ['reservation-form'],
    queryFn: async () => {
      return axiosInstance(`/hotel/reservation/form/${trackingCode}/`).then(
        (data) => data.data,
      );
    },
  });

  const isConfirmed = reservationForm?.rooms[0].passengers.main_passenger
    .first_name
    ? true
    : false;

  return (
    <div className="flex w-full items-center gap-1.5 last:w-fit lg:max-w-max lg:gap-3 lg:last:w-full">
      <div
        className={`flex-center aspect-square w-11 rounded-full border lg:rounded-cs-10 ${isConfirmed ? 'border-green-500 bg-green-500/5' : status === 'error' ? 'border-cs-red bg-cs-red/5' : activeStep === 1 ? 'border-zinc-300' : 'border-transparent bg-zinc-200/60 lg:bg-zinc-100'}`}
      >
        {!isConfirmed ? (
          <IconsaxIcons size={20} name={'Profile2User'} color="#333" />
        ) : isConfirmed ? (
          <IconsaxIcons size={24} name={'Verify'} color="#16a34a" />
        ) : status === 'error' ? (
          <IconsaxIcons size={24} name={'CloseSquare'} color="#f30f26" />
        ) : null}
      </div>

      <div className="hidden gap-1 lg:grid">
        <span
          className={`text-cs08/5 font-semibold ${isConfirmed ? 'text-[#16a34a]' : status === 'error' ? 'text-cs-red' : 'text-zinc-500'}`}
        >
          مرحله اول
        </span>

        <span
          data-confirm={isConfirmed}
          className={`text-cs85 font-bold ${isConfirmed ? 'text-[#16a34a]' : status === 'error' ? 'text-cs-red' : 'text-zinc-500'}`}
        >
          تکمیل مشخصات مسافران
        </span>
      </div>

      <span
        className={`h-0.5 flex-1 rounded border border-dashed group-last:hidden lg:hidden ${isConfirmed ? 'border-green-500' : status === 'error' ? 'border-cs-red' : 'border-zinc-300'}`}
      />
    </div>
  );
});

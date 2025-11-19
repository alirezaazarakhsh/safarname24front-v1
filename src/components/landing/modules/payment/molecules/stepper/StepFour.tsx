import { memo } from 'react';
import { axiosInstance } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

type ApiResponse = { payment_status: 'unpaid' | 'paid' | 'pending' };

type Props = {
  activeStep: number;
  trackingCode: string | null;
};

// ------------------------------

export const StepFour = memo(function StepFour(props: Props) {
  const { trackingCode, activeStep } = props;

  const { data } = useQuery<ApiResponse>({
    queryKey: ['payment-status'],
    queryFn: () =>
      axiosInstance(`/payment/payment-status/${trackingCode}/`).then(
        (data) => data.data,
      ),
  });

  const paymentStatus = data?.payment_status;

  return (
    <div className="flex w-full items-center gap-1.5 last:w-fit lg:max-w-max lg:gap-3 lg:last:w-full">
      <div
        className={`flex-center aspect-square w-11 rounded-full border lg:rounded-cs-10 ${paymentStatus === 'paid' ? 'border-green-500 bg-green-500/5' : paymentStatus === 'unpaid' ? 'border-cs-red bg-cs-red/5' : activeStep === 3 ? 'border-zinc-300' : 'border-transparent bg-zinc-200/60 lg:bg-zinc-100'}`}
      >
        {paymentStatus === 'paid' ? (
          <IconsaxIcons size={24} name={'Verify'} color="#16a34a" />
        ) : paymentStatus === 'unpaid' ? (
          <IconsaxIcons size={24} name={'CloseSquare'} color="#f30f26" />
        ) : (
          <IconsaxIcons size={20} name={'Receipt21'} color="#333" />
        )}
      </div>

      <div className="hidden gap-1 lg:grid">
        <span
          className={`text-cs08/5 font-semibold ${paymentStatus === 'paid' ? 'text-[#16a34a]' : paymentStatus === 'unpaid' ? 'text-cs-red' : 'text-zinc-500'}`}
        >
          مرحله چهارم
        </span>

        <span
          className={`text-cs85 font-bold ${paymentStatus === 'paid' ? 'text-[#16a34a]' : paymentStatus === 'unpaid' ? 'text-cs-red' : 'text-zinc-500'}`}
        >
          صدور واچر
        </span>
      </div>

      {/* <span
        className={`h-0.5 flex-1 rounded border border-dashed group-last:hidden lg:hidden ${paymentStatus === 'paid' ? 'border-green-500' : paymentStatus === 'unpaid' ? 'border-cs-red' : 'border-zinc-300'}`}
      /> */}
    </div>
  );
});

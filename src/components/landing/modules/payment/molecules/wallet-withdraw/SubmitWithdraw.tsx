import { CSSVars } from '@/types/landing';
import { numberSeparation } from '@/utils';

import { Invoice } from '../../helpers/type';
import { axiosInstance } from '@/utils/axios';
import loader from '@/styles/loader.module.css';

import { useMutation } from '@tanstack/react-query';
import { showCMToast } from '@/components/landing/shared/toast';
import { AxiosError } from 'axios';

type Props = {
  walletBalance?: number;
  withdrawalAmount: string;
  trackingCode: string | null;
  handleInvalidateQuery: () => void;
};

type ApiResponse = { data: Invoice };
const MIN_WITHDRAW = 10_000;

// ------------------------------

export function SubmitWithdraw(props: Props) {
  const {
    trackingCode,
    walletBalance,
    withdrawalAmount,
    handleInvalidateQuery,
  } = props;

  const { mutate, status } = useMutation<ApiResponse, AxiosError<any>>({
    mutationFn: () => {
      return axiosInstance.post(
        `/hotel/reservation/wallet/withdraw/${trackingCode}/`,
        {
          amount: withdrawalAmount,
        },
      );
    },
    onSuccess: () => {
      handleInvalidateQuery();

      showCMToast({
        duration: 8000,
        type: 'success',
        title: 'برداشت از کیف پول با موفقیت انجام شد',
        description: `کاربر گرامی مبلغ ${numberSeparation(withdrawalAmount)} تومان از کیف پول شما کسر گردید`,
      });
    },
    onError: (error) => {
      showCMToast({
        type: 'error',
        title: 'برداشت از کیف پول با خطا مواجه شد !',
        description: error.response?.data.detail
          ? error.response?.data.detail
          : 'کاربر گرامی در انجام عملیات برداشت از کیف پول مشکلی وجود دارد',
      });
    },
  });

  function handleSubmitWithdraw() {
    const amount = Number(withdrawalAmount);

    if (amount < MIN_WITHDRAW) {
      showCMToast({
        type: 'error',
        title: 'برداشت از کیف پول با خطا مواجه شد !',
        description: `کاربر گرامی حداقل مبلغ برداشت ${numberSeparation(MIN_WITHDRAW)} تومان میباشد`,
      });
      return;
    } else if (amount > Number(walletBalance)) {
      showCMToast({
        type: 'error',
        title: 'برداشت از کیف پول با خطا مواجه شد !',
        description: `کاربر گرامی مبلغ برداشتی بیشتر از موجودی کیف پول میباشد`,
      });
      return;
    }

    mutate();
  }

  return (
    <button
      onClick={handleSubmitWithdraw}
      disabled={!withdrawalAmount || status === 'pending'}
      className="flex-center w-20 rounded-cs-10 bg-[#22AD5A]/10 text-cs09 font-bold text-[#22AD5A] transition-colors hover:bg-[#22AD5A]/15 disabled:cursor-not-allowed"
    >
      {status === 'pending' ? (
        <div
          className={loader.dots}
          style={{ '--dots-color': '#22AD5A', scale: '0.8' } as CSSVars}
        />
      ) : (
        'تایید'
      )}
    </button>
  );
}

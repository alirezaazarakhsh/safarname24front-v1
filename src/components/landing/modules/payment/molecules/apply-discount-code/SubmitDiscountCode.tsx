import { CSSVars } from '@/types/landing';
import { numberSeparation } from '@/utils';
import { axiosInstance } from '@/utils/axios';

import loader from '@/styles/loader.module.css';
import { useMutation } from '@tanstack/react-query';
import { showCMToast } from '@/components/landing/shared/toast';

type Props = {
  discountCode: string;
  trackingCode: string | null;
  handleInvalidateQuery: () => void;
};

type ApiResponse = { data: { discount_value: number } };

// ------------------------------

export function SubmitDiscountCode(props: Props) {
  const { discountCode, trackingCode, handleInvalidateQuery } = props;

  const { mutate, status } = useMutation<ApiResponse>({
    mutationFn: () => {
      return axiosInstance.post(
        `/hotel/reservation/discount-code/${trackingCode}/`,
        {
          discount_code: discountCode,
        },
      );
    },
    onSuccess: (data) => {
      handleInvalidateQuery();
      showCMToast({
        duration: 8000,
        type: 'success',
        title: 'اعمال کد تخفیف با موفقیت انجام شد',
        description: `کاربر گرامی مبلغ ${numberSeparation(data?.data.discount_value)} تومان از صورتحساب شما کسر گردید`,
      });
    },
    onError: () => {
      showCMToast({
        type: 'error',
        title: 'اعمال کد تخفیف با خطا مواجه شد !',
        description: 'کاربر گرامی کد تخفیف وارد شده معتبر نمی باشد',
      });
    },
  });

  return (
    <button
      onClick={() => mutate()}
      disabled={discountCode.length < 8 || status === 'pending'}
      className="bg-cs-dark-blue text-white flex-center rounded-cs-10 transition-all disabled:cursor-not-allowed"
    >
      {status === 'pending' ? (
        <div
          className={loader.dots}
          style={{ '--dots-color': '#fff', scale: '0.8' } as CSSVars}
        />
      ) : (
        <span>اعمال کد تخفیف</span>
      )}
    </button>
  );
}

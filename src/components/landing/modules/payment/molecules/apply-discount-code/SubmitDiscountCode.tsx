import { toast } from 'sonner';
import { CSSVars } from '@/types/landing';

import { numberSeparation } from '@/utils';
import { axiosInstance } from '@/utils/axios';

import loader from '@/styles/loader.module.css';
import { useMutation } from '@tanstack/react-query';
import { CustomSoonerToast } from '@/components/landing/shared/toast';

type Props = {
  discountCode: string;
  trackingCode: string | null;
};

type ApiResponse = { discount_price: number };

// ------------------------------

export function SubmitDiscountCode(props: Props) {
  const { discountCode, trackingCode } = props;

  const { mutate, status } = useMutation<ApiResponse>({
    mutationFn: () => {
      return axiosInstance.post(`/auth/${trackingCode}`, {
        discount_code: discountCode,
      });
    },
    onSuccess: (data) => {
      console.log(data);
      toast.custom(
        (id) => (
          <CustomSoonerToast
            id={id}
            type="success"
            duration={10000}
            title="اعمال کد تخفیف با موفقیت انجام شد"
            subtitle={`کاربر گرامی مبلغ ${numberSeparation(data.discount_price ?? 3_000_000)} تومان از صورتحساب شما کسر گردید`}
          />
        ),
        { duration: 10000 },
      );
    },
    onError: (error) => {
      console.error(error);
      toast.custom(
        (id) => (
          <CustomSoonerToast
            id={id}
            type="error"
            title="اعمال کد تخفیف با خطا مواجه شد !"
            subtitle="کاربر گرامی کد تخفیف وارد شده معتبر نمی باشد"
          />
        ),
        { duration: 5000 },
      );
    },
  });

  function handlePostDiscountCode() {
    if (discountCode.length < 8) return;
    mutate();
  }

  return (
    <button
      onClick={handlePostDiscountCode}
      disabled={discountCode.length < 8}
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

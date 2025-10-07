import { CSSVars } from '@/types/landing';
import { axiosInstance } from '@/utils/axios';
import loader from '@/styles/loader.module.css';

import { useMutation } from '@tanstack/react-query';
import { showCMToast } from '@/components/landing/shared/toast';

type Props = {
  trackingCode: string | null;
  handleInvalidateQuery: () => void;
};

// ------------------------------

export function RemoveWithdraw(props: Props) {
  const { trackingCode, handleInvalidateQuery } = props;

  const { mutate, status } = useMutation({
    mutationFn: () => {
      return axiosInstance.delete(
        `/hotel/reservation/discount-code/${trackingCode}/`,
      );
    },
    onSuccess: (data) => {
      console.log(data);
      // handleInvalidateQuery();

      showCMToast({
        duration: 8000,
        type: 'success',
        title: 'عملیات حذف با موفقیت انجام شد',
        description: 'کاربر گرامی مبلغ انتخایی کیف پول از صورتحساب حذف گردید',
      });
    },
    onError: (error) => {
      console.error(error);

      showCMToast({
        type: 'error',
        title: 'عملیات حذف با خطا مواجه شد !',
        description:
          'کاربر گرامی در انجام عملیات بروزرسانی کیف پول مشکلی وجود دارد',
      });
    },
  });

  return (
    <button
      onClick={() => mutate()}
      disabled={status === 'pending'}
      className="w-20 bg-cs-red/10 text-cs-red font-bold flex-center rounded-cs-10 transition-colors disabled:cursor-not-allowed hover:bg-cs-red/15"
    >
      {status === 'pending' ? (
        <div
          className={loader.dots}
          style={{ '--dots-color': '#f30f26', scale: '0.8' } as CSSVars}
        />
      ) : (
        'حذف'
      )}
    </button>
  );
}

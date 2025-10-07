import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { CSSVars } from '@/types/landing';
import { axiosInstance } from '@/utils/axios';

import { FaRegTrashAlt } from 'react-icons/fa';
import loader from '@/styles/loader.module.css';

import { useMutation } from '@tanstack/react-query';
import { showCMToast } from '@/components/landing/shared/toast';

type Props = {
  trackingCode: string | null;
  handleInvalidateQuery: () => void;
};

// ------------------------------

export function RemoveDiscountCode(props: Props) {
  const { trackingCode, handleInvalidateQuery } = props;

  const { mutate, status } = useMutation({
    mutationFn: () => {
      return axiosInstance.delete(
        `/hotel/reservation/discount-code/${trackingCode}/`,
      );
    },
    onSuccess: () => {
      handleInvalidateQuery();
      showCMToast({
        duration: 5000,
        type: 'success',
        title: 'حذف کد تخفیف با موفقیت انجام شد',
        description: 'کاربر گرامی کد تخفیف ثبت شده شما از صورتحساب حذف گردید',
      });
    },
    onError: () => {
      showCMToast({
        duration: 5000,
        type: 'success',
        title: 'حذف کد تخفیف با خطا روبرو شد !',
        description: 'کاربر گرامی متاسفانه عملیات حذف کد تخفیف ناموفق بود',
      });
    },
  });

  return (
    <Tooltip>
      <TooltipTrigger
        type="button"
        onClick={() => mutate()}
        disabled={status === 'pending'}
        className="w-10 bg-cs-red/90 flex-center rounded-lg transition-colors hover:bg-cs-red"
      >
        {status === 'pending' ? (
          <div
            className={loader.spinner}
            style={{ '--spinner-color': '#fff', scale: '0.4' } as CSSVars}
          />
        ) : (
          <FaRegTrashAlt color="#fff" size={18} />
        )}
      </TooltipTrigger>

      <TooltipContent>حذف کد تخفیف</TooltipContent>
    </Tooltip>
  );
}

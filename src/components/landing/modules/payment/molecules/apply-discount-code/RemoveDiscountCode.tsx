import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { axiosInstance } from '@/utils/axios';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import { showCMToast } from '@/components/landing/shared/toast';

type Props = {
  trackingCode: string | null;
  handleInvalidateQuery: () => void;
};

// ------------------------------

export function RemoveDiscountCode(props: Props) {
  const { trackingCode, handleInvalidateQuery } = props;

  const { mutate } = useMutation({
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
        className="w-10 bg-cs-red/90 flex-center rounded-lg transition-colors hover:bg-cs-red"
      >
        <FaRegTrashAlt color="#fff" size={18} />
      </TooltipTrigger>

      <TooltipContent>حذف کد تخفیف</TooltipContent>
    </Tooltip>
  );
}

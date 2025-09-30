import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { IoClose } from 'react-icons/io5';
import { axiosInstance } from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

type Props = {
  discountCode?: string;
  trackingCode: string | null;
};

// ------------------------------

export function RemoveDiscountCode(props: Props) {
  const { discountCode, trackingCode } = props;

  const { mutate } = useMutation({
    mutationFn: () => {
      return axiosInstance.post(`/auth/${trackingCode}`, {
        discount_code: discountCode,
      });
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <>
      {discountCode && (
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm opacity-0 flex-center group transition-all duration-200 ease-in-out hover:opacity-100">
          <Tooltip>
            <TooltipTrigger
              type="button"
              onClick={() => mutate()}
              className="full-size flex-center"
            >
              <IoClose size={24} color="#444" />
            </TooltipTrigger>

            <TooltipContent>حذف کد تخفیف</TooltipContent>
          </Tooltip>
        </div>
      )}
    </>
  );
}

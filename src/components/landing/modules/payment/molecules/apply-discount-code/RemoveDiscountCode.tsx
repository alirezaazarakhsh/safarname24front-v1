import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { axiosInstance } from '@/utils/axios';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';

type Props = {
  discountCode?: string;
  trackingCode: string | null;
};

// ------------------------------

export function RemoveDiscountCode(props: Props) {
  const { trackingCode } = props;

  const { mutate } = useMutation({
    mutationFn: () => {
      return axiosInstance.post(`/auth/${trackingCode}`);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <Tooltip>
      <TooltipTrigger
        type="button"
        onClick={() => mutate()}
        className="w-10 bg-cs-red/90 flex-center rounded-lg transition-colors hover:bg-cs-red"
      >
        <FaRegTrashAlt color="#fff" size={19} />
      </TooltipTrigger>

      <TooltipContent>حذف کد تخفیف</TooltipContent>
    </Tooltip>
  );
}

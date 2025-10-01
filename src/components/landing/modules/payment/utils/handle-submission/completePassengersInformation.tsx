import { axiosInstance } from '@/utils/axios';
import { FormSchema } from '../../helpers/type';

import { payment } from '../../helpers/constant';
import { showCMToast } from '@/components/landing/shared/toast';

// ------------------------------

export async function handleSubmit(
  data: FormSchema,
  trackingCode: string | null,
  handleNavigation: () => void,
  handleToggleLoading: () => void,
) {
  try {
    handleToggleLoading();
    await axiosInstance.put(`/hotel/reservation/form/${trackingCode}/`, data);
    await axiosInstance.put(`/hotel/reservation/description/${trackingCode}/`, {
      description: sessionStorage.getItem(payment.descriptionKey),
    });

    handleNavigation();
    showCMToast({
      type: 'success',
      title: 'عملیات با موفقیت انجام شد',
      description: 'کاربر گرامی اطلاعات با موفقیت بروزرسانی شد',
    });
  } catch (error) {
    // console.error(error);

    showCMToast({
      type: 'error',
      title: 'عملیات با خطا مواجه شد !',
      description: 'کاربر گرامی در بروزرسانی اطلاعات مشکلی بوجود آمد',
    });
  } finally {
    handleToggleLoading();
  }
}

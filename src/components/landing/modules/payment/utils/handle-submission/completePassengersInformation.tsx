import { toast } from 'sonner';
import { axiosInstance } from '@/utils/axios';

import { FormSchema } from '../../helpers/type';
import { payment } from '../../helpers/constant';
import { CustomSoonerToast } from '@/components/landing/shared/toast';

// ------------------------------

export async function handleSubmit(
  data: FormSchema,
  trackingCode: string | null,
  handleToggleLoading: () => void,
) {
  try {
    handleToggleLoading();
    await axiosInstance.put(`/hotel/reservation/form/${trackingCode}/`, data);
    await axiosInstance.put(`/hotel/reservation/description/${trackingCode}/`, {
      description: sessionStorage.getItem(payment.descriptionKey),
    });

    toast.custom(
      (id) => (
        <CustomSoonerToast
          id={id}
          type="success"
          title="عملیات با موفقیت انجام شد"
          subtitle="کاربر گرامی اطلاعات با موفقیت بروزرسانی شد"
        />
      ),
      { duration: 5000 },
    );
  } catch (error) {
    console.error(error);
    toast.custom(
      (id) => (
        <CustomSoonerToast
          id={id}
          type="error"
          title="عملیات با خطا مواجه شد !"
          subtitle="کاربر گرامی در بروزرسانی اطلاعات مشکلی بوجود آمد"
        />
      ),
      { duration: 5000 },
    );
  } finally {
    handleToggleLoading();
  }
}

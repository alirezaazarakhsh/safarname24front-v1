import { axiosInstance } from '@/utils/axios';
import { FormSchema } from '../../helpers/type';

import { payment } from '../../helpers/constant';
import { showCMToast } from '@/components/landing/shared/toast';

// بررسی وضعیت لاگین بودن مسافر
function isUserLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;

  const hasLocal = Boolean(
    localStorage.getItem('access_token') ||
      localStorage.getItem('token') ||
      localStorage.getItem('access')
  );

  const hasCookie = Boolean(
    document.cookie.includes('auth=') ||
      document.cookie.includes('AUTH=') ||
      document.cookie.includes('access_token=') ||
      document.cookie.includes('token=')
  );

  return hasLocal || hasCookie;
}

// ------------------------------

export async function handleSubmit(
  data: FormSchema,
  trackingCode: string | null,
  handleNavigation: () => void,
  handleToggleLoading: () => void,
  handleInvalidateQuery: () => void,
) {
  // ۱. اگر کاربر لاگین نبود، فرم ذخیره شده و درخواست لاگین می‌دهد
  if (!isUserLoggedIn()) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('pending_passenger_form', JSON.stringify(data));
      // ارسال ایونت برای باز شدن مدال لاگین
      window.dispatchEvent(new Event('open-auth-modal'));
    }

    showCMToast({
      type: 'error',
      title: 'ورود به حساب کاربری',
      description: 'جهت تایید و ادامه فرآیند، لطفاً ابتدا وارد حساب کاربری خود شوید.',
    });
    return;
  }

  // ۲. در صورت لاگین بودن، اطلاعات ثبت می‌شود
  try {
    handleToggleLoading();
    await axiosInstance.put(`/hotel/reservation/form/${trackingCode}/`, data);

    const description =
      typeof window !== 'undefined'
        ? sessionStorage.getItem(payment.descriptionKey)
        : null;

    if (description) {
      await axiosInstance.put(`/hotel/reservation/description/${trackingCode}/`, {
        description,
      });
    }

    handleInvalidateQuery();
    handleNavigation();
    showCMToast({
      type: 'success',
      title: 'عملیات با موفقیت انجام شد',
      description: 'کاربر گرامی اطلاعات با موفقیت بروزرسانی شد',
    });
  } catch (error) {
    showCMToast({
      type: 'error',
      title: 'عملیات با خطا مواجه شد !',
      description: 'کاربر گرامی در بروزرسانی اطلاعات مشکلی بوجود آمد',
    });
  } finally {
    handleToggleLoading();
  }
}
import Cookies from 'js-cookie';
import useLocalStorage from '@/hooks/useLocalStorage';

import useApiMutation from '@/hooks/dashboard/useApiMutation';
import toast from '@/components/dashboard/ui/customSonner/toast';

// --------------------------------------------

export default function LogoutButton() {
  const authLocalStorage = useLocalStorage({
    value: 'AUTH_VALUE',
  });

  const authObj: {
    acessUID: string;
    otp: string;
    phoneNumber: string;
    refreshUID: string;
  } = authLocalStorage.data
    ? JSON.parse(authLocalStorage.data)
    : {
        acessUID: '',
        otp: '',
        phoneNumber: '',
        refreshUID: '',
      };

  const mutation = useApiMutation({
    url: '/auth/logout/',
    method: 'post',
    options: {
      onError: () => {
        toast({
          title: 'خطا در دریافت اطلاعات',
          description:
            'در دریافت داده‌ها مشکلی به‌وجود آمده است. لطفاً اتصال اینترنت خود را بررسی کرده و دوباره تلاش کنید.',
          theme: 'theme',
        });
      },
      onSuccess: () => {
        Cookies.remove('AUTH');
        Cookies.remove('UPN');
        authLocalStorage.removeItem();

        window.location.reload();
      },
    },
  });

  return (
    <button
      className={
        'text-zinc-600 text-[0.75rem] font-semibold px-4 py-3 flex items-center justify-start gap-2 rounded-md transition-colors ease-in-out hover:bg-zinc-100/60'
      }
      disabled={mutation.isPending}
      onClick={() => {
        mutation.mutate({
          refresh_token: authObj.refreshUID,
        });
      }}
    >
      خروج از حساب کاربری
    </button>
  );
}

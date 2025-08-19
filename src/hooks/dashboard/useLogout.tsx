// Importing part
import Cookies from 'js-cookie';
import useApiMutation from './useApiMutation';
import toast from '@/components/dashboard/ui/customSonner/toast';
import useLocalStorageState from 'use-local-storage-state';

// Creating and exporting useLogout custom hook as default
export default function useLogout() {
  const [openedItems, setOpenedItems, { removeItem }] = useLocalStorageState<
    number[]
  >('openedNotifications');

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
      onSuccess: async () => {
        Cookies.remove('AUTH');
        Cookies.remove('UPN');
        Cookies.remove('auth');
        removeItem();

        window.location.href = '/';
      },
    },
  });

  function mutate() {
    const authObj = JSON.parse(Cookies.get('auth') || '{}');
    mutation.mutate({
      refresh_token: authObj.refreshUID,
    });
  }

  return {
    mutate,
    loading: mutation.isPending,
  };
}

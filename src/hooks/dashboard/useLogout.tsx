'use client';

import Cookies from 'js-cookie';
import useApiMutation from './useApiMutation';
import toast from '@/components/dashboard/ui/customSonner/toast';
import useLocalStorageState from 'use-local-storage-state';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function useLogout() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Local storage states
  const openedNotifications = useLocalStorageState<number[]>(
    'openedNotifications',
  );
  const ticketWalpaper = useLocalStorageState<string>('ticketWalpaper');
  const ticketTheme = useLocalStorageState<string>('ticketTheme');
  const ticketNotifications = useLocalStorageState<boolean>(
    'ticketNotifications',
  );
  const profileState = useLocalStorageState<'personal' | 'legal'>(
    'profilePageActiveTab',
  );

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

        if (pathname === '/') {
          window.location.reload();
        } else {
          router.push('/');
        }
      },
      onSuccess: () => {
        startTransition(() => {
          if (pathname === '/') {
            window.location.reload();
          } else {
            router.push('/');
          }

          setTimeout(() => {
            ['AUTH', 'UPN', 'auth'].forEach((key) => Cookies.remove(key));
            [
              profileState,
              ticketWalpaper,
              openedNotifications,
              ticketTheme,
              ticketNotifications,
            ].forEach((state) => state?.[2]?.removeItem?.());
          }, 50);
        });
      },
    },
  });

  function mutate() {
    let authObj: any = {};
    try {
      const cookie = Cookies.get('auth');
      authObj = cookie ? JSON.parse(cookie) : {};
    } catch {
      authObj = {};
    }

    mutation.mutate({
      refresh_token: authObj.refreshUID,
    });
  }

  return {
    mutate,
    loading: mutation.isPending || isPending,
  };
}

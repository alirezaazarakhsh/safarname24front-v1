'use client';

import { AxiosError } from 'axios';
import { LogOut } from 'lucide-react';

import { authInternalApi } from '@/lib/axios';
import { toast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';

import { useMutation, useQueryClient } from '@tanstack/react-query';

// ---------------------------------

export default function LogoutButton() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      await authInternalApi.post('/auth/logout/');
    },
    onSuccess: () => {
      // User is no longer authenticated
      queryClient.setQueryData(['auth', 'me'], null);

      // Optional: remove cached user-specific queries
      queryClient.removeQueries({
        predicate: (query) => {
          const key = query.queryKey;

          return (
            Array.isArray(key) &&
            typeof key[0] === 'string' &&
            [
              'auth',
              'profile',
              'orders',
              'favorites',
              'notifications',
            ].includes(key[0])
          );
        },
      });

      toast.add({
        type: 'success',
        title: 'با موفقیت از حساب خود خارج شدید',
      });
    },

    onError: (error: AxiosError<any>) => {
      console.error(error);

      toast.add({
        type: 'error',
        title: 'خروج از حساب انجام نشد',
        description: error.response?.data?.message || 'خطای ناشناخته',
      });
    },
  });

  return (
    <Button
      variant="destructive"
      className="h-12 w-full justify-start max-sm:gap-2.5 sm:h-9 sm:px-2.5 max-sm:[&_svg]:size-4.5!"
      disabled={mutation.isPending}
      onClick={() => mutation.mutate()}
    >
      <LogOut />
      <span>{mutation.isPending ? 'در حال خروج ...' : 'خروج'}</span>
    </Button>
  );
}

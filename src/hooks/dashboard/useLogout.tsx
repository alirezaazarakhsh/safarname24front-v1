'use client';

import useApiMutation from './useApiMutation';

export default function useLogout() {
  return useApiMutation({
    url: '/auth/logout/',
    method: 'delete',
    options: {
      onSuccess: () => {
        window.location.reload();
      },
      onError: (error) => {
        window.location.reload();
      },
    },
  });
}

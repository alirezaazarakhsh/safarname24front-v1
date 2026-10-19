import { axiosInstance } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

// ------------------------------

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['auth', 'me'],

    queryFn: async () => {
      const { data } = await axiosInstance.get(
        '/natural-profiles/',
      );

      console.log('user-data', data);
      return data.data;
    },

    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

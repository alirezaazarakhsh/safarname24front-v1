import { axiosInstance } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { GETPersonalProfile } from '@/types/dashboard/api/get';

// --------------------------------

export function useCheckAuth() {
  const { data, status } = useQuery<GETPersonalProfile>({
    queryKey: ['natural-profile'],
    queryFn: () =>
      axiosInstance('/natural-profiles/').then((data) => data.data),
  });

  return {
    status: status,
    isAuthenticated: data ? (data.phone_number ? true : false) : false,
  };
}

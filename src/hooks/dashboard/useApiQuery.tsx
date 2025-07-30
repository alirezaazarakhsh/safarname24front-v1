// Importing part
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { axiosInstance } from '@/utils/axios';
import { UseApiQueryProps } from '@/types/dashboard/hook';

// Creating and exporting useApiQuery function which is a mix of axios and react query to fetch given url (the project apis)
export function useApiQuery<T>({
  url,
  queryKey,
  options,
}: UseApiQueryProps<T>): UseQueryResult<T, Error> {
  return useQuery<T, Error, T, string[]>({
    queryKey,
    queryFn: async () => {
      const isFullUrl = /^https?:\/\//i.test(url);
      const client = isFullUrl ? axios : axiosInstance;
      const { data } = await client.get<T>(url);
      return data;
    },
    ...options,
  });
}

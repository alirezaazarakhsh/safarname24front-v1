// Importing part
import { UseApiQueryProps } from '@/types/dashboard/hook';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

// defining axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

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

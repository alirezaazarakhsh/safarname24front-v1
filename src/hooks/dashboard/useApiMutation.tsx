import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { axiosInstance } from '@/utils/axios';

export default function useApiMutation<TData = unknown, TVariables = unknown>({
  url,
  method,
  options,
}: {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  options?: any;
}) {
  return useMutation<TData, any, TVariables>({
    mutationFn: async (variables) => {
      // Fix: Treat any URL starting with /api/ as internal → don't use axiosInstance
      const useInternalRoute = url.startsWith('/api/');
      const client = useInternalRoute
        ? axios.create({ baseURL: '' })
        : axiosInstance;

      const { data } = await client.request<TData>({
        url,
        method: method.toUpperCase(),
        data: variables,
        withCredentials: true,
      });

      return data;
    },
    ...options,
  });
}

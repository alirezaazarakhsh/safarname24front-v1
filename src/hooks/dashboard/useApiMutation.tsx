import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { axiosInstance } from '@/utils/axios';
import { UseApiMutationProps } from '@/types/dashboard/hook';

export default function useApiMutation<
  TData = unknown,
  TVariables = unknown
>({
  url,
  method,
  options,
  isFormData,
}: UseApiMutationProps<TData, TVariables>) {
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (variables) => {
      const isFullUrl = /^https?:\/\//i.test(url);
      const client = isFullUrl ? axios : axiosInstance;

      const { data } = await client.request<TData>({
        url,
        method: method.toUpperCase(),
        data: variables,
        headers: isFormData
          ? { 'Content-Type': 'multipart/form-data' }
          : undefined,
      });

      return data;
    },

    ...options, // 👈 اول spread

    onError: options?.onError,
    onSuccess: options?.onSuccess,
  });
}
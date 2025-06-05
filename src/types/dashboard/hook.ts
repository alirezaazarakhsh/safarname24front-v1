// Importing part
import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

// Creating and exporting type of hooks of dashboard pages
export interface UseLocalStoragePropsType {
  value: string;
}

export interface UseLocalStorageReturnType {
  loading: boolean;
  data: string | null;
  setData: (value: string) => void;
  removeItem: () => void;
}

export interface UseApiQueryProps<T> {
  url: string;
  queryKey: string[];
  options?: Omit<
    UseQueryOptions<T, Error, T, string[]>,
    'queryKey' | 'queryFn'
  >;
}

export interface UseApiMutationProps<TData, TVariables> {
  url: string;
  method: 'post' | 'put' | 'delete' | 'patch';
  options?: UseMutationOptions<TData, Error, TVariables>;
}

import axios from 'axios';

// --------------------------------

export const generalInstance = axios.create({
  baseURL: typeof window !== 'undefined' ? '/api/v1/' : 'https://cps.safarnameh24.com/api/v1/',
});

// --------------------------------

type ServiceHelper<T = any> = {
  type?: 'arr' | 'obj';
  data?: { data: T };
  status: 'error' | 'pending' | 'success';
};

export function isEmptyOrInvalid<T = any>(props: ServiceHelper<T>) {
  const { type = 'arr', data, status } = props;

  if (status === 'pending') return false;
  if (status === 'error') return true;

  if (type === 'arr') {
    return !data?.data || !Array.isArray(data.data) || data.data.length === 0;
  }

  if (type === 'obj') {
    return (
      !data?.data ||
      typeof data.data !== 'object' ||
      Object.keys(data.data).length === 0
    );
  }

  return true;
}

import { axiosInstance } from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

// --------------------------------------------

export default function LogoutButton() {
  const { mutate, status } = useMutation({
    mutationFn: () => {
      return axiosInstance({
        method: 'POST',
        url: '/auth/logout/',
      });
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      // console.log(data);
      window.location.reload();
    },
  });

  return (
    <button
      className={
        'flex items-center justify-start gap-2 px-4 py-3 text-[0.75rem] font-semibold text-zinc-600 transition-colors ease-in-out hover:bg-cs-red/5 hover:text-cs-red'
      }
      disabled={status === 'pending'}
      onClick={() => mutate()}
    >
      خروج از حساب کاربری
    </button>
  );
}

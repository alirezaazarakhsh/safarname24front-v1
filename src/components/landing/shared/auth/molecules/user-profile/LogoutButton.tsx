import Loading from '@/components/dashboard/ui/loading';
import useApiMutation from '@/hooks/dashboard/useApiMutation';
import useLocalStorage from '@/hooks/useLocalStorage';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';

// --------------------------------------------

export default function LogoutButton() {
  const authLocalStorage = useLocalStorage({
    value: 'AUTH_VALUE',
  });

  const authObj: {
    acessUID: string;
    otp: string;
    phoneNumber: string;
    refreshUID: string;
  } = authLocalStorage.data
    ? JSON.parse(authLocalStorage.data)
    : {
        acessUID: '',
        otp: '',
        phoneNumber: '',
        refreshUID: '',
      };

  const mutation = useApiMutation({
    url: '/auth/logout/',
    method: 'post',
    options: {
      onSuccess: () => {
        Cookies.remove('AUTH');
        Cookies.remove('UPN');
        authLocalStorage.removeItem();

        window.location.reload();
      },
    },
  });

  return (
    <button
      className={
        'bg-cs-red/10 px-4 py-3 rounded-md relative text-cs-red flex items-center justify-start gap-2 transition-colors ease-in-out lg:bg-transparent lg:text-zinc-600 lg:text-[0.7rem] lg:rounded-none lg:hover:bg-cs-red/10 lg:hover:text-cs-red'
      }
      disabled={mutation.isPending}
      onClick={() => {
        mutation.mutate({
          refresh_token: authObj.refreshUID,
        });
      }}
    >
      <motion.div
        className='absolute top-[50%] left-[50%] -translate-y-[50%]'
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
        initial={{
          x: 0,
          opacity: 0,
        }}
        exit={{
          x: 0,
          opacity: 0,
        }}
        animate={
          mutation.isPending
            ? {
                x: '-50%',
                opacity: 1,
              }
            : {
                x: 0,
                opacity: 0,
              }
        }
      >
        <Loading className='bg-cs-red' />
      </motion.div>
      <span
        data-hidden={mutation.isPending}
        className='text-[0.8rem] transition-all duration-500 data-[hidden="true"]:opacity-0 data-[hidden="false"]:opacity-100 font-semibold'
      >
        خروج از حساب کاربری
      </span>
    </button>
  );
}

// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useContext } from 'react';
import * as DropDown from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { ICChevronBottom } from '@/components/icons/ICChevronBottom';
import AvatarImage from '../../../../public/image/profile/1.webp';
import { ICWallet } from '@/components/icons/ICWallet';
import Link from 'next/link';
import useLocalStorage from '@/hooks/useLocalStorage';
import useApiMutation from '@/hooks/dashboard/useApiMutation';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import toast from '../ui/customSonner/toast';
import { userFetchedInfoContext } from '../page';
import { GETPersonalProfile } from '@/types/dashboard/api/get';
import useUserInfo from '@/hooks/dashboard/useUserInfo';
import useUserWalletBalance from '@/hooks/dashboard/useUserWalletBalance';
import { numberSeparation } from '@/utils';

// Creating and exporting ProfileDropdown component as defualt
export default function ProfileDropdown(): ReactNode {
  // Defining hooks
  const router = useRouter();
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
      onError: () => {
        toast({
          title: 'خطا در دریافت اطلاعات',
          description:
            'در دریافت داده‌ها مشکلی به‌وجود آمده است. لطفاً اتصال اینترنت خود را بررسی کرده و دوباره تلاش کنید.',
          theme: 'theme',
        });
      },
      onSuccess: () => {
        Cookies.remove('AUTH');
        Cookies.remove('UPN');
        authLocalStorage.removeItem();

        router.push('/');
      },
    },
  });

  // Defining variables
  const user = useUserInfo();
  const walletBalance = useUserWalletBalance();

  // Returning JSX
  return (
    <DropDown.DropdownMenu>
      <DropDown.DropdownMenuTrigger asChild>
        <button className='flex items-center justify-start gap-2 w-[200px] overflow-hidden'>
          <Image
            width={100}
            height={100}
            alt={'عکس پروفایل شما'}
            src={user.image || AvatarImage.src}
            className='aspect-square object-cover w-12 h-12 rounded-lg overflow-hidden shrink-0'
          />
          <div className='w-full overflow-hidden'>
            <div className='mb-1 flex items-center justify-start gap-3 text-black'>
              <span className='font-bold text-cs75 text-current block truncate w-full text-right'>
                {`${user.first_name} ${user.last_name} عزیز!`}
              </span>
              <ICChevronBottom className='w-3 h-3 shrink-0 text-current' />
            </div>
            <span className='font-bold text-cs75 text-gray-500 block truncate text-right'>
              {user.email}
            </span>
          </div>
        </button>
      </DropDown.DropdownMenuTrigger>
      <DropDown.DropdownMenuContent className='w-[200px]' align='start'>
        <DropDown.DropdownMenuLabel className='flex items-center justify-center gap-3 p-3 text-black'>
          <span className='truncate block text-cs08 font-medium text-current'>
            {walletBalance.balance === 0
              ? 'حساب شما صفر میباشد!'
              : `${numberSeparation(walletBalance.balance)} تومان`}
          </span>
          <ICWallet className='w-4 h-4 text-current shrink-0' />
        </DropDown.DropdownMenuLabel>
        <DropDown.DropdownMenuSeparator className='mx-3 mb-3' />
        <DropDown.DropdownMenuItem
          asChild
          className='p-3 bg-white transition-all duration-500 text-gray-600 hover:bg-cs-red/10 hover:text-cs-red block w-full cursor-pointer'
        >
          <Link href='/dashboard/profile'>
            <span className='text-cs08 font-normal text-current text-right truncate block'>
              ویرایش پروفایل
            </span>
          </Link>
        </DropDown.DropdownMenuItem>
        <DropDown.DropdownMenuItem
          asChild
          className='p-3 bg-white transition-all duration-500 text-gray-600 hover:bg-cs-red/10 hover:text-cs-red block w-full cursor-pointer'
        >
          <Link href='/dashboard/financial/wallet'>
            <span className='text-cs08 font-normal text-current text-right truncate block'>
              شارژ کیف پول
            </span>
          </Link>
        </DropDown.DropdownMenuItem>
        <DropDown.DropdownMenuItem
          asChild
          className='p-3 bg-white transition-all duration-500 text-gray-600 hover:bg-cs-red/10 hover:text-cs-red block w-full cursor-pointer'
        >
          <button
            onClick={() => {
              mutation.mutate({
                refresh_token: authObj.refreshUID,
              });
            }}
          >
            <span className='text-cs08 font-normal text-current text-right truncate block'>
              خروج از حساب
            </span>
          </button>
        </DropDown.DropdownMenuItem>
      </DropDown.DropdownMenuContent>
    </DropDown.DropdownMenu>
  );
}

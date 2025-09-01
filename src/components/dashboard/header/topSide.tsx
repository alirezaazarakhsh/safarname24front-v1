// Importing part
import { ReactNode } from 'react';
import ProfileDropdown from './profileDropdown';
import { ICLogOut } from '@/components/icons/ICLogOut';
import { ICArrowFlashRight } from '@/components/icons/ICArrowFlashRight';
import Logo from '../ui/logo';
import { usePathname, useRouter } from 'next/navigation';
import Notification from './notification';
import useLogout from '@/hooks/dashboard/useLogout';

type urlTitleType =
  | {
      type: 'normal';
      href: `/dashboard/${string}` | '/dashboard';
      title: string;
    }
  | {
      type: 'regexp';
      regexp: RegExp;
      title: string;
    };

const urlTitles: urlTitleType[] = [
  {
    type: 'normal',
    href: '/dashboard',
    title: 'داشبورد سفرنامه',
  },
  {
    type: 'normal',
    href: '/dashboard/reservations',
    title: 'لیست رزروهای هتل من',
  },
  {
    type: 'normal',
    href: '/dashboard/reservations',
    title: 'لیست رزرو هتل‌های من',
  },
  {
    type: 'normal',
    href: '/dashboard/financial/wallet',
    title: 'بخش مالی - شارژ کیف پول',
  },
  {
    type: 'normal',
    href: '/dashboard/financial/factors',
    title: 'لیست فاکتورهای واریز و برداشت وجه',
  },
  {
    type: 'normal',
    href: '/dashboard/financial/cart-to-cart',
    title: 'بخش مالی - کارت به کارت',
  },
  {
    type: 'normal',
    href: '/dashboard/financial/take-out',
    title: 'بخش مالی - برداشت وجه',
  },
  {
    type: 'normal',
    href: '/dashboard/customer-club/gifts',
    title: 'باشگاه مشتریان - جوایز مرکز خرید',
  },
  {
    type: 'normal',
    href: '/dashboard/customer-club/list',
    title: 'باشگاه مشتریان - لیست جوایز دریافتی',
  },
  {
    type: 'normal',
    href: '/dashboard/profile',
    title: 'پروفایل کاربری مشتری',
  },
  {
    type: 'normal',
    href: '/dashboard/favorites',
    title: 'بازگشت به صفحه قبلی',
  },
  {
    type: 'regexp',
    regexp: /^\/dashboard\/favorites\/\d+$/,
    title: 'بازگشت به صفحه قبلی',
  },
  {
    type: 'normal',
    href: '/dashboard/passengers',
    title: 'لیست مسافران من',
  },
];

// Creating and exporting TopSide component of header as default
export default function TopSide(): ReactNode {
  // Defining hooks
  const router = useRouter();
  const pathname = usePathname();
  const logOut = useLogout();

  // Using iseMemo
  const matched = urlTitles.find((item) => {
    if (item.type === 'normal') {
      return item.href === pathname;
    } else if (item.type === 'regexp') {
      return item.regexp.test(pathname);
    }
  });

  // Returning JSX
  return (
    <div className="bg-transparent transition-all duration-500 border-b-[1.5px] border-b-black/10">
      <div className="p-5 max-w-screen-template mx-auto lg:flex hidden items-center justify-between">
        <Logo />
        <div className="flex items-center justify-between gap-4">
          <button
            className="aspect-square w-12 h-12 bg-cs-red/5 transition-all duration-500 hover:bg-cs-red/10 text-cs-red rounded-lg flex items-center justify-center disabled:opacity-50"
            disabled={logOut.loading}
            onClick={logOut.mutate}
          >
            <ICLogOut className="w-5 h-5 text-current" />
          </button>
          <Notification />
          <ProfileDropdown />
        </div>
      </div>
      <div className="lg:hidden block py-[16px] px-[24px]">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-start gap-[10px] w-full overflow-hidden"
        >
          <ICArrowFlashRight className="w-[24px] h-[24px] aspect-square shrink-0" />
          <span className="block truncate text-black text-[14px] font-bold w-full text-right">
            {matched?.title || 'بازگشت به صفحه'}
          </span>
        </button>
      </div>
    </div>
  );
}

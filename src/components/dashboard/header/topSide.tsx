// Importing part
import { ReactNode } from 'react';
import ProfileDropdown from './profileDropdown';
import { ICLogOut } from '@/components/icons/ICLogOut';
import { ICArrowFlashRight } from '@/components/icons/ICArrowFlashRight';
import Logo from '../ui/logo';
import { useRouter } from 'next/navigation';
import Notification from './notification';
import { NotificationType } from '@/types/dashboard/component';

// Defining fake notification items
const notifications: NotificationType[] = [
  {
    id: 1,
    title: 'تکمیل پروفایل شما',
    createdAt: '2025-05-01T08:30:00Z',
    content: 'لطفاً پروفایل خود را برای استفاده بهتر از امکانات تکمیل کنید.',
    status: 'unseen',
  },
  {
    id: 2,
    title: 'امتیاز جدید در باشگاه مشتریان',
    createdAt: '2025-04-30T14:15:00Z',
    content:
      'شما ۲۰ امتیاز جدید کسب کرده‌اید. برای مشاهده جزئیات به باشگاه مشتریان بروید.',
    status: 'seen',
  },
  {
    id: 3,
    title: 'تخفیف ویژه نوروزی',
    createdAt: '2025-03-20T12:00:00Z',
    content: 'از تخفیف ۳۰٪ نوروزی ما استفاده کنید. فقط تا پایان تعطیلات!',
    status: 'important',
  },
  {
    id: 4,
    title: 'سفر شما تایید شد',
    createdAt: '2025-05-02T09:45:00Z',
    content: 'سفر شما به مشهد تایید شد. اطلاعات بیشتر را در پروفایل ببینید.',
    status: 'unseen',
  },
  {
    id: 5,
    title: 'پیام جدید از پشتیبانی',
    createdAt: '2025-05-03T11:20:00Z',
    content: 'پشتیبانی به درخواست شما پاسخ داده است. لطفاً بررسی کنید.',
    status: 'seen',
  },
  {
    id: 6,
    title: 'به روزرسانی قوانین استفاده',
    createdAt: '2025-04-28T10:00:00Z',
    content: 'قوانین استفاده از پلتفرم به‌روزرسانی شد. لطفاً مطالعه فرمایید.',
    status: 'important',
  },
  {
    id: 7,
    title: 'پیشنهاد ویژه فقط برای شما',
    createdAt: '2025-05-04T13:00:00Z',
    content: 'پیشنهاد خاصی برای شما داریم. از آن بهره ببرید!',
    status: 'unseen',
  },
  {
    id: 8,
    title: 'نظر خود را ثبت کنید',
    createdAt: '2025-05-01T16:30:00Z',
    content: 'نظر شما برای ما مهم است. لطفاً درباره سفر اخیرتان نظر دهید.',
    status: 'seen',
  },
  {
    id: 9,
    title: 'خطای پرداخت اصلاح شد',
    createdAt: '2025-04-25T08:50:00Z',
    content: 'مشکل پرداخت شما با موفقیت برطرف شد.',
    status: 'seen',
  },
  {
    id: 10,
    title: 'در قرعه‌کشی شرکت کردید',
    createdAt: '2025-05-05T07:30:00Z',
    content: 'شما در قرعه‌کشی این ماه شرکت داده شدید. موفق باشید!',
    status: 'important',
  },
];

// Creating and exporting TopSide component of header as default
export default function TopSide(): ReactNode {
  // Defining hooks
  const router = useRouter();

  // Returning JSX
  return (
    <div className="bg-transparent transition-all duration-500 border-b-[1.5px] border-b-black/10">
      <div className="p-5 max-w-screen-template mx-auto lg:flex hidden items-center justify-between">
        <Logo />
        <div className="flex items-center justify-between gap-4">
          <button className="aspect-square w-12 h-12 bg-cs-red/10 transition-all duration-500 hover:bg-cs-red/20 text-cs-red rounded-lg flex items-center justify-center">
            <ICLogOut className="w-5 h-5 text-current" />
          </button>
          <Notification notifications={notifications} />
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
            داشبورد سفرنامه
          </span>
        </button>
      </div>
    </div>
  );
}

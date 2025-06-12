import { IconsName } from '@/types';

// ------------------------------

export const payment = {
  NUMBER_OF_STEPS: 4,
  stepper: [
    {
      icon: 'Profile2User' as IconsName,
      step: 'اول',
      title: 'تکمیل مشخصات مسافران',
    },
    { icon: 'Buildings' as IconsName, step: 'دوم', title: 'بررسی ظرفیت اتاق' },
    { icon: 'EmptyWallet' as IconsName, step: 'سوم', title: 'پرداخت وجه' },
    { icon: 'Receipt21' as IconsName, step: 'چهارم', title: 'صدور واچر' },
  ],
};

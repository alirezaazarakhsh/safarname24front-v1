import { IconsName } from '@/types';

// ------------------------------

export const payment = {
  NUMBER_OF_STEPS: 4,
  reservationId: 'tracking-code',
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
  person: {
    first_name: '',
    last_name: '',
    phone_number: '',
    national_code: '',
  },
  passengersNoteBook: [
    {
      first_name: 'متین',
      last_name: 'هدایت',
      phone_number: '09399862846',
      national_code: '0023273291',
    },
    {
      first_name: 'ساشا',
      last_name: 'آذرخش',
      phone_number: '09155525185',
      national_code: '1373751208',
    },
    {
      first_name: 'پرهام',
      last_name: 'رحیمی',
      phone_number: '09135131340',
      national_code: '4569852364',
    },
  ],
  rooms: [
    {
      id: 5,
      name: 'یک تخته (اقامت 7 ساعته)',
      capacity: 2,
      extra_capacity: 2,
      discount_on_purchase: 2_000_000,
      extra_capacity_price: 1_500_000,
      half_charges: {
        enter: { enabled: false, price: 2_000_000 },
        exit: { enabled: false, price: 3_000_000 },
      },
      passengers: {
        main_passenger: {
          first_name: '',
          last_name: '',
          phone_number: '',
          national_code: '',
        },
        other_passengers: [
          {
            first_name: '',
            last_name: '',
            national_code: '',
          },
        ],
        extra_capacity_passengers: [],
      },
    },
    {
      id: 5,
      name: 'یک تخته (اقامت 7 ساعته)',
      capacity: 3,
      extra_capacity: 2,
      discount_on_purchase: 2_000_000,
      extra_capacity_price: 1_500_000,
      half_charges: {
        enter: { enabled: false, price: 2_000_000 },
        exit: { enabled: false, price: 3_000_000 },
      },
      passengers: {
        main_passenger: {
          first_name: '',
          last_name: '',
          phone_number: '',
          national_code: '',
        },
        other_passengers: [
          {
            first_name: '',
            last_name: '',
            national_code: '',
          },
          {
            first_name: '',
            last_name: '',
            national_code: '',
          },
        ],
        extra_capacity_passengers: [],
      },
    },
  ],
};

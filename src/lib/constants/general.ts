import { TopCities } from '../types/general';

import telegram from '@/assets/images/social-media/telegram.svg';
import whatsapp from '@/assets/images/social-media/whatsapp.svg';
import linkedin from '@/assets/images/social-media/linkedin.svg';
import instagram from '@/assets/images/social-media/instagram.svg';

import { Mail, MapPin, PhoneCall } from 'lucide-react';
import { Sun, Home, Moon, Globe2, Server, Laptop } from 'lucide-react';

// ------------------------------

const THEME_OPTIONS = [
  { value: 'light', label: 'روشن', icon: Sun },
  { value: 'dark', label: 'تاریک', icon: Moon },
  { value: 'system', label: 'سیستم', icon: Laptop },
] as const;

const TOP_CITIES: TopCities[] = [
  {
    id: 'mashhad',
    city: 'مشهد',
    province: 'خراسان رضوی',
    accommodations_count: 142,
    image: '',
  },
  {
    id: 'bushehr',
    city: 'بوشهر',
    province: 'بوشهر',
    accommodations_count: 38,
    image: '',
  },
  {
    id: 'tehran',
    city: 'تهران',
    province: 'تهران',
    accommodations_count: 215,
    image: '',
  },
  {
    id: 'shiraz',
    city: 'شیراز',
    province: 'فارس',
    accommodations_count: 96,
    image: '',
  },
  {
    id: 'rasht',
    city: 'رشت',
    province: 'گیلان',
    accommodations_count: 74,
    image: '',
  },
  {
    id: 'qeshm',
    city: 'قشم',
    province: 'هرمزگان',
    accommodations_count: 52,
    image: '',
  },
  {
    id: 'isfahan',
    city: 'اصفهان',
    province: 'اصفهان',
    accommodations_count: 110,
    image: '',
  },
  {
    id: 'kish',
    city: 'کیش',
    province: 'هرمزگان',
    accommodations_count: 88,
    image: '',
  },
];

const SOCIAL_MEDIA = [
  {
    label: {
      en: 'telegram',
      fa: 'تلگرام',
    },
    image: {
      src: telegram,
      alt: '',
    },
    href: '#',
    icon: undefined,
    type: 'telegram',
  },
  {
    label: {
      en: 'instagram',
      fa: 'اینستاگرام',
    },
    image: {
      src: instagram,
      alt: '',
    },
    href: 'https://www.instagram.com/sevinhostir/',
    type: 'instagram',
    icon: undefined,
  },
  {
    label: {
      en: 'whatsapp',
      fa: 'واتساپ',
    },
    image: {
      src: whatsapp,
      alt: '',
    },
    href: '#',
    type: 'whatsapp',
    icon: undefined,
  },
  {
    label: {
      en: 'linkedin',
      fa: 'لینکدین',
    },
    image: {
      src: linkedin,
      alt: '',
    },
    href: '#',
    type: 'linkedin',
    icon: undefined,
  },
];

const CONTACT = [
  {
    icon: PhoneCall,
    image: undefined,
    type: 'phone-number',
    value: '021-91301614',
    label: 'شماره تماس شرکت',
    actionLabel: 'تماس با ما',
    href: 'tel:02191301614',
  },
  {
    icon: PhoneCall,
    image: undefined,
    type: 'phone-number',
    value: '09120759419',
    label: 'شماره تماس همراه',
    actionLabel: 'تماس با ما',
    href: 'tel:09120759419',
  },
  {
    icon: Mail,
    image: undefined,
    type: 'email',
    label: 'ایمیل',
    value: 'info@my.sevinhost.ir',
    actionLabel: 'ارسال ایمیل',
    href: 'mailto:info@my.sevinhost.ir',
  },
  {
    icon: MapPin,
    image: undefined,
    type: 'address',
    label: 'دفتر مرکزی',
    value:
      'تهران - جنت آباد مرکزی شاهین شمالی بیست متری گلستان شرقی کوچه معینی نبش رحیم بزی پلاک ۲۰ واحد ۲۰',
    actionLabel: undefined,
    href: undefined,
  },
];

// ------------------------------

export { THEME_OPTIONS, TOP_CITIES, CONTACT, SOCIAL_MEDIA };

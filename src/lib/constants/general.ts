import { Sun, Moon, Laptop } from 'lucide-react';
import { TopCities } from '../types/general';

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

// ------------------------------

export { THEME_OPTIONS, TOP_CITIES };

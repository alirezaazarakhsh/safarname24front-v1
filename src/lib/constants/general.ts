import { Sun, Moon, Laptop } from 'lucide-react';

// ------------------------------

const themeOptions = [
  { value: 'light', label: 'روشن', icon: Sun },
  { value: 'dark', label: 'تاریک', icon: Moon },
  { value: 'system', label: 'سیستم', icon: Laptop },
] as const;

// ------------------------------

export { themeOptions };

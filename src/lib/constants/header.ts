import { routes } from '@/config/routes';

import { UsersRound, Hotel, Newspaper, Phone } from 'lucide-react';

// ------------------------------

export const content = {
  navbar: [
    {
      id: 'hosting',
      icon: Hotel,
      label: 'رزرو هتل',
      href: routes.hosting,
    },
    {
      id: 'magazine',
      icon: Newspaper,
      label: 'مجله گردشگری',
      href: routes.server,
    },
    {
      id: 'about-us',
      icon: UsersRound,
      label: 'درباره ما',
      href: routes.about_us,
    },
    {
      id: 'contact-us',
      icon: Phone,
      label: 'تماس با ما',
      href: routes.contact_us,
    },
  ],
};

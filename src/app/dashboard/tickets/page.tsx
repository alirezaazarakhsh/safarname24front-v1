// Forcing next.js to render this component as client side component
'use client';

// Importing part
import TicketsContext from '@/components/dashboard/ticket/ticketsContext';
import { ReactNode } from 'react';
import Avatar from '../../../../public/image/avatar/1.jpg';
import { TicketsContextPropsType } from '@/types/dashboard/component';

// Defining fake data to render
const tickets: TicketsContextPropsType['tickets'] = [
  {
    id: 2,
    user: {
      img: Avatar.src,
      name: 'محمد علی کلی',
      status: 'صحبتی ایجاد نشده',
      lastSeen: new Date().toISOString(),
      role: 'مدیر',
    },
    messages: [
      {
        createdAt: new Date().toISOString(),
        from: 'user',
        message: 'سلام جناب وقتتون بخیر .',
        type: 'text',
        answererName: 'محمد علی کلی',
      },
      {
        createdAt: new Date().toISOString(),
        from: 'answerer',
        message: 'سلام روز شما هم بخیر, جانم .',
        type: 'text',
        replyMessage: 'سلام جناب وقتتون بخیر .',
        answererName: 'محمد علی کلی',
      },
      {
        createdAt: new Date().toISOString(),
        from: 'user',
        type: 'voice',
        message: '/randomMusic.mp3',
        replyMessage: 'سلام روز شما هم بخیر, جانم .',
        answererName: 'محمد علی کلی',
      },
      {
        createdAt: new Date().toISOString(),
        from: 'user',
        type: 'file',
        message: Avatar.src,
        replyMessage: 'سلام روز شما هم بخیر, جانم .',
        answererName: 'محمد علی کلی',
      },
    ],
    files: {
      documents: [],
      images: [Avatar.src, Avatar.src, Avatar.src],
      videos: [],
      voices: ['/randomMusic.mp3', '/randomMusic.mp3', '/randomMusic.mp3'],
    },
  },
];

// Creating and exporting tickets page as default
export default function TicketsPage(): ReactNode {
  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-[24px] pb-[50px]">
      <TicketsContext tickets={tickets} />
    </main>
  );
}

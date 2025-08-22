// Forcing next.js to render this component as client side component
'use client';

// Importing part
import TicketsContext from '@/components/dashboard/ticket/ticketsContext';
import { ReactNode } from 'react';
import Avatar from '../../../../public/image/avatar/1.jpg';
import { TicketsContextPropsType } from '@/types/dashboard/component';

const tickets: TicketsContextPropsType['tickets'] = {
  currentTickets: [
    {
      id: 1,
      status: 'open',
      user: {
        img: Avatar.src,
        name: 'رضا احمدی',
        status: 'منتظر پاسخ',
        lastSeen: new Date().toISOString(),
        role: 'کاربر',
      },
      messages: [
        {
          createdAt: new Date().toISOString(),
          from: 'user',
          message: 'سلام، من مشکلی در ورود دارم.',
          type: 'text',
          answererName: 'رضا احمدی',
        },
        {
          createdAt: new Date().toISOString(),
          from: 'answerer',
          message: 'سلام رضا جان، دقیقا چه خطایی دریافت می‌کنید؟',
          type: 'text',
          answererName: 'پشتیبانی',
        },
      ],
      files: {
        documents: [],
        images: [],
        videos: [],
        voices: [],
      },
    },
    {
      id: 2,
      status: 'open',
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
          message:
            'https://ia801900.us.archive.org/19/items/randommusic2016_201610/01%20Rude.mp3',
          replyMessage: 'سلام روز شما هم بخیر, جانم .',
          answererName: 'محمد علی کلی',
        },
      ],
      files: {
        documents: ['/ticketFakeFiles/randomPDF.pdf'],
        images: ['/ticketFakeFiles/randomImage.jpg'],
        videos: ['/ticketFakeFiles/randomVideo.mp4'],
        voices: [
          'https://ia801900.us.archive.org/19/items/randommusic2016_201610/01%20Rude.mp3',
        ],
      },
    },
  ],
  previousTickets: [
    {
      date: '2025-07-10',
      tickets: [
        {
          status: 'closed',
          id: 101,
          user: {
            img: Avatar.src,
            name: 'سارا محمدی',
            status: 'بسته شده',
            lastSeen: new Date().toISOString(),
            role: 'کاربر',
          },
          messages: [
            {
              createdAt: new Date().toISOString(),
              from: 'user',
              message: 'لطفا صورتحساب ماه پیش منو ارسال کنید.',
              type: 'text',
              answererName: 'سارا محمدی',
            },
            {
              createdAt: new Date().toISOString(),
              from: 'answerer',
              message: 'حتما، فایل PDF برای شما ارسال شد.',
              type: 'text',
              answererName: 'پشتیبانی',
            },
            {
              createdAt: new Date().toISOString(),
              from: 'answerer',
              type: 'file',
              message: '/ticketFakeFiles/invoice.pdf',
              answererName: 'پشتیبانی',
            },
          ],
          files: {
            documents: ['/ticketFakeFiles/invoice.pdf'],
            images: [],
            videos: [],
            voices: [],
          },
        },
        {
          status: 'closed',
          id: 105,
          report: 'best',
          user: {
            img: Avatar.src,
            name: 'سارا محمدی',
            status: 'بسته شده',
            lastSeen: new Date().toISOString(),
            role: 'کاربر',
          },
          messages: [
            {
              createdAt: new Date().toISOString(),
              from: 'user',
              message: 'لطفا صورتحساب ماه پیش منو ارسال کنید.',
              type: 'text',
              answererName: 'سارا محمدی',
            },
            {
              createdAt: new Date().toISOString(),
              from: 'answerer',
              message: 'حتما، فایل PDF برای شما ارسال شد.',
              type: 'text',
              answererName: 'پشتیبانی',
            },
            {
              createdAt: new Date().toISOString(),
              from: 'answerer',
              type: 'file',
              message: '/ticketFakeFiles/invoice.pdf',
              answererName: 'پشتیبانی',
            },
          ],
          files: {
            documents: ['/ticketFakeFiles/invoice.pdf'],
            images: [],
            videos: [],
            voices: [],
          },
        },
      ],
    },
    {
      date: '2025-08-01',
      tickets: [
        {
          id: 202,
          status: 'closed',
          user: {
            img: Avatar.src,
            name: 'حسین مرادی',
            status: 'بسته شده',
            lastSeen: new Date().toISOString(),
            role: 'کاربر',
          },
          messages: [
            {
              createdAt: new Date().toISOString(),
              from: 'user',
              message: 'ویدئو تبلیغاتی من آپلود نمی‌شود.',
              type: 'text',
              answererName: 'حسین مرادی',
            },
            {
              createdAt: new Date().toISOString(),
              from: 'answerer',
              message: 'بررسی شد، لطفا حجم فایل را کمتر از 50MB کنید.',
              type: 'text',
              answererName: 'پشتیبانی',
            },
          ],
          files: {
            documents: [],
            images: [],
            videos: [],
            voices: [],
          },
        },
      ],
    },
  ],
};

// Creating and exporting tickets page as default
export default function TicketsPage(): ReactNode {
  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-0 pb-0">
      <TicketsContext tickets={tickets} />
    </main>
  );
}

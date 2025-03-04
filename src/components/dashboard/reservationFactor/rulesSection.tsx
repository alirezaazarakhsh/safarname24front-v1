// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SignitureImage from '../../../../public/image/signatures1.png';
import { QRCodeCanvas } from 'qrcode.react';
import toast from '../ui/customSonner/toast';

// Creating and exporting RulesSection Component as default
export default function RulesSection(): ReactNode {
  // Defining url to copy and to genrate qr code with
  const qrCodeUrl = window.location.href;

  // Returning JSX
  return (
    <section className="flex gap-10 lg:justify-between lg:items-end lg:flex-row flex-col">
      <div>
        <div className="flex items-center justify-start gap-2 overflow-hidden">
          <IconsaxIcons
            name="Judge"
            color="currentColor"
            className="w-4 h-4 text-black shrink-0 aspect-square"
          />
          <span className="block w-full truncate text-right text-cs08 font-bold">
            قوانین و مقرارت هتل و رزرواسیون
          </span>
        </div>
        <ol className="gap-3 mt-5 list-decimal list-inside flex flex-col overflow-hidden">
          <li className="text-cs75 font-medium tet-gray-500 truncate">
            لورم اپیسوم متن ساختگی با تولید سادگی نامفهوم از صعنت چاپ به دیزاینر
            ها کمک میکند.
          </li>
          <li className="text-cs75 font-medium tet-gray-500 truncate">
            لورم اپیسوم متن ساختگی با تولید سادگی نامفهوم از صعنت چاپ به دیزاینر
            ها کمک میکند.
          </li>
          <li className="text-cs75 font-medium tet-gray-500 truncate">
            لورم اپیسوم متن ساختگی با تولید سادگی نامفهوم از صعنت چاپ به دیزاینر
            ها کمک میکند.
          </li>
          <li className="text-cs75 font-medium tet-gray-500 truncate">
            لورم اپیسوم متن ساختگی با تولید سادگی نامفهوم از صعنت چاپ به دیزاینر
            ها کمک میکند.
          </li>
          <li className="text-cs75 font-medium tet-gray-500 truncate">
            لورم اپیسوم متن ساختگی با تولید سادگی نامفهوم از صعنت چاپ به دیزاینر
            ها کمک میکند.
          </li>
        </ol>
      </div>
      <div className="flex items-center lg:justify-end lg:gap-6 gap-3">
        <Link
          href="tel:02122490842"
          className="bg-gray-100 transition-all duration-500 hover:bg-gray-200 border rounded-lg border-black/10 aspect-square lg:h-40 h-auto lg:w-auto w-full flex items-center justify-center p-4"
        >
          <div>
            <Image
              width={200}
              height={200}
              alt="واحد رزرواسیون و پشتیبانی"
              src={SignitureImage.src}
              className="w-[75%] h-auto block mx-auto mb-2"
            />
            <span className="font-medium text-cs75 block text-center truncate w-full text-black mb-1">
              واحد رزرواسیون و پشتیبانی
            </span>
            <span className="font-medium text-cs75 block text-center truncate w-full text-black">
              021-22490842
            </span>
          </div>
        </Link>
        <button
          className="bg-gray-100 transition-all duration-500 hover:bg-gray-200 border rounded-lg border-black/10 aspect-square lg:h-40 h-auto lg:w-auto w-full flex items-center justify-center p-4"
          onClick={() => {
            navigator.clipboard.writeText(qrCodeUrl);

            toast({
              description: 'کپی شد !',
              title: 'لینک qr code کپی شد !',
            });
          }}
        >
          <QRCodeCanvas
            value={qrCodeUrl}
            size={125}
            className="w-full h-auto block mx-auto"
          />
        </button>
      </div>
    </section>
  );
}

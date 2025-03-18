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
import { handleZeroBeforeNumber } from '@/utils/string';

// Defining rules to render
const rules: string[] = [
  'لورم اپیسوم متن ساختگی با تولید سادگی نامفهوم از صعنت چاپ به دیزاینر ها کمک نامفهوم از صعنت چاپ میکند که بهترین خدمات به کاربران میدهند.',
  'لورم اپیسوم متن ساختگی با تولید سادگی نامفهوم از صعنت چاپ به دیزاینر ها کمک نامفهوم از صعنت چاپ میکند که بهترین خدمات به کاربران میدهند.',
  'لورم اپیسوم متن ساختگی با تولید سادگی نامفهوم از صعنت چاپ به دیزاینر ها کمک نامفهوم از صعنت چاپ میکند که بهترین خدمات به کاربران میدهند.',
  'لورم اپیسوم متن ساختگی با تولید سادگی نامفهوم از صعنت چاپ به دیزاینر ها کمک نامفهوم از صعنت چاپ میکند که بهترین خدمات به کاربران میدهند.',
  'لورم اپیسوم متن ساختگی با تولید سادگی نامفهوم از صعنت چاپ به دیزاینر ها کمک نامفهوم از صعنت چاپ میکند که بهترین خدمات به کاربران میدهند.',
];

// Creating and exporting RulesSection Component as default
export default function RulesSection(): ReactNode {
  // Defining url to copy and to genrate qr code with
  const qrCodeUrl = window.location.href;

  // Returning JSX
  return (
    <section className="flex lg:gap-10 gap-[30px] lg:justify-between lg:items-end lg:flex-row flex-col">
      <div className="overflow-hidden">
        <div className="flex items-center justify-start lg:gap-2 gap-[10px] overflow-hidden">
          <IconsaxIcons
            name="Judge"
            color="currentColor"
            className="lg:w-4 lg:h-4 w-[22px] h-[22px] text-black shrink-0 aspect-square"
          />
          <span className="block w-full truncate text-right lg:text-cs08 text-[12px] lg:font-bold font-semibold">
            قوانین و مقرارت هتل و رزرواسیون
          </span>
        </div>
        <ol className="lg:gap-3 gap-[12px] lg:mt-5 mt-[20px] list-none list-inside flex flex-col overflow-hidden">
          {rules.map((item, index) => (
            <li
              className="lg:text-cs75 text-[10px] lg:font-medium font-semibold text-gray-500 lg:truncate"
              key={index}
            >
              {`${handleZeroBeforeNumber(index + 1)} - ${item}`}
            </li>
          ))}
        </ol>
      </div>
      <div className="flex items-center lg:justify-end lg:gap-6 gap-[23px] lg:shrink-0">
        <Link
          href="tel:02122490842"
          className="bg-gray-100 lg:transition-all lg:duration-500 lg:hover:bg-gray-200 border lg:rounded-lg rounded-[12px] border-black/10 aspect-square lg:h-40 h-auto lg:w-auto w-[50%] flex items-center justify-center p-4"
        >
          <div>
            <Image
              width={200}
              height={200}
              alt="واحد رزرواسیون و پشتیبانی"
              src={SignitureImage.src}
              className="w-[75%] h-auto block mx-auto mb-2"
            />
            <span className="lg:font-medium font-semibold lg:text-cs75 text-[10px] block text-center truncate w-full text-black mb-1">
              واحد رزرواسیون و پشتیبانی
            </span>
            <span className="lg:font-medium font-semibold lg:text-cs75 text-[10px] block text-center truncate w-full text-black">
              021-22490842
            </span>
          </div>
        </Link>
        <button
          className="bg-gray-100 lg:transition-all lg:duration-500 lg:hover:bg-gray-200 border lg:rounded-lg rounded-[12px] border-black/10 aspect-square lg:h-40 h-auto lg:w-auto w-[50%] flex items-center justify-center p-4"
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

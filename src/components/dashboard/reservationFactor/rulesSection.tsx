// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { QRCodeCanvas } from 'qrcode.react';
import toast from '../ui/customSonner/toast';
import { RulesSectionPropsType } from '@/types/dashboard/component';

// Creating and exporting RulesSection Component as default
export default function RulesSection({
  hotelName,
  rules,
  contactNumber,
  signatureImage,
}: RulesSectionPropsType): ReactNode {
  // Defining url to copy and to genrate qr code with
  const qrCodeUrl = window.location.href;

  // Returning JSX
  return (
    <section className="flex lg:gap-10 gap-[30px] lg:justify-between lg:items-end lg:flex-row flex-col">
      <div className="overflow-hidden">
        <div className="flex items-center justify-start lg:gap-2 gap-[10px] overflow-hidden text-[#2c2c2c]">
          <IconsaxIcons
            name="Judge"
            color="currentColor"
            className="lg:w-4 lg:h-4 w-[22px] h-[22px] shrink-0 aspect-square"
          />
          <span className="block w-full truncate text-right lg:text-cs08 text-[12px] font-semibold text-current">
            قوانین و مقرارت هتل {hotelName}
          </span>
        </div>
        <p className="lg:text-cs75 text-[10px] lg:font-medium font-semibold text-[#6e6e70] leading-5 line-clamp-5 mt-4">
          {rules}
        </p>
      </div>
      <div className="flex items-center lg:justify-end justify-center lg:gap-6 gap-[23px] lg:shrink-0">
        <Link
          href={`tel:${contactNumber.replace('-', '')}`}
          className="bg-[#f8f8f8] border lg:rounded-lg rounded-[12px] border-black/10 aspect-square size-40 flex items-center justify-center p-4"
        >
          <div>
            <Image
              width={200}
              height={200}
              alt="واحد رزرواسیون و پشتیبانی"
              src={signatureImage}
              className="w-[75%] h-auto block mx-auto mb-2"
            />
            <span className="lg:font-medium font-semibold lg:text-cs75 text-[10px] block text-center truncate w-full text-black mb-1">
              واحد رزرواسیون و پشتیبانی
            </span>
            <span className="lg:font-medium font-semibold lg:text-cs75 text-[10px] block text-center truncate w-full text-black">
              {contactNumber}
            </span>
          </div>
        </Link>
        <button
          className="bg-[#f8f8f8] lg:transition-all lg:duration-500 lg:hover:bg-gray-100 border lg:rounded-lg rounded-[12px] border-black/10 aspect-square size-40 w-auto flex items-center justify-center p-4"
          onClick={() => {
            navigator.clipboard.writeText(qrCodeUrl);

            toast({
              description: 'لینک تاییدیه هتل خودرا میتوانید به اشتراک بزارید.',
              title: 'لینک Qr Code کپی شد !',
              theme: 'green',
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

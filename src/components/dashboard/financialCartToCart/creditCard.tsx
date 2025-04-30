// Forcing next.js to render this component as client side component
'use client';

// Importing part
import ICUnion from '@/components/icons/ICUnion';
import { CreditCardComponentPropsType } from '@/types/dashboard/component';
import { numberSeparation } from '@/utils';
import { cn } from '@/utils/utils';
import { ReactNode, useEffect, useState } from 'react';

// Defibubg an object to identify bank names based on first 6 numbers of credit card
export const banks: { [key: string]: string } = {
  '603799': 'بانک ملی',
  '603770': 'بانک صادرات',
  '603769': 'بانک کشاورزی',
  '589210': 'بانک سپه',
  '610433': 'بانک ملت',
  '628023': 'بانک مسکن',
  '627648': 'بانک توسعه صادرات',
  '627961': 'بانک صنعت و معدن',
  '627353': 'بانک تجارت',
  '589463': 'بانک رفاه',
  '639347': 'بانک پاسارگاد',
  '627412': 'بانک اقتصاد نوین',
  '627488': 'بانک پارسیان',
  '627381': 'بانک انصار',
  '639599': 'بانک قوامین',
  '627760': 'بانک کارآفرین',
  '621986': 'بانک سامان',
  '639346': 'بانک سینا',
  '639607': 'بانک سرمایه',
  '502806': 'بانک شهر',
  '502938': 'بانک دی',
};

// Defining  a function to create random tailwindcss gradiants and exporting it
export function getRandomGradientClass(key: number | string) {
  // Defining colors
  const colors = [
    'pink',
    'purple',
    'indigo',
    'blue',
    'cyan',
    'teal',
    'lime',
    'amber',
    'orange',
    'rose',
  ];

  // Defining shade of colors
  const shades = ['400', '500', '600'];

  // simple hash function
  let hash = 0;
  const str = String(key);
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  hash = Math.abs(hash);

  // Defining directions of gradiant
  const directions = ['r', 'l', 't', 'b', 'tr', 'tl', 'br', 'bl'];

  // Getting random values from arrays
  const fromColor = colors[hash % colors.length];
  const fromShade = shades[hash % shades.length];
  const toColor = colors[(hash + 1) % colors.length];
  const toShade = shades[(hash + 1) % shades.length];
  const direction = directions[hash % directions.length];

  // Defining final classname
  let gradientClass = `bg-gradient-to-${direction} from-${fromColor}-${fromShade}`;

  // Appending class names
  gradientClass += ` to-${toColor}-${toShade}`;

  // Returning the random gradiant
  return gradientClass;
}

// Creating and exporting CreditCard component as default
export default function CreditCard({
  info,
  className,
}: CreditCardComponentPropsType): ReactNode {
  // Definign states of component
  const [gradiant, setGradiant] = useState(
    getRandomGradientClass(
      info
        ? info.number.card.toString().slice(0, 6)
        : '<UndefinedCardGradiant>',
    ),
  );

  useEffect(
    () =>
      setGradiant(
        getRandomGradientClass(
          info
            ? info.number.card.toString().slice(0, 6)
            : '<UndefinedCardGradiant>',
        ),
      ),
    [info],
  );

  // Defining a function to convert , remove white spaces and group the given number or string and return the last value
  const valueTransform = (val: string | number) =>
    numberSeparation(val.toString().replace(/\s+/g, ''), ' ', 4);

  // Returning JSx
  return (
    <div
      dir="rtl"
      className={cn(
        'w-[250px] h-[125px] rounded-[10px] relative lg:p-3 p-[12px] flex flex-col items-center justify-between gap-3 overflow-hidden bg-black transition-all duration-500',
        gradiant,
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 w-full">
        <ICUnion fill="white" />
        <span className="lg:text-cs75 text-[10px] font-medium block text-left truncate text-white">
          {info ? info.name.english : '-'}
        </span>
      </div>
      <div className="w-full">
        <span className="lg:text-cs08 text-[10px] font-medium block text-left truncate text-white mb-2">
          {info
            ? `IR ${valueTransform(info.number.shaba)}`
            : `IR ${valueTransform('000000000000000000000000')}`}
        </span>
        <span className="lg:text-cs75 text-[10px] font-medium block text-left truncate text-white">
          {info
            ? valueTransform(info.number.card)
            : valueTransform('0000000000000000')}
        </span>
      </div>
    </div>
  );
}

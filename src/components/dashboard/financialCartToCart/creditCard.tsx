// Forcing next.js to render this component as client side component
'use client';

// Importing part
import ICUnion from '@/components/icons/ICUnion';
import { CreditCardComponentPropsType } from '@/types/dashboard/component';
import { numberSeparation } from '@/utils';
import { cn } from '@/utils/utils';
import { ReactNode, useState } from 'react';

// Defining  a function to create random tailwindcss gradiants and exporting it
export function getRandomGradientClass() {
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

  // Defining directions of gradiant
  const directions = ['r', 'l', 't', 'b', 'tr', 'tl', 'br', 'bl'];

  // A function to get random item from an array
  const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

  // Getting random values from arrays
  const fromColor = getRandom(colors);
  const toColor = getRandom(colors);
  const fromShade = getRandom(shades);
  const toShade = getRandom(shades);
  const direction = getRandom(directions);

  // Defining final classname
  let gradientClass = `bg-gradient-to-${direction} from-${fromColor}-${fromShade}`;

  // Appending class names
  gradientClass += ` to-${toColor}-${toShade}`;

  // Returning the random gradiant
  return gradientClass;
}

// Creating and exporting CreditCard component as default
export default function CreditCard({
  name,
  number,
  shabaNumber,
  className,
}: CreditCardComponentPropsType): ReactNode {
  // Definign states of component
  const [gradiant] = useState(getRandomGradientClass);

  // Defining a function to convert , remove white spaces and group the given number or string and return the last value
  const valueTransform = (val: string | number) =>
    numberSeparation(val.toString().replace(/\s+/g, ''), ' ', 4);

  // Returning JSx
  return (
    <div
      dir="rtl"
      className={cn(
        'w-[250px] h-[125px] rounded-lg relative p-3 flex flex-col items-center justify-between gap-3 overflow-hidden bg-black',
        gradiant,
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 w-full">
        <ICUnion fill="white" />
        <span className="text-cs75 font-medium block text-left truncate text-white">
          {name}
        </span>
      </div>
      <div className="w-full">
        <span className="text-cs08 font-medium block text-left truncate text-white mb-2">
          IR {valueTransform(shabaNumber)}
        </span>
        <span className="text-cs75 font-medium block text-left truncate text-white">
          {valueTransform(number)}
        </span>
      </div>
    </div>
  );
}

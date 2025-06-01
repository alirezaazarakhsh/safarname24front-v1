// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ProfileTogglerComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode, useEffect, useState } from 'react';
import ToggleButtons from '../ui/toggleButtons';

// Creating and exporting ProfileToggler component as default
export default function ProfileToggler({
  className,
  onToggleChange,
  defaultVal = 'personal',
}: ProfileTogglerComponentPropsType): ReactNode {
  // Defining states of component
  const [val, setVal] = useState<'personal' | 'legal'>(defaultVal);

  // Using useEffect to attach onToggleChange prop to component
  useEffect(() => {
    onToggleChange && onToggleChange(val);
  }, [val, onToggleChange]);

  // Returning JSX
  return (
    <div
      className={cn(
        'bg-white lg:h-auto h-[64px] lg:rounded-lg rounded-[12px] border border-black/10 lg:px-3 lg:py-4 px-[16px] py-[16px] flex items-center justify-between gap-3',
        className,
      )}
    >
      <div>
        <span className='font-bold text-cs08 text-black mb-2 block text-right truncate'>
          {val === 'legal' ? 'پروفایل حقوقی' : 'پروفایل حقیقی'}
        </span>
        <span className='font-normal text-cs07 text-gray-500 block text-right truncate'>
          یکی از پروفایل های خود را انتخواب کنید.
        </span>
      </div>
      <ToggleButtons
        buttons={['پروفایل حقیقی', 'پروفایل حقوقی']}
        className='h-[50px] shrink-0'
        width={'w-[250px]'}
        defaultVal={defaultVal === 'legal' ? 1 : 0}
        onChange={(index) =>
          index === 0 ? setVal('personal') : setVal('legal')
        }
      />
    </div>
  );
}

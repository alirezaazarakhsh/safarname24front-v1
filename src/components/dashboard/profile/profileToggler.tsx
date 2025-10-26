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
        'bg-white lg:rounded-[10px] rounded-[14px] border border-black/10 lg:p-4 p-[14px] flex lg:flex-row flex-col lg:items-center lg:justify-between lg:gap-3 gap-[20px]',
        className,
      )}
    >
      <div>
        <span className="lg:font-bold font-semibold lg:text-cs08 text-[12px] text-black mb-2 block text-right truncate">
          {val === 'legal' ? 'پروفایل حقوقی' : 'پروفایل کاربری'}
        </span>
        <span className="lg:font-normal font-semibold lg:text-cs07 text-[10px] text-gray-500 block text-right truncate">
          یکی از پروفایل های خود را انتخاب کنید.
        </span>
      </div>
      <ToggleButtons
        buttons={['پروفایل حقیقی', 'پروفایل حقوقی']}
        className="lg:h-[50px] h-[45px] shrink-0 bg-gray-100"
        width={'lg:w-[250px] w-full'}
        defaultVal={defaultVal === 'legal' ? 1 : 0}
        onChange={(index) =>
          index === 0 ? setVal('personal') : setVal('legal')
        }
      />
    </div>
  );
}

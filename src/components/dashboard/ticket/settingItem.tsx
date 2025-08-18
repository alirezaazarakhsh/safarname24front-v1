// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { TicketsSettingItemPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';

// Creating and exporting Tikcets settingItem component as default
export default function SettingItem({
  subTitle,
  title,
  className,
  disabled = false,
  onClick,
  size = 'lg',
  icon,
}: TicketsSettingItemPropsType): ReactNode {
  // Returning JSX
  return (
    <button
      disabled={disabled}
      onClick={() => !disabled && onClick && onClick()}
      className={cn(
        'flex items-center justify-between gap-3 w-full transition-all duration-500 disabled:cursor-not-allowed cursor-pointer bg-white hover:bg-gray-100 ',
        size === 'lg' ? 'p-[12px] rounded-lg' : 'py-2',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center overflow-hidden gap-3',
          size === 'lg' ? 'justify-start' : 'justify-center w-full',
        )}
      >
        <div
          className={
            'size-10 bg-gray-200 flex items-center justify-center text-black rounded-lg overflow-hidden shrink-0'
          }
        >
          <IconsaxIcons name={icon} className="size-5" color="currentColor" />
        </div>
        {size === 'lg' && (
          <div className="overflow-hidden">
            <span className="text-cs75 font-medium text-black text-right truncate block mb-1">
              {title}
            </span>
            <span className="text-cs75 font-medium text-black/70 text-right truncate block">
              {subTitle}
            </span>
          </div>
        )}
      </div>
      {size === 'lg' && (
        <div className="text-black shrink-0">
          <IconsaxIcons
            name={disabled ? 'Lock' : 'ArrowLeft2'}
            className="size-4"
            color="currentColor"
          />
        </div>
      )}
    </button>
  );
}

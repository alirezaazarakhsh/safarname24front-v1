// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { IconsName } from '@/types';
import { TicketsNavBarPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode, useEffect, useState } from 'react';

// Defining data of nav bar to render
const data: {
  label: string;
  value: string;
  icon: IconsName;
}[] = [
    {
      label: 'تنظیمات چت',
      icon: 'Setting2',
      value: 'settings',
    },
    {
      label: 'چت تایم (جدید)',
      icon: 'Message2',
      value: 'message',
    },
    {
      label: 'تیکت ها (قدیم)',
      icon: 'MessageText',
      value: 'closedMessage',
    },
  ];

// Creating and exporting TicketsNavBar component as default
export default function TicketsNavBar({
  className,
  onTabChange,
}: TicketsNavBarPropsType): ReactNode {
  // Defining hooks
  const [activeTabState, setActiveTabState] = useState<string>('message');

  // Using useEffect to attach onTabChange to component
  useEffect(() => {
    onTabChange && onTabChange(activeTabState);
  }, [activeTabState]);

  // Returning JSX
  return (
    <div
      className={cn(
        'border-t border-t-black/10 grid grid-cols-3 gap-5 h-[75px] place-items-center bg-gray-100',
        className,
      )}
    >
      {data.map((item, index) => (
        <button
          data-active={item.value === activeTabState}
          className="transition-all duration-500 data-[active=true]:text-black data-[active=false]:text-black/50"
          key={index}
          onClick={() => setActiveTabState(item.value)}
        >
          <IconsaxIcons
            className="size-[20px] mx-auto block mb-1"
            name={item.icon}
            color="currentColor"
            variant={item.value === activeTabState ? 'Bold' : 'Outline'}
          />
          <span className="text-cs75 font-medium text-current truncate text-center block">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}

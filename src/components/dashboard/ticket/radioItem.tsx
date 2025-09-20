// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { TicketsRadioItemProps } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';

// Creating and exporting RadioItem component as deafult
export default function RadioItem({
  label,
  className,
  isActive,
  onClick,
}: TicketsRadioItemProps): ReactNode {
  // Returning JSX
  return (
    <button
      onClick={onClick}
      data-selected={isActive}
      type="button"
      className={cn('flex group items-center justify-start gap-3', className)}
    >
      <div className="size-6 flex items-center justify-center rounded-md transition-all duration-500 group-data-[selected=true]:bg-[#20AC53] group-data-[selected=false]:bg-gray-100 text-white">
        <IconsaxIcons
          name="TickSquare"
          variant="Bold"
          color="currentColor"
          className="transition-all duration-500 group-data-[selected=true]:opacity-100 group-data-[selected=false]:opacity-0 w-[60%] aspect-square"
        />
      </div>
      <span className="text-cs08 font-semibold text-black truncate text-right block flex-1">
        {label}
      </span>
    </button>
  );
}

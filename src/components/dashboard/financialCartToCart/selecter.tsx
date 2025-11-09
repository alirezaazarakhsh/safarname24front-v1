// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import { SelecterPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { Check } from 'lucide-react';
import { JSX } from 'react';

// Creating and exporting Selecter component as default
export default function Selecter({
  className,
  onCheckChange,
  checked = false,
  label,
}: SelecterPropsType): JSX.Element {
  // Returning JSX
  return (
    <div
      className={cn(
        'flex items-center justify-start gap-2 w-fit group cursor-pointer',
        className,
      )}
      data-checked={checked}
      onClick={() => onCheckChange && onCheckChange(!checked)}
    >
      <div className="shrink-0 transition-all duration-500 size-5 flex items-center justify-center rounded-md text-cs-blue group-data-[checked=false]:bg-gray-100 group-data-[checked=true]:bg-cs-blue/10">
        <div className="size-3.5 group-data-[checked=false]:opacity-0 group-data-[checked=true]:opacity-100 transition-all duration-500 rounded-[4px] border border-current flex items-center justify-center">
          <Check color="currentColor" className="size-2.5" />
        </div>
      </div>
      <span className="block text-right truncate flex-1 font-medium text-cs75">
        {label}
      </span>
    </div>
  );
}

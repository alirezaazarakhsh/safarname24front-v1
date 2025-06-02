// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ToastProps } from '@/types/dashboard/component';
import CircluarTimer from '../circluarTimer';
import { cn } from '@/utils/utils';

// Creating and exporting ToastComponent which renders is our actual headless toast
export default function ToastComponent({
  title,
  description,
  theme = 'theme',
}: ToastProps) {
  // Returning JSX
  return (
    <div
      dir="rtl"
      className="flex items-center justify-between gap-3 lg:w-[23dvw] w-full bg-white p-3 rounded-md z-[100] font-sans shadow-lg shadow-black/20"
    >
      <div className="overflow-hidden">
        <span
          className={cn(
            'mb-1 font-medium text-cs08 block truncate text-right w-full',
            theme === 'theme' ? 'text-cs-red' : 'text-green-500',
          )}
        >
          {title}
        </span>
        <span className="text-gray-500 font-medium text-cs65 block truncate text-right w-full">
          {description}
        </span>
      </div>
      <CircluarTimer duration={5} theme={theme} />
    </div>
  );
}

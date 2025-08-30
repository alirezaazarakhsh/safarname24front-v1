// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { SwitchItemComponentPropsType } from '@/types/dashboard/component';
import { ReactNode, useRef } from 'react';
import { Switch } from '@/components/ui/switch';

// Creating and exporting SwitchItem component as default
export default function SwitchItem({
  title,
  disabled = false,
  isOn,
  onClick,
}: SwitchItemComponentPropsType): ReactNode {
  // Defining refrences
  const switchRef = useRef<HTMLButtonElement | null>(null);

  // Returning JSX
  return (
    <div
      tabIndex={!disabled ? 0 : -1}
      data-disabled={disabled}
      className="bg-white lg:h-auto h-[64px] lg:rounded-lg rounded-[12px] border lg:px-3 lg:py-4 py-[12px] px-[12px] flex items-center justify-between gap-3 cursor-pointer"
      onClick={() => {
        if (!disabled) {
          const switchElement = switchRef.current;
          if (switchElement) switchElement.click();
        }
      }}
    >
      <span className="text-[12px] font-semibold truncate block text-right text-black">
        {title}
      </span>
      <Switch
        onClick={onClick}
        dir="ltr"
        ref={switchRef}
        checked={isOn}
        className="shrink-0 pointer-events-none"
      />
    </div>
  );
}

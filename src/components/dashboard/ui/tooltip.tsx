// Importing part
import { ReactNode } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { TooltipComponentPropsType } from '@/types/dashboard/component';

// Creating and exporting Tooltip component
export default function Tooltip({
  content,
  children,
}: TooltipComponentPropsType): ReactNode {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            sideOffset={5}
            className={
              'z-40 overflow-hidden animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin] bg-white rounded-md border border-black/10 p-2'
            }
          >
            <p className="text-[10px] font-normal text-black text-center">
              {content}
            </p>
            <RadixTooltip.Arrow className="-translate-y-[50%] w-3 h-3 rotate-45 stroke-none fill-none bg-white border-black/10 border-r border-b aspect-square z-50" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

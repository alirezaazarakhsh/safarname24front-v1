import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

type Props = React.ComponentProps<typeof DropdownMenuItem> & {
  isSelected?: boolean;
};

//  --------------------------

export function SelectableDropdownMenuItem({
  onClick,
  children,
  className,
  isSelected,
  ...props
}: Props) {
  return (
    <DropdownMenuItem
      {...props}
      className={cn('capitalize', className)}
      onClick={(e) => {
        setTimeout(() => {
          onClick?.(e);
        }, 100);
      }}
    >
      {children}

      <Check size={14} className={cn('ms-auto', !isSelected && 'hidden')} />
    </DropdownMenuItem>
  );
}

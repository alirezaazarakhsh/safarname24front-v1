'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { themeOptions } from '@/lib/constants/general';
import ThemeSwitcherTrigger from './theme-switcher-trigger';
import { SelectableDropdownMenuItem } from '../dropdown-menu-item-select';

type Props = {
  className?: string;
};

// ------------------------------

export function ThemeSwitcher({ className }: Props) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ThemeSwitcherTrigger className={className} />;
  }

  return (
    <Tooltip>
      <DropdownMenu>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={<ThemeSwitcherTrigger className={className} />}
            />
          }
        />

        <TooltipContent side="bottom">تنظیمات ظاهری</TooltipContent>

        <DropdownMenuContent side="bottom" align="end">
          {themeOptions.map((item) => {
            const Icon = item.icon;
            const isSelected = theme === item.value;

            return (
              <SelectableDropdownMenuItem
                key={item.value}
                isSelected={isSelected}
                onClick={() => setTheme(item.value)}
              >
                <Icon />
                <span>{item.label}</span>
              </SelectableDropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </Tooltip>
  );
}

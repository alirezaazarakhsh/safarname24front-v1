'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { useEffect, useId, useState } from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import { THEME_OPTIONS } from '@/lib/constants/general';

type Props = {
  className?: string;
};

// ------------------------------

export function ThemeTabs({ className }: Props) {
  const layoutGroupId = useId();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-secondary/50 h-10 w-30 animate-pulse rounded-full" />
    );
  }

  return (
    <LayoutGroup id={layoutGroupId}>
      <div
        className={cn(
          'bg-secondary/70 border-border/60 relative flex items-center rounded-full border p-1 backdrop-blur-xs',
          className,
        )}
      >
        {THEME_OPTIONS.map((item) => {
          const Icon = item.icon;
          const isSelected = theme === item.value;

          return (
            <Tooltip key={item.value}>
              <TooltipTrigger
                render={
                  <Button
                    type="button"
                    variant={'link'}
                    onClick={() => setTheme(item.value)}
                    className={cn(
                      'relative z-20 aspect-square h-9 rounded-full p-0',
                      theme === 'light' && isSelected && 'text-white',
                    )}
                  >
                    <Icon />
                    <span className="sr-only">{item.label}</span>

                    {isSelected && (
                      <motion.div
                        layoutId="active-theme-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-red-500"
                      />
                    )}
                  </Button>
                }
              />

              <TooltipContent side="bottom">{item.label}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

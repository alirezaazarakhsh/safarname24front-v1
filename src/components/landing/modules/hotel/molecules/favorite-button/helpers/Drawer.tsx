'use client';

import { createRoot, Root } from 'react-dom/client';
import React, { useEffect, useRef, useState } from 'react';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';

type DrawerOptions = {
  title: string;
  subtitle: string;
  autoClose?: number;
  onClose?: () => void;
  type: 'success' | 'error';
};

// -----------------------------

export function openDrawer({
  title,
  onClose,
  subtitle,
  autoClose = 5000,
  type,
}: DrawerOptions) {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const root: Root = createRoot(container);

  function DrawerWrapper() {
    const [open, setOpen] = useState(true);
    const [progress, setProgress] = useState(100);

    const isSuccess = type === 'success';
    const color = isSuccess ? '#16a34a' : '#f30f26';

    const total = autoClose;
    const remainingRef = useRef<number>(total);
    const lastRef = useRef<number>(Date.now());
    const pausedRef = useRef<boolean>(false);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
      intervalRef.current = window.setInterval(() => {
        if (pausedRef.current) {
          lastRef.current = Date.now();
          return;
        }

        const now = Date.now();
        const delta = now - lastRef.current;
        lastRef.current = now;

        remainingRef.current = Math.max(0, remainingRef.current - delta);
        setProgress((remainingRef.current / total) * 100);

        if (remainingRef.current <= 0) {
          setOpen(false);
        }
      }, 50);

      return () => {
        if (intervalRef.current !== null) {
          window.clearInterval(intervalRef.current);
        }
      };
    }, [total]);

    useEffect(() => {
      const onVisibility = () => {
        pausedRef.current = document.hidden;
        if (!document.hidden) lastRef.current = Date.now();
      };
      const onBlur = () => {
        pausedRef.current = true;
      };
      const onFocus = () => {
        pausedRef.current = false;
        lastRef.current = Date.now();
      };

      window.addEventListener('blur', onBlur);
      window.addEventListener('focus', onFocus);
      document.addEventListener('visibilitychange', onVisibility);

      return () => {
        window.removeEventListener('blur', onBlur);
        window.removeEventListener('focus', onFocus);
        document.removeEventListener('visibilitychange', onVisibility);
      };
    }, []);

    useEffect(() => {
      if (!open) {
        const t = window.setTimeout(() => {
          try {
            root.unmount();
          } catch (e) {}
          if (container.parentNode) container.remove();
          onClose?.();
        }, 300);
        return () => window.clearTimeout(t);
      }
    }, [open]);

    return (
      <Drawer open={open} onOpenChange={(v) => setOpen(v)}>
        <DrawerContent
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
            lastRef.current = Date.now();
          }}
        >
          <div className="relative space-y-1">
            <DialogTitle
              className="!font-extrabold !text-sm/6"
              style={{ color }}
            >
              {title}
            </DialogTitle>

            <DialogDescription className="!text-cs85/6 text-zinc-800 font-semibold pb-5">
              {subtitle}
            </DialogDescription>

            <div className="absolute bottom-0 left-0 w-full h-[4px] bg-zinc-100 overflow-hidden rounded-xl">
              <div
                style={{
                  top: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: '1rem',
                  position: 'absolute',
                  width: `${progress}%`,
                  transition: 'width 50ms linear',
                }}
                className={`${isSuccess ? 'bg-[#16a34a]' : 'bg-[#f30f26]'}`}
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  root.render(<DrawerWrapper />);

  return {
    close: () => {
      try {
        root.unmount();
      } catch (e) {}
      if (container.parentNode) container.remove();
    },
  };
}

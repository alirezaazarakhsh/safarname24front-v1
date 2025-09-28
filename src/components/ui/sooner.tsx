'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      toastOptions={{
        classNames: {
          // content: 'bg-zinc-700 max-w-none w-fit',
          // default: 'max-w-none bg-red-200 w-fit p-5',
          // toast: 'bg-blue-200 p-3',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

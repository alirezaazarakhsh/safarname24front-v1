'use client';

import { Toaster } from '@/components/ui/toast';
import { ThemeProvider } from './theme-provider';

// import { AuthAlert, AuthProvider } from '@/features/auth';
import { TooltipProvider } from '@/components/ui/tooltip';
import { DirectionProvider } from '@/components/ui/direction';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ------------------------------

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <DirectionProvider direction="rtl">
      <ThemeProvider
        enableSystem
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
      >
        <TooltipProvider>
          {/* <AuthProvider> */}
            <QueryClientProvider client={queryClient}>
              {children}

              <Toaster />
              {/* <AuthAlert /> */}
            </QueryClientProvider>
          {/* </AuthProvider> */}
        </TooltipProvider>
      </ThemeProvider>
    </DirectionProvider>
  );
}

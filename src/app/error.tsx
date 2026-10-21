'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

type ErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

// ------------------------------

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('error', error);
  }, [error]);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center p-4 text-center">
      <div className="bg-destructive/10 text-destructive flex size-16 items-center justify-center rounded-2xl">
        <AlertTriangle className="size-8" />
      </div>

      <h1 className="mt-6 mb-2 text-xl font-bold sm:text-2xl">
        خطایی رخ داده است !
      </h1>

      <p className="text-muted-foreground text-sm leading-7 font-medium">
        متأسفانه هنگام بارگذاری این صفحه مشکلی بوجود آمده است, لطفاً دوباره تلاش
        کنید .
      </p>

      <div className="mt-8 mb-6 flex flex-wrap items-center justify-center gap-4">
        <Button onClick={reset} className={'px-5'}>
          <RefreshCw />
          <span>تلاش مجدد</span>
        </Button>

        <Button
          onClick={reset}
          className={'px-5'}
          variant={'outline'}
          nativeButton={false}
          render={
            <Link href="/">
              <Home />
              <span>بازگشت به خانه</span>
            </Link>
          }
        />
      </div>

      {error.digest && (
        <p className="text-muted-foreground text-xs font-medium">
          کد خطا : {error.digest}
        </p>
      )}
    </main>
  );
}

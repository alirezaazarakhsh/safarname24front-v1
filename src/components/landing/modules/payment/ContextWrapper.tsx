'use client';

import { Toaster } from 'sonner';
import { PropsWithChildren } from 'react';
import { PaymentInvoiceProvider, PaymentLoadingProvider } from '@/context';

export function ContextWrapper(props: PropsWithChildren) {
  return (
    <>
      <PaymentInvoiceProvider>
        <Toaster position="bottom-left" />
        <PaymentLoadingProvider>{props.children}</PaymentLoadingProvider>
      </PaymentInvoiceProvider>
    </>
  );
}

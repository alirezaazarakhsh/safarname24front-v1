'use client';

import { PropsWithChildren } from 'react';
import { PaymentInvoiceProvider } from '@/context';

export function ContextWrapper(props: PropsWithChildren) {
  return <PaymentInvoiceProvider>{props.children}</PaymentInvoiceProvider>;
}

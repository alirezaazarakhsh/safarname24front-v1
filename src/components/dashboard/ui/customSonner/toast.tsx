// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { toast as sonnerToast } from 'sonner';
import { ToastProps } from '@/types/dashboard/component';
import ToastComponent from '@/components/dashboard/ui/customSonner/toastComponent';

// Creating and exporting toast function which renders our headless toast
export default function toast(toast: Omit<ToastProps, 'id'>) {
  return sonnerToast.custom(() => <ToastComponent {...toast} />);
}

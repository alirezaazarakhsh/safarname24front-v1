// Importing part
import { RootLayoutPropsType } from '@/types/dashboard/component';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import 'swiper/css';
import '@/styles/scrollbar.css';
import '@/styles/dashboard.css';
import Page from '@/components/dashboard/page';

// Creating and exporting DashboardLayout component as default
export default function DashboardLayout({
  children,
}: RootLayoutPropsType): ReactNode {
  // Returning JSX
  return (
    <>
      <Toaster position="bottom-left" duration={5000} className='z-[70]' />
      <Page>{children}</Page>
    </>
  );
}

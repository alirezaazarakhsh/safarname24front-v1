'use client';

import { usePathname } from 'next/navigation';

import Header from '@/components/landing/modules/header/Header';
import Footer from '@/components/landing/modules/footer/Footer';
import ComingSoon from '@/components/landing/modules/coming-soon/ComingSoon';
import NavigationBar from '@/components/landing/shared/navigation-bar/NavigationBar';

type Props = Readonly<{
  children: React.ReactNode;
}>;

// --------------------------------------------

export default function LandingLayout(props: Props) {
  const pathname = usePathname();

  return (
    <>
      {false ? (
        <ComingSoon date='2025-02-20' />
      ) : (
        <main className='max-w-screen-template min-h-dvh mx-auto flex flex-col'>
          <Header />
          <section
            className={`mx-5 mt-8 mb-16 flex flex-col gap-y-12 lg:gap-y-20 ${
              pathname === '/' ? 'lg:mt-28 xl:mt-24' : 'lg:mt-32'
            }`}
          >
            {props.children}
          </section>

          <NavigationBar />
          <Footer />
        </main>
      )}
    </>
  );
}

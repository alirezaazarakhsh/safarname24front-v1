'use client';

import { Header } from '@/components/landing/shared';
import { Footer } from '@/components/landing/shared';

import { ComingSoon } from '@/components/landing/modules/coming-soon';
import { NavigationBar } from '@/components/landing/shared/navigation-bar';

type Props = Readonly<{
  children: React.ReactNode;
}>;

// --------------------------------------------

export default function LandingLayout(props: Props) {
  return (
    <>
      {false ? (
        <ComingSoon date="2025-05-20" />
      ) : (
        <>
          <Header />
          <main className="max-w-screen-template min-h-dvh mx-auto">
            <section className="mb-20 mx-5">{props.children}</section>
            <NavigationBar />
            <Footer />
          </main>
        </>
      )}
    </>
  );
}

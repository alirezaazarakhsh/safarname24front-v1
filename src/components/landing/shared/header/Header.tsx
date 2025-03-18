'use client';

import dynamic from 'next/dynamic';
import MobileHeader from './MobileHeader';

const ClientOnlyComponent = dynamic(() => import('./DesktopHeader'), {
  ssr: false,
  loading: () => (
    <div className="fixed top-0 inset-x-0 z-20 bg-[#f8f8f8] h-20 hidden lg:block"></div>
  ),
});

const staticData = {
  title: 'سفرنامه 24',
  userFullName: 'علیرضا آذرخش',
  logo: '/image/logo/white.webp',
  subtitle: 'agency safarname 24 hotel',
};

// --------------------------------------------

export function Header() {
  return (
    <>
      <MobileHeader
        logo={staticData.logo}
        title={staticData.title}
        subtitle={staticData.subtitle}
      />

      <ClientOnlyComponent
        logo={staticData.logo}
        title={staticData.title}
        subtitle={staticData.subtitle}
        userFullName={staticData.userFullName}
      />
    </>
  );
}

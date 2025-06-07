import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

// --------------------------------------------

export function Header() {
  return (
    <>

      <MobileHeader
        logo={staticData.logo}
        title={staticData.title}
        subtitle={staticData.subtitle}
      />

      <DesktopHeader
        logo={staticData.logo}
        title={staticData.title}
        subtitle={staticData.subtitle}
      />

      <MobileHeader />
      <DesktopHeader />

    </>
  );
}

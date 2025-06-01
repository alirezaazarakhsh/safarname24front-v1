import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

const staticData = {
  title: 'سفرنامه 24',
  userFullName: 'علیرضا آذرخش',
  logo: '/image/logo/full-red-gray.png',
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

      <DesktopHeader
        logo={staticData.logo}
        title={staticData.title}
        subtitle={staticData.subtitle}
        userFullName={staticData.userFullName}
      />
    </>
  );
}

import { navLinks } from '@/constants';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

// --------------------------------------------

export default function Header() {
  return (
    <>
      <MobileHeader logo='/image/logo/logo-white.png' title='سفرنامه 24' subtitle='agency safarname 24 hotel' />

      <DesktopHeader
        logo='/image/logo/logo-white.png'
        title='سفرنامه 24'
        subtitle='agency safarname 24 hotel'
        navLinks={navLinks}
      />
    </>
  );
}

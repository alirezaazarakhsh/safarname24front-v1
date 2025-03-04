import { navLinks } from '@/constants';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

// --------------------------------------------

export default function Header() {
  return (
    <>
      <MobileHeader
        logo="/image/logo/white.webp"
        title="سفرنامه 24"
        subtitle="agency safarname 24 hotel"
      />

      <DesktopHeader
        logo="/image/logo/white.webp"
        title="سفرنامه 24"
        subtitle="agency safarname 24 hotel"
        navLinks={navLinks}
      />
    </>
  );
}

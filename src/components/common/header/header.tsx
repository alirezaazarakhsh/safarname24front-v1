import Menu from './menu';
import Brand from './brand';
import Navbar from './navbar';

import AuthHandler from './auth-handler';

import { ThemeSwitcher } from '@/components/common/theme-switcher';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, Headphones } from 'lucide-react';

// ------------------------------

export function Header() {
  return (
    <header className="bg-background sticky inset-x-0 top-0 z-40 border-b">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center gap-8 px-4 lg:h-20 lg:rounded-2xl">
        <Brand />
        <Navbar />

        <div className="flex-center mr-auto gap-2 lg:gap-0">
          {/* <div className="hidden lg:block">
            <ThemeSwitcher />
          </div> */}

          <div className="hidden lg:block">
            <Button variant={'secondary'} className={'font-semibold'}>
              <ClipboardCheck />
              <span>پیگیری رزرو</span>
            </Button>

            <Button variant={'secondary'} className={'font-semibold'}>
              <Headphones />
              <span>پشتیبانی</span>
            </Button>
          </div>

          <AuthHandler />

          <Menu />
        </div>
      </div>
    </header>
  );
}

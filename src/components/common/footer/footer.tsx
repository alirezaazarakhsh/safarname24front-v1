import { cn } from 'cn';
import { AccessLinks } from './access-links';
import { Copyright } from './copyright';
import { Brand } from './brand';
import { Licenses } from './licenses';
import { Contact } from './contact';
import { SocialMedia } from './social-media';
import { Newsletter } from './newsletter';
import { Button } from '@/components/ui/button';
import {
  ClipboardCheck,
  Headphones,
  Phone,
  PhoneCall,
  PhoneIncoming,
} from 'lucide-react';

// ------------------------------

export function Footer() {
  return (
    <footer className="bg-sidebar mt-auto border-t">
      <div
        className={cn(
          'mx-auto max-w-7xl',
          'px-4 py-8 xl:py-10',
          'grid items-start gap-8 lg:grid-cols-[24rem_1fr_16rem]',
        )}
      >
        <Brand />
        <AccessLinks />
        <Licenses />

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between lg:col-span-3">
          <SocialMedia />

          <div className="hidden gap-4 lg:flex">
            <Button variant={'secondary'} className={'px-5 font-semibold'}>
              <PhoneCall className="" />
              <span>تماس با ما</span>
            </Button>

            <Button variant={'secondary'} className={'px-5 font-semibold'}>
              <ClipboardCheck />
              <span>پیگیری رزرو</span>
            </Button>

            <Button variant={'secondary'} className={'px-5'}>
              <Headphones />
              <span> ارتباط با پشتیبانی</span>
            </Button>
          </div>

          <Newsletter />
        </div>

        <Contact />
      </div>

      <Copyright />
    </footer>
  );
}

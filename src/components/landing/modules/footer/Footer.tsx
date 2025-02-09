import Logo from './Logo';
import Copyright from './Copyright';
import Description from './Description';
import QuickAccess from './QuickAccess';
import SocialMedias from './SocialMedias';
import IdentityBadges from './IdentityBadges';
import WebsiteIdentity from './WebsiteIdentity';
import CommunicationWays from './CommunicationWays';
import { communicationWays, identityBadges, quickAccess, socialMedias } from '@/constants';

export default function Footer() {
  return (
    <>
      {/* Small-Device */}
      <footer className='relative bg-white text-cs08 font-medium p-4 pb-28 mt-auto flex flex-col items-center gap-4 border-t-4 border-zinc-200 lg:pb-8 xl:hidden'>
        <Logo />
        <Description />
        <QuickAccess src={quickAccess} />
        <CommunicationWays src={communicationWays} />
        <IdentityBadges src={identityBadges} />
        <SocialMedias src={socialMedias} />
        <Copyright />
        <WebsiteIdentity />
      </footer>

      {/* Large-Device */}
      <footer className='pb-8 mx-5 mt-auto hidden grid-cols-[2fr_1fr] grid-rows-[1.2fr_3fr] gap-6 xl:grid'>
        {/* Quick-Access */}
        <div className='bg-white flex-center rounded-xl'>
          <QuickAccess src={quickAccess} />
        </div>

        {/* Left */}
        <div className='bg-white p-6 row-span-2 flex flex-col rounded-xl'>
          <Logo />
          <Description />
          <Copyright />
          <WebsiteIdentity />
        </div>

        {/* Right-Bottom */}
        <div className='bg-white p-6 flex items-end gap-4 rounded-xl xl:gap-6'>
          <div>
            <CommunicationWays src={communicationWays} />
          </div>

          <div className='flex-1 flex flex-col gap-4'>
            <IdentityBadges src={identityBadges} />
            <SocialMedias src={socialMedias} />
          </div>
        </div>
      </footer>
    </>
  );
}

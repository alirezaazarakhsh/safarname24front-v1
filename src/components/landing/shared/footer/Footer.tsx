import Logo from './Logo';
import Copyright from './Copyright';
import Description from './Description';
import QuickAccess from './QuickAccess';
import SocialMedias from './SocialMedias';
import IdentityBadges from './IdentityBadges';
import WebsiteIdentity from './WebsiteIdentity';
import CommunicationWays from './CommunicationWays';

import { footer } from '@/constants/landing';

export function Footer() {
  return (
    <>
      {/* Small-Device */}
      <footer className="relative bg-white text-cs08 font-medium p-4 pb-24 mt-auto flex flex-col items-center gap-4 border-t-4 border-zinc-200 xl:pb-8 xl:hidden">
        <Logo src={footer.logo} />
        <Description title={footer.title} desc={footer.desc} />
        <QuickAccess src={footer.quickAccess} />
        <CommunicationWays src={footer.communicationWays} />
        <IdentityBadges src={footer.identityBadges} />
        <SocialMedias src={footer.socialMedias} />
        <Copyright copyright={footer.copyright} />
        <WebsiteIdentity />
      </footer>

      {/* Large-Device */}
      <footer className="pb-8 mx-5 mt-auto hidden grid-cols-[2fr_1fr] grid-rows-[1.2fr_3fr] gap-6 xl:grid">
        {/* Quick-Access */}
        <div className="bg-white flex-center rounded-xl">
          <QuickAccess src={footer.quickAccess} />
        </div>

        {/* Left */}
        <div className="bg-white p-6 row-span-2 flex flex-col rounded-xl">
          <Logo src={footer.logo} />
          <Description title={footer.title} desc={footer.desc} />
          <Copyright copyright={footer.copyright} />
          <WebsiteIdentity />
        </div>

        {/* Right-Bottom */}
        <div className="bg-white p-6 flex items-end gap-4 rounded-xl xl:gap-6">
          <div>
            <CommunicationWays src={footer.communicationWays} />
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <IdentityBadges src={footer.identityBadges} />
            <SocialMedias src={footer.socialMedias} />
          </div>
        </div>
      </footer>
    </>
  );
}

import Logo from './Logo';
import Copyright from './Copyright';
import Description from './Description';
import QuickAccess from './QuickAccess';
import SocialMedias from './SocialMedias';
import IdentityBadges from './IdentityBadges';
import WebsiteIdentity from './WebsiteIdentity';
import CommunicationWays from './CommunicationWays';

export type Footer = {
  footer_logo: string;
  header_logo: string;
  footer_title: string;
  header_title: string;
  header_sub_title: string;
  footer_copyright: string;
  footer_description: string;
};

// --------------------------------

export function Footer() {
  return (
    <>
      {/* Small-Device */}
      <footer className="relative bg-white text-cs08 font-medium p-4 pb-24 mt-auto flex flex-col items-center gap-4 border-t-4 border-zinc-200 xl:pb-8 xl:hidden">
        <Logo />
        <Description />
        <QuickAccess />
        <CommunicationWays />
        <IdentityBadges />
        <SocialMedias />
        <Copyright />
        <WebsiteIdentity />
      </footer>

      {/* Large-Device */}
      <footer className="pb-8 mx-5 mt-auto hidden grid-cols-[2fr_1fr] grid-rows-[1.2fr_3fr] gap-6 xl:grid">
        {/* Quick-Access */}
        <div className="bg-white flex-center rounded-xl shadow-[0_1rem_1rem_rgba(0,0,0,0.02)]">
          <QuickAccess />
        </div>

        {/* Left */}
        <div className="bg-white p-6 row-span-2 flex flex-col rounded-xl shadow-[0_1rem_1rem_rgba(0,0,0,0.02)]">
          <Logo />
          <Description />
          <Copyright />
          <WebsiteIdentity />
        </div>

        {/* Right-Bottom */}
        <div className="bg-white p-6 flex gap-4 rounded-xl shadow-[0_1rem_1rem_rgba(0,0,0,0.02)] xl:gap-6">
          <div className="w-1/2">
            <CommunicationWays />
          </div>

          <div className="w-1/2 mt-auto flex flex-col gap-2">
            <IdentityBadges />
            <SocialMedias />
          </div>
        </div>
      </footer>
    </>
  );
}

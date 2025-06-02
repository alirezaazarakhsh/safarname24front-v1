import {
  SendTicket,
  SocialMedias,
  ContactUsWays,
} from '@/components/landing/modules/contact-us';

// -----------------------------------------------

export default function ContactUs() {
  return (
    <div className="mt-8 flex flex-col gap-12 lg:gap-20 xl:mt-12">
      <ContactUsWays />
      <SocialMedias />
      <SendTicket />
    </div>
  );
}

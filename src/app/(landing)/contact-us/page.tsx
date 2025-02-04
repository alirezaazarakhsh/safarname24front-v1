import { contactUsSocialMedia, contactUsWays } from '@/constants';
import { ContactUsWays, SendTicket, SocialMedias } from '@/components/landing/modules/contact-us';

// -----------------------------------------------

export default function ContactUs() {
  return (
    <>
      <ContactUsWays src={contactUsWays} />
      <SocialMedias src={contactUsSocialMedia} />
      <SendTicket />
    </>
  );
}

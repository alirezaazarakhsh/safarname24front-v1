import {
  ContactUsWays,
  SendTicket,
  SocialMedias,
} from '@/components/landing/modules/contact-us';
import { contactUs } from '@/constants/landing';

// -----------------------------------------------

export default function ContactUs() {
  const { contactUsWays, socialMedia } = contactUs;

  return (
    <div className="mt-8 flex flex-col gap-14 lg:gap-20 xl:mt-12">
      <ContactUsWays src={contactUsWays} />
      <SocialMedias src={socialMedia} />
      <SendTicket />
    </div>
  );
}

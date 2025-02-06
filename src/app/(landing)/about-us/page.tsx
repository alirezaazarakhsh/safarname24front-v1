import { aboutUsStory, aboutUsInformation, aboutUsReasons } from '@/constants';
import {
  FrequentlyQuestions,
  Gallery,
  LookingAtServices,
  OurStory,
  ReasonOfSelection,
} from '@/components/landing/modules/about-us';

const services = [
  { title: 'دپارتمان برگزاری مراسم و همایش', desc: '' },
  { title: 'خدمات ترانسفر فرودگاهی', desc: '' },
  { title: 'برگزاری مراسم های بین المللی شرکت ها', desc: '' },
];

// -----------------------------------------------

export default function AboutUs() {
  return (
    <>
      <OurStory story={aboutUsStory} imageUrl='/image/background/about-us/story.png' information={aboutUsInformation} />
      <ReasonOfSelection src={aboutUsReasons} />
      <FrequentlyQuestions src={[...services, ...services]} />
      <Gallery src={[]} />
      <LookingAtServices src={services} />
    </>
  );
}

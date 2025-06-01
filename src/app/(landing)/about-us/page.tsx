import {
  Gallery,
  OurStory,
  ReasonOfSelection,
  LookingAtServices,
  FrequentlyQuestions,
} from '@/components/landing/modules/about-us';
import { aboutUs } from '@/constants/landing';

// -----------------------------------------------

export default function AboutUs() {
  const { information, reasons, services, story } = aboutUs;

  return (
    <div className="mt-8 flex flex-col gap-14 lg:gap-20 xl:mt-12">
      <OurStory
        story={story}
        imageUrl="/image/background/about-us/story.png"
        information={information}
      />

      <ReasonOfSelection src={reasons} />
      <FrequentlyQuestions src={[...services.services, ...services.services]} />

      <Gallery src={aboutUs.gallery} />
      <LookingAtServices src={services.services} image={services.image} />
    </div>
  );
}

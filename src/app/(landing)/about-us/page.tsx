import {
  Gallery,
  OurStory,
  ReasonOfSelection,
  LookingAtServices,
  // FrequentlyQuestions,
} from '@/components/landing/modules/about-us';

// ---------------------------------

export default function AboutUs() {
  return (
    <div className="mt-8 flex flex-col gap-14 lg:gap-20 xl:mt-12">
      <OurStory />
      <ReasonOfSelection />

      {/*
      <FrequentlyQuestions />
      */}
      <Gallery />

      <LookingAtServices />
    </div>
  );
}

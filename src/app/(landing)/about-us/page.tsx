// -----------------------------------------------

import { AboutUsStory } from '@/components/landing/modules/about-us';
import { aboutUsStory } from '@/constants';

export default function AboutUs() {
  return (
    <>
      <AboutUsStory story={aboutUsStory} />
    </>
  );
}

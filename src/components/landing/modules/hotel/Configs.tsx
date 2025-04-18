import { BackToTopBtn } from '../rules';
import FavoriteButton from './molecules/FavoriteButton';
import Sharing from './molecules/sharing/Sharing';
import { SectionLinks } from './SectionLinks';

type Props = {
  activeSection: string;
  sectionList: Array<{ id: string; title: string }>;
};

// -----------------------------------------------------

export default function Configs(props: Props) {
  const { activeSection, sectionList } = props;

  return (
    <div className="sticky z-30 top-24 bg-white h-16 p-3 -my-4 items-center justify-between gap-12 hidden rounded-xl shadow-[0_0_2rem_rgba(0,0,0,0.05)] lg:flex">
      <div className="flex-1">
        <SectionLinks sectionList={sectionList} activeSection={activeSection} />
      </div>

      <div className="w-fit h-full flex gap-2">
        <BackToTopBtn />

        <Sharing />
        <FavoriteButton />
      </div>
    </div>
  );
}

import { TopBarConfig } from '../../shared';
import DFacilities from './molecules/DFacilities';
import MFacilities from './molecules/MFacilities';

type Props = {
  hotelName: string;
  facilities: {
    all: { welfare: string[]; room: string[] };
    main: string[];
    categorized: { title: string; items: string[] }[];
  };
};

// ---------------------------------------

export function Facilities(props: Props) {
  const { facilities, hotelName } = props;
  if (!facilities) return null;

  return (
    <div id="facilities" className="relative">
      <TopBarConfig
        className="mb-2 md:mb-6"
        title={{ type: 'single', text: 'امکانات هتل' }}
      />

      <MFacilities facilities={facilities} hotelName={hotelName} />
      <DFacilities facilities={facilities} />
    </div>
  );
}

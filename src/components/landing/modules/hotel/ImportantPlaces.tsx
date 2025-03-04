import { TopBarConfig } from '../../shared';
import DImportantPlaces from './molecules/important-places/DImportantPlaces';
import MImportantPlaces from './molecules/important-places/MImportantPlaces';

type Props = {
  importantPlaces: {
    title: string;
    image: string;
    distances: { byCar: number; onFoot: number; totalDistance: number };
    geolocation: { lat: number; lng: number };
  }[];
};

// -----------------------------------------

export function ImportantPlaces(props: Props) {
  const { importantPlaces } = props;

  return (
    <div id='nearby-places'>
      <TopBarConfig title='اماکن مهم اطراف هتل' className='mb-3 lg:mb-4' />

      <MImportantPlaces importantPlaces={importantPlaces} />
      <DImportantPlaces importantPlaces={importantPlaces} />
    </div>
  );
}

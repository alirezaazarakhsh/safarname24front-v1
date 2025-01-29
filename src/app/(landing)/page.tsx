import { Services, SuggestedHotels } from '@/components/landing/modules';
import { MostVisitedCities } from '@/components/landing/modules/home/MostVisitedCities';
import { services, suggestedHotels } from '@/constants';

export default function Home() {
  return (
    <div className='mt-10'>
      <Services services={services} />
      <SuggestedHotels suggestedHotels={suggestedHotels} />
      <MostVisitedCities cities={mostVisitedCities} />
    </div>
  );
}

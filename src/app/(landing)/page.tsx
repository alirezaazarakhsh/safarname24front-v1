
import { Services } from '@/components/landing/modules';
import { services } from '@/constants';

export default function Home() {
  return (
    <div className='mt-10'>
      <Services src={services} />
    </div>
  );
}

import Link from 'next/link';
import Image from 'next/image';

import hotel_logo from '@/assets/images/logo/atana.png';
import { SectionTitle } from '@/components/common/section-topbar/section-title';

// ------------------------------

export function TopHotels() {
  return (
    <section className="space-y-8">
      <SectionTitle className="w-full text-center">
        هتل های برتر ایران
      </SectionTitle>

      <div className="mx-auto grid w-full grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 12 })
          .fill(null)
          .map((_, i) => (
            <Link
              href={'/'}
              key={i}
              className="flex-center overflow-hidden rounded-3xl bg-white p-4"
            >
              <Image
                alt="hotel-logo"
                src={hotel_logo}
                className="aspect-auto size-full"
              />
            </Link>
          ))}
      </div>
    </section>
  );
}

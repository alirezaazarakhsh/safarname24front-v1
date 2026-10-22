import Link from 'next/link';
import Image from 'next/image';

import hotel_logo from '@/assets/images/logo/atana.png';

// ------------------------------

export function TopHotels() {
  return (
    <section className="space-y-8">
      <span className="inline-block w-full text-center font-black lg:text-lg">
        هتل های برتر ایران
      </span>

      <div className="mx-auto grid w-full grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-6">
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

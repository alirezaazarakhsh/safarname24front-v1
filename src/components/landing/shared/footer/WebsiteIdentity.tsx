import Link from 'next/link';

// --------------------------------------

export default function WebsiteIdentity() {
  return (
    <div className="flex-center absolute inset-x-0 bottom-0 h-20 w-full bg-cs-dark-blue text-cs85 xl:relative xl:h-11 xl:rounded-cs-10 xl:pb-0">
      <p className="truncate font-inter font-semibold text-white lg:font-medium">
        Design & Develop By{' '}
        <Link
          href={''}
          className="text-cs-red hover:underline lg:text-zinc-100"
        >
          Sevin Team
        </Link>
      </p>
    </div>
  );
}

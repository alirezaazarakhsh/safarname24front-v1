import Link from 'next/link';

// --------------------------------------

export default function WebsiteIdentity() {
  return (
    <div className='absolute bottom-0 inset-x-0 bg-[#202126] w-full h-20 text-cs85 flex-center xl:relative xl:h-11 xl:pb-0 xl:rounded-cs-10'>
      <p className='text-white font-inter font-semibold truncate lg:font-medium'>
        Design & Develop By{' '}
        <Link href={''} className='text-cs-red hover:underline lg:text-zinc-100'>
          Sevin Team
        </Link>
      </p>
    </div>
  );
}

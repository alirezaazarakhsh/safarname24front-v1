import Link from 'next/link';

export default function WebsiteIdentity() {
  return (
    <div className='absolute bottom-0 inset-x-0 bg-[#202126] w-full h-16 text-cs08 flex-center lg:relative lg:h-12 lg:pb-0 lg:rounded-cs-10'>
      <p className='text-zinc-100 font-inter font-semibold truncate lg:font-medium'>
        Design & Develop By{' '}
        <Link href={''} className='text-cs-red hover:underline lg:text-zinc-100'>
          Sevin Team
        </Link>
      </p>
    </div>
  );
}

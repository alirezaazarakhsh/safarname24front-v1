import Image from 'next/image';

export default function Logo() {
  return (
    <div className='w-full flex-center'>
      <Image
        src='/image/logo/red-gray.webp'
        alt='safarname24-logo'
        width={200}
        height={200}
        className='w-24 h-24 -mb-4 object-contain xl:mb-0 xl:-mt-3'
      />
    </div>
  );
}

import Image from 'next/image';

export default function Logo() {
  return (
    <div className='w-full flex-center'>
      <Image
        src='/image/logo/logo-footer.webp'
        alt='safarname24-logo'
        width={200}
        height={200}
        className='w-28 h-28 -mb-6 -mt-2 object-contain xl:-mb-3 xl:-mt-5'
      />
    </div>
  );
}

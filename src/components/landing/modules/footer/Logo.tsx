import Image from 'next/image';

export default function Logo() {
  return (
    <div className='w-full flex-center'>
      <Image
        src='/image/logo/logo-black.png'
        alt='safarname24-logo'
        width={100}
        height={100}
        className='w-28 h-28 -mb-6 -mt-2 object-contain lg:-mb-4 lg:-mt-6'
      />
    </div>
  );
}

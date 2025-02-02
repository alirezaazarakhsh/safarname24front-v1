import Link from 'next/link';
import Header from '@/components/landing/modules/header/Header';

export default function NotFound() {
  return (
    <>
      <Header />

      <div className='text-sormei flex flex-col items-center justify-center gap-2 mt-60 lg:flex-row-reverse lg:min-h-fit lg:gap-8 lg:mt-40'>
        <div className='flex flex-col items-center justify-center gap-2 lg:gap-2.5'>
          <h3 className='text-lg font-bold uppercase tracking-[5px] mt-6 -mb-1 lg:text-[26px]'>zarvantrip</h3>
          <div className='bg-orange w-16 h-[4px] rounded-md lg:w-24'></div>
          <h2 className='text-3xl font-medium mt-1 lg:text-[40px]'>PAGE NOT FOUND</h2>
          <p className='text-cs85 text-center mb-2 lg:text-base lg:mb-4'>
            We couldn&apos;t find the page you were looking for
          </p>

          <Link href={'/'} className='bg-orange text-white text-cs08 p-8 py-3 rounded-full'>
            بازگشت به صفحه
          </Link>
        </div>
      </div>
    </>
  );
}

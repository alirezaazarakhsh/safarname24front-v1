import { ICArrowLeft } from '@/components/icons';
import Link from 'next/link';

type Props = {
  src: { title: string; href: string }[];
};

// --------------------------------------

export default function QuickAccess(props: Props) {
  const { src } = props;

  return (
    <>
      {/* Small-Device */}
      <div className='w-full lg:hidden'>
        <button className='bg-zinc-100 w-full h-12 px-4 my-4 text-zinc-800 font-semibold flex-between items-center rounded-cs-10 lg:my-0'>
          <span>دسترسی سریع</span>
          <ICArrowLeft className='w-3.5 h-3.5' />
        </button>
      </div>

      {/* Large-Device */}
      <div className='w-full h-12 px-6 my-4 hidden gap-4 lg:flex-center xl:justify-between'>
        <h4 className='text-zinc-800 text-cs85 font-bold hidden xl:block'>دسترسی سریع :</h4>

        <div className='flex-1 h-full flex-between gap-4 xl:flex-none'>
          {src.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className='bg-zinc-100 text-zinc-800 text-cs07 font-bold px-4 flex-center rounded-cs-10 transition-colors ease-in-out duration-200 hover:bg-cs-red hover:text-zinc-100 xl:text-cs75'
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

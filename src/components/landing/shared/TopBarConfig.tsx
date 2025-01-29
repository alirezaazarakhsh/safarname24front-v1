import Link from 'next/link';
import { ICArrowLeft } from '@/components/icons';

type Props = {
  title: string;
  subtitle?: string;
  seeAllHref?: string;
  backBtnFunc?: () => void;
  nextBtnFunc?: () => void;
};

export function TopBarConfig(prop: Props) {
  const { title, subtitle, seeAllHref, backBtnFunc, nextBtnFunc } = prop;

  return (
    <div className='mb-8 flex-between'>
      <div className='space-y-1'>
        <h4 className='text-zinc-800 text-cs08 font-bold lg:text-cs09'>{title}</h4>
        {subtitle && <p className='text-zinc-500 text-cs08 font-semibold hidden lg:block'>{subtitle}</p>}
      </div>

      <div className='h-10 hidden gap-3 lg:flex'>
        {seeAllHref && (
          <Link
            href={seeAllHref}
            className='bg-zinc-200 text-zinc-800 text-cs07 font-semibold px-5 flex-center rounded-lg'
          >
            مشاهده همه
          </Link>
        )}

        <button className='bg-zinc-200 w-10 flex-center rounded-md' onClick={backBtnFunc}>
          <ICArrowLeft className='w-4 h-4 stroke-zinc-400 rotate-180' />
        </button>

        <button className='bg-zinc-200 w-10 flex-center rounded-md' onClick={nextBtnFunc}>
          <ICArrowLeft className='w-4 h-4 stroke-zinc-400' />
        </button>
      </div>
    </div>
  );
}

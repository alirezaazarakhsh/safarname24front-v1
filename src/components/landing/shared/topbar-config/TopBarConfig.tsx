import Link from 'next/link';
import { ICArrowLeft } from '@/components/icons';
import { DynamicTopBarTimer } from './TopBarTimer';

type commonProps = {
  subtitle: string;
  timer?: string;
  seeAllHref?: string;
  backBtnFunc?: () => void;
  nextBtnFunc?: () => void;
};

type Props = (commonProps & { title: string }) | (commonProps & { titleA: string; titleB: string });

export function TopBarConfig(props: Props) {
  const { subtitle, timer, seeAllHref, backBtnFunc, nextBtnFunc } = props;

  return (
    <div className='mb-6 ml-5 flex-between items-center lg:mb-8 lg:ml-0'>
      <div className='space-y-2'>
        <h4 className='text-cs85 font-extrabold lg:text-cs09'>
          {'title' in props ? (
            <span>{props.title}</span>
          ) : (
            <>
              <span className='text-zic-800'>{props.titleA}</span>
              <span className='inline-block w-1'></span>
              <span className='text-cs-red'>{props.titleB}</span>
            </>
          )}
        </h4>

        {subtitle && <p className='text-zinc-500 text-cs08 font-semibold hidden lg:block'>{subtitle}</p>}
      </div>

      <div className='h-10 flex gap-3'>
        {timer && <DynamicTopBarTimer timer={timer} />}

        <div className='hidden gap-3 lg:flex'>
          {seeAllHref && (
            <Link
              href={seeAllHref}
              className='bg-zinc-200 text-zinc-800 text-cs07 font-semibold px-5 flex-center rounded-lg transition-colors duration-200 ease-in-out hover:bg-zinc-300/60'
            >
              مشاهده همه
            </Link>
          )}

          {backBtnFunc && nextBtnFunc && (
            <>
              <button
                className='bg-zinc-200 w-10 flex-center rounded-md transition-colors duration-200 ease-in-out hover:bg-zinc-300/60'
                onClick={backBtnFunc}
              >
                <ICArrowLeft className='w-4 h-4 stroke-zinc-400 rotate-180' />
              </button>

              <button
                className='bg-zinc-200 w-10 flex-center rounded-md transition-colors duration-200 ease-in-out hover:bg-zinc-300/60'
                onClick={nextBtnFunc}
              >
                <ICArrowLeft className='w-4 h-4 stroke-zinc-400' />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

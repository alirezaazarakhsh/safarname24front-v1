import Link from 'next/link';
import { ICArrowCircleUp } from '@/components/icons';

type Props = {
  src: { icon: React.ReactNode; href: string }[];
};

// -----------------------------------------------

export default function SocialMedias(props: Props) {
  const { src } = props;

  return (
    <div className='w-full h-12 flex gap-3'>
      <button className='bg-zinc-100 w-max text-zinc-800 text-cs08 font-semibold px-3 flex-center gap-2 rounded-cs-10'>
        <span className='lg:hidden xl:block'>برو به بالا</span>
        <ICArrowCircleUp />
      </button>

      <div className='flex-1 flex gap-3'>
        {src.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className='bg-zinc-100 w-full flex-center rounded-cs-10 transition-colors ease-in-out duration-200 hover:bg-zinc-200'
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}

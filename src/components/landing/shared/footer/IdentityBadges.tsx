import Image from 'next/image';
import Link from 'next/link';

type Props = {
  src: { url: string; href: string }[];
};

// ----------------------------------------

export default function IdentityBadges(props: Props) {
  const { src } = props;

  return (
    <div className='w-full mt-4 grid grid-cols-3 gap-3 lg:mt-0'>
      {src.map((badge, index) => (
        <Link key={index} href={badge.href} className='bg-zinc-100 h-28 p-4 flex-center overflow-hidden rounded-cs-10'>
          <Image src={badge.url} alt='identity-badge' width={100} height={100} className='full-size object-contain' />
        </Link>
      ))}
    </div>
  );
}

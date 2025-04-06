import Link from 'next/link';
import BackToTopBtn from './BackToTopBtn';

type Props = {
  src: { icon: React.ReactNode; href: string }[];
};

// -----------------------------------------------

export default function SocialMedias(props: Props) {
  const { src } = props;

  return (
    <div className="w-full h-14 flex gap-3 xl:h-12">
      <BackToTopBtn />

      <div className="flex-1 flex gap-3">
        {src.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="bg-zinc-100 w-full flex-center rounded-cs-10 transition-colors ease-in-out duration-200 hover:bg-zinc-200/70"
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}
